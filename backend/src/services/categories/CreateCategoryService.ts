import prismaClient from "../../prisma";

interface CategoryRequest{
    user_id: string;
}

class CreateCategoryService{
    async execute({ user_id }: CategoryRequest){

        const category = await prismaClient.finTransactions.update({
            data:{
                
            }
        })

    }
}

export { CreateCategoryService }