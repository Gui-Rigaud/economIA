import { Request, Response } from "express";
import { Readable } from 'stream'
import readline from 'readline'
import { convertToInt } from "../../utilities/conversorInt";
import { convertToDate } from "../../utilities/conversorDate";
import multer from "multer";
import { RegisterBankTransactionService } from "../../services/user/RegisterBankTransactionService";

const multerConfig = multer();

interface Transaction {
    data_transacao: Date;
    descricao: string;
    valor: number;
    forma_pagamento: string;
}

class RegisterBankTransactionController{
    async handle(req: Request, res: Response){
        const { user_id } = req.body;
        const file = req.file;

        const { buffer } = file;

        const registerBankTransactionService = new RegisterBankTransactionService();


        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const transactionsLine = readline.createInterface({
            input: readableFile
        })

        const transactions: Transaction[] = [];
        let isFirstLine = true;

        for await (let line of transactionsLine){
            if(isFirstLine){
                isFirstLine = false;
                continue;
            }

            const transactionLineSplit = line.split(";")

            transactions.push({
                data_transacao: convertToDate(transactionLineSplit[0]),
                descricao: transactionLineSplit[1],
                valor: convertToInt(transactionLineSplit[3]),
                forma_pagamento: 'Teste',
            })
        }

        for await(let { data_transacao, descricao, valor, forma_pagamento } of transactions){

            var transaction = await registerBankTransactionService.execute({
                user_id,
                data_transacao,
                descricao,
                valor,
                forma_pagamento
            })

        }

        return res.json(transaction);

    }

}

export { RegisterBankTransactionController }