import prismaClient from "../../prisma";

interface CreateCategory{
    category_name: string;
}

class CreateCategoryService{
    async execute({ category_name }: CreateCategory){

        const categoryExists = await prismaClient.categories.findFirst({
            where:{
                nome: category_name
            }
        })

        if (categoryExists){
            throw new Error("Category already exists")
        }

        const category = await prismaClient.categories.create({
            data:{
                nome: category_name
            }
        })

        return category;
    }
}

export { CreateCategoryService }