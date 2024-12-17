import prismaClient from "../../prisma";

interface ListCategory{
    user_id: string
}

class ListCategoriesService{
    async execute({ user_id }: ListCategory){

        const categories = await prismaClient.finTransactions.findMany({
            where:{
                user_id: user_id
            },
            select:{
                
            }
        })

    }
}

export { ListCategoriesService } 