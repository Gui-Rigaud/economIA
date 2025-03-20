import prismaClient from "../../prisma";
import { generate } from "../../utilities/vertexai";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = 'Classifique cada transação financeira desta fatura de Cartão de Crédito em categorias amplas e bem definidas, agrupando categorias semelhantes sob um mesmo rótulo. Utilize supernichos para unificar categorias relacionadas. Por exemplo, "Restaurante" e "Alimentação" devem ser classificadas apenas como "Alimentação", e "Esportes" e "Lazer" podem ser unificadas se fizer sentido. Não adicione transações com valores negativos. Retorne um JSON onde cada objeto contenha apenas três atributos: "id" (numeração sequencial crescente a partir de 1), "nome" (o nome do supernicho identificado para a transação) e "valor" contendo o valor da transação. Além disso adicione no final do JSON um objeto no formato { "despesas": valor }, sendo "valor" o total dos valores positivos da fatura.'

class GenCategoriesService {
    async execute(user_id: string) {
        const devolver = await prismaClient.categories.findMany({
            where:{
                user_id: user_id,
            }
        });
        if (!devolver || devolver.length == 0){
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
                const despesasBlocado = ia_result.pop();
                const { despesas }  = despesasBlocado
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
                await prismaClient.categories.createMany({
                    data: ia_result.map(categoria => ({
                        nome: categoria.nome,
                        valor: Number(categoria.valor), // Certifica que o valor é numérico
                        user_id: user_id, // Adiciona o user_id como chave estrangeira
                    })),
                });
                ia_result.push(despesasBlocado)
                return ia_result;
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao gerar categorias");
            }
        } else {
            const ia_result_formatada: Array<{ id: number, nome: string, valor: number } | { despesas: number }> = devolver.map(categoria => ({
                id: categoria.id,
                nome: categoria.nome,
                valor: Number(categoria.valor),
            }));
            
            const despesasBusca = await prismaClient.user.findUnique({
                where: {
                    id: user_id,
                }, 
                select: {
                    despesa: true,
                }
            });
            
            const despesas = Number(despesasBusca?.despesa) || 0;
            
            // Adiciona o total de despesas no final
            ia_result_formatada.push({ despesas });
            
            return ia_result_formatada;
        } 

        //Gen categories faz o find many para ver se tem algo no banco, se tiver, retorna
        //O register que faz o trabalho de apagar as coisas do banco caso o arquivo seja diferente



        /*const consulta = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            },
            select: {
                fileBool: true,
            }
        })
        const resultadoConsulta = consulta?.fileBool;*/

}
}

export { GenCategoriesService };