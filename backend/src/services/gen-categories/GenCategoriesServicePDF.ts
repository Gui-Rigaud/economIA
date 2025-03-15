import { generate } from "../../utilities/vertexai";
import { CreateCategoryService } from "../categories/CreateCategoryService";
import { CategorizeFinTransactionService } from "../transactions/CategorizeFinTransactionService";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = "Devolva a categoria de cada transação financeira na seguinte fatura de Cartão de Crédito, levando em conta somente o atributo descrição. Além disso, faça a lista de objetos do arquivo JSON com somente o id da transação e a categoria em cada objeto.";

class GenCategoriesServicePDF {
    async execute(user_id: string) {
        const filePath = path.join(__dirname, "fatura.pdf");
        const storage = new GoogleCloudStorage();
        const bucketName = "fatura_cartao_1";
        const destinationPath = "pdf/fatura.pdf";

        try {
            // Verifica se o arquivo PDF existe antes de processá-lo
            try {
                await fs.access(filePath);
            } catch (err) {
                throw new Error("Arquivo fatura.pdf não encontrado.");
            }

            // Faz upload do PDF para o Google Cloud Storage
            const bucket = storage.bucket(bucketName);
            await bucket.upload(filePath, { destination: destinationPath });

            // Construindo o caminho correto do GCS
            //const fileURI = `gs://${bucketName.replace("gs://", "")}/${destinationPath}`;
            //console.log("Arquivo enviado para GCS:", fileURI);

            // Aguarda a propagação do GCS antes de chamar a IA
            await new Promise(resolve => setTimeout(resolve, 5000)); // Aguarda 5 segundos

            //console.log("Enviando para IA o arquivo:", fileURI);
            console.log("Prompt enviado para a IA:", prompt);

            // 🔥 Corrigindo a chamada do Vertex AI para usar o caminho correto
            const ia_result = await generate(prompt, "fatura.pdf");

            // Processa as categorias retornadas pela IA
            const createCategory = new CreateCategoryService();
            let categories_gen = [];

            ia_result.forEach(({ id, categoria }) => {
                if (!categories_gen.includes(categoria)) {
                    categories_gen.push(categoria);
                }
            });

            try {
                await createCategory.execute({ categories_name: categories_gen });
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao criar categorias");
            }

            try {
                const categorizeService = new CategorizeFinTransactionService();
                await categorizeService.execute({ transactions_list: ia_result, user_id: user_id });
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao categorizar transações");
            }

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao gerar categorias");
        }
    }
}

export { GenCategoriesServicePDF };