import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
const { Storage: GoogleCloudStorage } = require('@google-cloud/storage');
import prismaClient from "../../prisma";

class RegisterTransactionService {
    async saveFile(user_id: string, fileBuffer: Buffer, originalname: string) {
        const storage = new GoogleCloudStorage();
        const bucket = storage.bucket('fatura_cartao_1');
        try {
            const sameFile = await prismaClient.user.findUnique({
                where: {
                    id: user_id,
                },
                select: {
                    file: true,
                }
            });

            console.log(originalname);
            console.log(sameFile)

            const fileName = sameFile?.file || "Arquivo não encontrado";

            console.log(fileName)

            if (fileName != originalname || fileName == "Arquivo não encontrado"){
                await prismaClient.user.update({
                    where: {
                        id: user_id,
                    },
                    data: {
                        file: originalname,
                    }
                })
                await prismaClient.categories.deleteMany({
                    where: {
                        user_id: user_id,
                    }
                });
            } 

            let tipo = originalname.slice(-3).toLowerCase();
            const directoryPath = path.join(__dirname, "../gen-categories");

            // Garante que o diretório exista
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            if (tipo === "pdf") {
                const file = bucket.file('pdf/fatura.pdf');
                await file.save(fileBuffer, { contentType: 'application/pdf' });
                return `gs://${bucket.name}/${file.name}`; // URI para VertexAI
            }

            if (tipo === "csv") {
                const csvContent = fileBuffer.toString("utf-8");
                const doc = new PDFDocument();
                const bufferChunks = [];

                // Collect PDF data as Buffer chunks
                doc.on('data', chunk => bufferChunks.push(chunk));
                                
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

                return new Promise((resolve, reject) => {
                    doc.on('end', () => {
                        // Combine all chunks into one Buffer
                        const pdfBuffer = Buffer.concat(bufferChunks);
                        
                        // Save to cloud storage
                        const file = bucket.file('pdf/fatura.pdf');
                        file.save(pdfBuffer, { contentType: 'application/pdf' })
                            .then(() => resolve(`gs://${bucket.name}/${file.name}`))
                            .catch(err => reject(err));
                    });
                    
                    doc.end();
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