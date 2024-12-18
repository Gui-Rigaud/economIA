import prismaClient from "../../prisma";

interface CategoryRequest{
    user_id: string;
    transactions_list: Transaction[];
}

interface Transaction{
    id: string;
    categoria: string;
}

class CategorizeFinTransactionService{
    async execute({ transactions_list }: CategoryRequest){
 
        transactions_list.map(async ({id, categoria})=> {
            const category = await prismaClient.categories.findMany()

            let category_id = 0;

            category.map((category) => {
                if (category.nome === categoria){
                    category_id = category.id;
                }
            })

            if (category_id != 0) {
                await prismaClient.finTransactions.update({
                    where: {
                        id: `${id}`
                    },
                    data: {
                        category:{
                            connect:{
                                id: category_id
                            }
                        }
                    }
                })
            } else {
                console.error(`Category not found for name: ${categoria}`);
            }
        })
        return("Tudo certo família");
    }
}

export { CategorizeFinTransactionService }