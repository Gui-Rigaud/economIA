import prismaClient from "../../prisma";
import multer from "multer";

interface Transaction{
    user_id: string;
    data_transacao: Date;
    descricao: string;
    valor: number;
    forma_pagamento: string;
}

class RegisterBankTransactionService{
    async execute({ user_id, data_transacao, descricao, valor, forma_pagamento }: Transaction){

        const transaction = await prismaClient.finTransactions.create({
            data:{
                user_id: user_id,
                data_transacao: data_transacao,
                descricao: descricao,
                valor: valor,
                forma_pagamento: forma_pagamento
            }
        })

        return transaction;

    }

}

export { RegisterBankTransactionService }