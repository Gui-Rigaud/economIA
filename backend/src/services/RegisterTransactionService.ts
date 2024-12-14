import { Readable } from "stream";
import readline from "readline";
import prismaClient from "../prisma";
import { convertToInt } from "../utilities/conversorInt";
import { convertToDate } from "../utilities/conversorDate";

interface Transaction {
    user_id: string;
    data_transacao: Date;
    descricao: string;
    valor: number;
    forma_pagamento: string;
}

class RegisterTransactionService {
    async processFile(fileBuffer: Buffer, user_id: string) {
        const transactions = [];

        const readableFile = new Readable();
        readableFile.push(fileBuffer);
        readableFile.push(null);

        const transactionsLine = readline.createInterface({
            input: readableFile,
        });

        let isFirstLine = true;

        for await (let line of transactionsLine) {
            if (isFirstLine) {
                isFirstLine = false;
                continue;
            }

            const transactionLineSplit = line.split(";");

            transactions.push({
                user_id,
                data_transacao: convertToDate(transactionLineSplit[0]),
                descricao: transactionLineSplit[1],
                valor: convertToInt(transactionLineSplit[3]),
                forma_pagamento: "Teste",
            });
        }

        const savedTransactions = [];
        for await (let transaction of transactions) {
            const savedTransaction = await this.saveTransaction(transaction);
            savedTransactions.push(savedTransaction);
        }

        return savedTransactions;
    }

    private async saveTransaction(transaction: Transaction) {
        const { user_id, data_transacao, descricao, valor, forma_pagamento } = transaction;

        return await prismaClient.finTransactions.create({
            data: {
                user_id,
                data_transacao,
                descricao,
                valor,
                forma_pagamento,
            },
        });
    }
}

export { RegisterTransactionService };
