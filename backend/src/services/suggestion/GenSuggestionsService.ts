import { generate } from '../../utilities/vertexaiTxt';
const prompt = "A partir da seguinte lista de transações, devolva sugestões e recomendações de gastos não intrusivas, que busquem auxiliar o usuário a ter um maior controle financeiro. Dê respostas em pequenas frases e armazene-as em um JSON contendo apenas as frases e uma numeração para separá-las.";

class GenSuggestionService {
    
    async execute() {
        try {
            const ia_result = await generate(prompt, 'list_transactions.txt');

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating suggestions");
        }
        }
        }

export { GenSuggestionService }	;