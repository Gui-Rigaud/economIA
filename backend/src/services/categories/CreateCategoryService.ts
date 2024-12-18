import prismaClient from "../../prisma";

interface CreateCategory{
    category_name: string;
}

class CreateCategoryService{
    async execute({ category_name }: CreateCategory){

        const categories = await prismaClient.categories.findMany()

        let categoryExists = false;

        categories.map((category) => {
            if (category.nome === category_name){
                categoryExists = true;
            }
        })  

        if (!categoryExists){
            const category = await prismaClient.categories.create({
                data:{
                    nome: category_name
                }
            })   

            return category;
        }

        return {status: 'Category already exists'};
    }
}

export { CreateCategoryService }