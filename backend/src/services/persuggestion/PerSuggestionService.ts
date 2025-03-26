import { generate } from '../../utilities/vertexai';
const prompt = "Me devolva a resposta em JSON cujo o objeto que contém a resposta se chama 'resposta', atencão coloque a resposta em apenas uma string e formatada em markdown, além disso se voce achou a entrada sem sentido ou irrelevante diga educadamente o que voce nao entendeu e peça para ela repetir.";

class PerSuggestionService {
    
    async execute(input: string) {
        try {
            const ia_result = await generate(input+prompt, 'fatura.pdf');

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating suggestions");
        }
        }
        }

export { PerSuggestionService }	;