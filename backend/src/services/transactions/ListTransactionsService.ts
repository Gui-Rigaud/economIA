import prismaClient from "../../prisma";

interface Transaction {
    id: string;
    data_transacao: Date;
    descricao: string | null;
    valor: number;
    forma_pagamento: string | null;
}

class ListTransactionsService {
    public async execute(user_id: string): Promise<Transaction[]> {
        const transactions = await prismaClient
        .finTransactions.findMany({
            where: {
                user_id: `${user_id}`
            }
        });

        return transactions.map(transaction => ({
            id: transaction.id,
            data_transacao: transaction.data_transacao,
            descricao: transaction.descricao,
            valor: Number(transaction.valor),
            forma_pagamento: transaction.forma_pagamento
        }));
    }
}

export {ListTransactionsService};