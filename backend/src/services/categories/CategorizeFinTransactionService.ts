import prismaClient from "../../prisma";

interface CategoryRequest{
    user_id: string;
}

class CategorizeFinTransactionService{
    async execute({ user_id }: CategoryRequest){
        const category = await prismaClient.finTransactions.update
    }
}

export { CategorizeFinTransactionService }