import { generate } from '../../utilities/vertexai';
const prompt = "A partir da seguinte lista de transações financeiras, gere sugestões e recomendações de gastos que ajudem o usuário a ter maior controle financeiro. As sugestões devem ser breves, claras e não intrusivas. Retorne o resultado em um objeto JSON com a chave 'sugestoes' que contém uma lista de objetos. Cada objeto deve conter exatamente duas chaves: 'id' (um número sequencial a partir de 1) e 'frase' (a recomendação textual). Mantenha o seguinte formato de saída, e não inclua nenhuma explicação adicional";

class GenSuggestionService {
    
    async execute() {
        try {
            const ia_result = await generate(prompt, "fatura.pdf");

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating suggestions");
        }
        }
        }

export { GenSuggestionService }	;