import prismaClient from "../../prisma";

interface CategoryRequest{
    transactions_list: Transaction[];
}

interface Transaction{
    transaction_id: string;
    category_name: string;
}

class CategorizeFinTransactionService{
    async execute({ transactions_list }: CategoryRequest){

        // const transactions = await prismaClient.finTransactions.findMany({
        //     where:{
        //         user_id: user_id
        //     }
        // })
 
        transactions_list.map(async ({transaction_id, category_name})=> {
            const category = await prismaClient.categories.findFirst({
                where:{
                    nome: category_name
                }
            })

            const update_category = await prismaClient.finTransactions.update({
                where:{
                    id: transaction_id
                },
                data:{
                    category_id: category.id
                }
            })
        })
        return("Tudo certo família");
    }
}

export { CategorizeFinTransactionService }