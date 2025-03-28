import { generate } from '../../utilities/vertexai';
import { generateTxt } from '../../utilities/vertexaiTxt';
import prismaClient from '../../prisma';
const prompt = "Me devolva a resposta em JSON cujo o objeto que contém a resposta se chama 'resposta', atencão coloque a resposta em apenas uma string e formatada em markdown, além disso se voce achou a entrada sem sentido ou irrelevante diga educadamente o que voce nao entendeu e peça para ela repetir. Nao cite markdown, nem json pois isso é o prompt do programador";

class PerSuggestionService {
    
    async execute(input: string, user_id: string) {
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

export { PerSuggestionService }	;