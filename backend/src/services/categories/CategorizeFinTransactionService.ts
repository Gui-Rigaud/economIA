import prismaClient from "../../prisma";

interface CategoryRequest{
    user_id: string;
    category_changes: string;
}

class CategorizeFinTransactionService{
    async execute({ user_id, category_changes }: CategoryRequest){
        const category = await prismaClient.finTransactions.update({
            where:{
                user_id: user_id
            },
            data:{
                
            }
        })

        return category;
    }
}

export { CategorizeFinTransactionService }