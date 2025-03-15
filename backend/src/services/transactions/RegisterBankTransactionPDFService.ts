import fs from "fs";
import path from "path";

class RegisterTransactionPDFService {
    async saveFile(fileBuffer: Buffer, originalFileName: string) {
        try {
            // Define o caminho onde o arquivo será salvo
            const filePath = path.join(__dirname, "../gen-categories/fatura.pdf");

            // Escreve o buffer no arquivo
            fs.writeFileSync(filePath, fileBuffer);

            console.log(`Arquivo salvo em: ${filePath}`);
        } catch (error) {
            console.error("Erro ao salvar o arquivo:", error);
            throw new Error("Falha ao salvar o arquivo.");
        }
    }
}

export { RegisterTransactionPDFService };