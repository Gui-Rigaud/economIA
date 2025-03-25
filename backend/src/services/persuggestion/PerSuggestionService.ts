import { generate } from '../../utilities/vertexai';
const prompt = "Me devolva a resposta em JSON cujo o objeto que contém a resposta se chama 'resposta', atencão coloque a resposta em apenas uma string e formatada em markdown";

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