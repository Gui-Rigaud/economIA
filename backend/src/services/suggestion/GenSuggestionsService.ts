import { generate } from '../../utilities/vertexai';
import { FileCopier } from '../../utilities/copyFile';

const fs = require('fs').promises;

const prompt = "A partir da seguinte fatura de Cartão de Crédito, devolva sugestões e recomendações de gastos não intrusivas, que busquem auxiliar o usuário a ter um maior controle financeiro. Dê respostas em pequenas frases e armazene-as em um JSON contendo apenas as frases e uma numeração para separá-las.";

class GenSuggestionService {
    
    async execute(transactions: any) {

        const transactionsList = transactions;

        try {
            const filePath = `${__dirname}/fatura_cartao.txt`;
            await fs.writeFile(filePath, '')
            await fs.writeFile(filePath, JSON.stringify(transactionsList, null, 2));
            const copiador = new FileCopier(filePath);
            await copiador.execute('fatura_cartao.txt');
            const ia_result = await generate(prompt, 'fatura_cartao.txt');

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating suggestions");
        }
        }
        }

export { GenSuggestionService }	;