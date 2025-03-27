import { generate } from "../../utilities/vertexaiTxt";

const fs = require('fs').promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt2 = "A partir da lista de transações financeiras fornecida, agrupe todas as transações que pertencem à mesma categoria e some seus valores. Depois, calcule a porcentagem de cada categoria em relação ao valor total das transações. Retorne um JSON onde cada objeto contenha dois atributos: 'categoria' (nome da categoria) e 'porcentagem' (a porcentagem do valor total das transações correspondente à categoria). Certifique-se de que a soma de todas as porcentagens seja exatamente 100%."

class PercentCategoriesService {
               
    async calcularPorcentagens(transacoes: { nome: string; valor: number }[], despesas: number) {
        const filePath = path.join(__dirname, "list_transactions.txt");
        await fs.writeFile(filePath, JSON.stringify(transacoes, null, 2));
        const storage = new GoogleCloudStorage();
        const bucketName = "fatura_cartao_1";
        const destinationPath = "json/list_transactions.txt";
        const bucket = storage.bucket(bucketName);
        await bucket.upload(filePath, { destination: destinationPath });
        await fs.unlink(filePath);
        
        const resultado: { categoria: string; porcentagem: number }[] = [];

        transacoes.forEach(transacao => {
            const categoriaExistente = resultado.find(item => item.categoria === transacao.nome);

            if (categoriaExistente) {
                categoriaExistente.porcentagem += (transacao.valor * 100) / despesas;
            } else {
                resultado.push({
                    categoria: transacao.nome,
                    porcentagem: (transacao.valor * 100) / despesas
                });
            }
        });

        // Ajuste final para garantir que a soma das porcentagens seja exatamente 100%
        const somaPorcentagens = resultado.reduce((acc, item) => acc + item.porcentagem, 0);
        if (somaPorcentagens !== 100) {
            const fatorAjuste = 100 / somaPorcentagens;
            resultado.forEach(item => {
                item.porcentagem = Number((item.porcentagem * fatorAjuste).toFixed(2)); // Ajusta e arredonda para 2 casas
            });
        }

        return resultado;
    }
}

export { PercentCategoriesService };