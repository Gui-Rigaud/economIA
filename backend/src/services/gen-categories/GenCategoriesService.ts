import { generate } from "../../utilities/vertexai";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = "Classifique cada transação financeira desta fatura de Cartão de Crédito em categorias amplas e bem definidas, agrupando categorias semelhantes sob um mesmo rótulo. Utilize supernichos para unificar categorias relacionadas. Por exemplo, 'Restaurante' e 'Alimentação' devem ser classificadas apenas como 'Alimentação', e 'Esportes' e 'Lazer' podem ser unificadas se fizer sentidoRetorne um JSON onde cada objeto contenha apenas dois atributos: 'id' (numeração sequencial crescente a partir de 1) e 'categoria' (o nome do supernicho identificado para a transação)."

class GenCategoriesService {
    async execute() {
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
            await fs.unlink(filePath);
            console.log("Arquivo deletado");

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao gerar categorias");
        }
    }
}

export { GenCategoriesService };