import prismaClient from "../../prisma";

interface CategoryRequest{
    user_id: string;
}

class CreateCategoryService{
    async execute({ user_id }: CategoryRequest){

    }
}

export { CreateCategoryService }