import { generate } from '../../utilities/vertexai';
import { generateTxt } from '../../utilities/vertexaiTxt';
import prismaClient from '../../prisma';
const prompt = "A partir da seguinte lista de transações financeiras, gere sugestões e recomendações de gastos que ajudem o usuário a ter maior controle financeiro. As sugestões devem ser breves, claras e não intrusivas. Retorne o resultado em um objeto JSON com a chave 'sugestoes' que contém uma lista de objetos. Cada objeto deve conter exatamente duas chaves: 'id' (um número sequencial a partir de 1) e 'frase' (a recomendação textual). Mantenha o seguinte formato de saída, e não inclua nenhuma explicação adicional";

class GenSuggestionService {
    
    async execute(user_id:string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: { id: user_id },
                select: { file: true }
            });
            const fileName = user?.file || "Arquivo não encontrado";
            if (fileName === "Arquivo não encontrado") {
                throw new Error("Arquivo não encontrado");
            }
            const fileType = fileName.slice(-3).toLowerCase();

            if(fileType === "pdf") {
                return await generate(prompt, "fatura.pdf");
            }else if(fileType === "csv") {
                return await generateTxt(prompt, "fatura_cartao.txt");
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating suggestions");
        }
    }
}

export { GenSuggestionService }	;