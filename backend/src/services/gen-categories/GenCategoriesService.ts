import { generate } from "../../utilities/vertexai";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = "Devolva a categoria de cada transação financeira na seguinte fatura de Cartão de Crédito, levando em conta somente o atributo descrição ou estabelecimento. Além disso, faça a lista de objetos do arquivo JSON com somente o id da transação, que será uma sequência de inteiros crescente começando em 1, e a categoria em cada objeto.";

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