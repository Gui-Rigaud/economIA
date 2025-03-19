import prismaClient from "../../prisma";
import { generate } from "../../utilities/vertexai";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = 'Classifique cada transação financeira desta fatura de Cartão de Crédito em categorias amplas e bem definidas, agrupando categorias semelhantes sob um mesmo rótulo. Utilize supernichos para unificar categorias relacionadas. Por exemplo, "Restaurante" e "Alimentação" devem ser classificadas apenas como "Alimentação", e "Esportes" e "Lazer" podem ser unificadas se fizer sentido. Retorne um JSON onde cada objeto contenha apenas três atributos: "id" (numeração sequencial crescente a partir de 1), "nome" (o nome do supernicho identificado para a transação) e "valor" contendo o valor da transação. Além disso adicione no final do JSON um objeto no formato { "despesas": valor }, sendo "valor" o total dos valores positivos da fatura.'

class GenCategoriesService {
    async execute(user_id: string) {
        const consulta = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                fileBool: true,
            }
        })
        const resultadoConsulta = consulta?.fileBool;

        if (resultadoConsulta){
        const filePath = path.join(__dirname, "fatura.pdf");
        const storage = new GoogleCloudStorage();
        const bucketName = "fatura_cartao_1";
        const destinationPath = "pdf/fatura.pdf";

        try {
            try {
                await fs.access(filePath);
            } catch (err) {
                throw new Error("Arquivo fatura.pdf não encontrado.");
            }

            // Faz upload do PDF para o Google Cloud Storage
            const bucket = storage.bucket(bucketName);
            await bucket.upload(filePath, { destination: destinationPath });

            // Aguarda a propagação do GCS antes de chamar a IA
            await new Promise(resolve => setTimeout(resolve, 3000)); 

            const ia_result = await generate(prompt, "fatura.pdf");
            const { despesas } = ia_result.pop()
            console.log("Despesas: ", despesas)
            const userData = await prismaClient.user.findUnique({
                where: { 
                    id: user_id
                },
                select: { 
                    receita: true,
                    despesa:true,
                },
            });
            const receita = Number(userData?.receita) || 0;
            await prismaClient.user.update({
                where: { 
                    id: user_id 
                },
                data: {
                    saldo: receita - despesas, 
                    despesa: despesas,
                },
            });
            await fs.unlink(filePath);
            console.log("Arquivo deletado");
            await prismaClient.categories.deleteMany({
                where: {
                    user_id: user_id,
                }
            });
            await prismaClient.categories.createMany({
                data: ia_result.map(categoria => ({
                    nome: categoria.nome,
                    valor: Number(categoria.valor), // Certifica que o valor é numérico
                    user_id: user_id, // Adiciona o user_id como chave estrangeira
                })),
            });
            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao gerar categorias");
        }
    } else {
        const ia_result = await prismaClient.categories.findMany();
        const ia_result_formatada = ia_result.map(categoria => ({
            id: categoria.id,
            nome: categoria.nome,
            valor: Number(categoria.valor), // Converte para número
        }));
        return ia_result_formatada;
    }
}
}

export { GenCategoriesService };