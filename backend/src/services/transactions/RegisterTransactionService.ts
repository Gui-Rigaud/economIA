import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

class RegisterTransactionService {
    async saveFile(fileBuffer: Buffer, originalname: string) {
        try {
            let tipo = originalname.slice(-3).toLowerCase();
            const directoryPath = path.join(__dirname, "../gen-categories");
            const filePath = path.join(directoryPath, "fatura.pdf");

            // Garante que o diretório exista
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            if (tipo === "pdf") {
                fs.writeFileSync(filePath, fileBuffer);
                console.log(`Arquivo PDF salvo em: ${filePath}`);
                return;
            }

            if (tipo === "csv") {
                const csvContent = fileBuffer.toString("utf-8");
                const doc = new PDFDocument();
                const pdfStream = fs.createWriteStream(filePath);

                doc.pipe(pdfStream);
                doc.fontSize(18).text("Fatura - Dados Convertidos para PDF", { align: "center" });
                doc.moveDown();

                const rows = csvContent.split("\n");
                rows.forEach((row, index) => {
                    const columns = row.split(",");
                    doc.fontSize(12).text(columns.join(" | "), { align: "left" });
                    if (index < rows.length - 1) {
                        doc.moveDown(0.5);
                    }
                });

                doc.end();

                return new Promise((resolve, reject) => {
                    pdfStream.on("finish", () => {
                        console.log(`Arquivo CSV convertido e salvo como PDF em: ${filePath}`);
                        resolve(null);
                    });

                    pdfStream.on("error", (err) => reject(err));
                });
            }

            throw new Error("Tipo de arquivo não suportado. Apenas PDF ou CSV são aceitos.");
        } catch (error) {
            console.error("Erro ao salvar o arquivo:", error);
            throw new Error("Falha ao salvar o arquivo.");
        }
    }
}

export { RegisterTransactionService };