import prismaClient from "../../prisma"


class BudgetUserService{

    async execute(user_id: string){

        // Buscar a receita do usuário no banco de dados
    const budget = await prismaClient.user.findUnique({
        where: { 
            id: user_id
        },
        select: { 
            receita: true,
            despesa:true,
            saldo: true,
        },
    });

        return budget;

    }

}

export { BudgetUserService } 

