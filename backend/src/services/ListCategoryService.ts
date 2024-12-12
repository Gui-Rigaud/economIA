import prismaClient from "../prisma"
import { CsvParser } from "csv-parser";

interface CategoriesRequest{
    user_id: user_id,
    csv_file: csv_file
}

class ListCategoryService{
    async execute({ user_id, csv_file }: CategoriesRequest){

    }
}

export { ListCategoryService }