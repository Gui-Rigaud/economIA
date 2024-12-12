import prismaClient from "../prisma";
import csvParser from "csv-parser";
import fs from "fs";
import multer from "multer";
import express from "express";

interface BankInformation {
    user_id: string;
    csv_file: string; // Caminho do arquivo CSV
}

class RegisterBankInformationService {
    async execute({ user_id, csv_file }: BankInformation) {
        if (!user_id) {
            throw new Error("Invalid User");
        }

        const userExists = await prismaClient.finProfile.findFirst({
            where: {
                user_id: user_id,
            },
        });

        if (!userExists) {
            throw new Error("User not found");
        }

        const records: any[] = [];

        // Lendo e processando o arquivo CSV
        return new Promise((resolve, reject) => {
            fs.createReadStream(csv_file)
                .pipe(csvParser())
                .on("data", (row) => {
                    records.push(row);
                })
                .on("end", async () => {
                    try {
                        // Supondo que o CSV tenha apenas uma linha relevante:
                        const {
                            renda_mensal,
                            despesas_fixas,
                            despesas_variaveis,
                            objetivo_financeiro,
                            perfil_risco,
                            patrimonio_atual,
                        } = records[0];

                        const finProfile = await prismaClient.finProfile.create({
                            data: {
                                user_id: user_id,
                                renda_mensal: parseFloat(renda_mensal),
                                despesas_fixas: parseFloat(despesas_fixas),
                                despesas_variaveis: parseFloat(despesas_variaveis),
                                objetivo_financeiro,
                                perfil_risco,
                                patrimonio_atual: parseFloat(patrimonio_atual),
                            },
                        });
                        resolve(finProfile);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }
}

// Configuração do Express e Multer
const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/register-bank-information", upload.single("file"), async (req, res) => {
    const { user_id } = req.body; // Obtém o ID do usuário do corpo da requisição
    const csv_file = req.file?.path; // Caminho do arquivo enviado

    if (!csv_file) {
        return res.status(400).json({ error: "Arquivo CSV não enviado" });
    }

    const registerService = new RegisterBankInformationService();

    try {
        const result = await registerService.execute({ user_id, csv_file });

        // Remover arquivo temporário após processamento
        fs.unlinkSync(csv_file);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

export { RegisterBankInformationService }