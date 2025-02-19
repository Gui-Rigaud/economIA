import prismaClient from "../../prisma"


class BudgetUserService{

    async execute(user_id: string){

        // Buscar a receita do usuário no banco de dados
    const userData = await prismaClient.user.findUnique({
        where: { 
            id: user_id
        },
        select: { 
            receita: true,
            despesa:true,
        },
    });

    const receita = Number(userData?.receita) || 0;
    const despesasNumber = Number(userData.despesa) || 0;

    await prismaClient.user.update({
        where: { id: user_id },
        data: {
            despesa: despesasNumber,
            saldo: receita - despesasNumber,
        },
    });

        const budget = await prismaClient.user.findUnique({
            where:{
                id: user_id
            },
            select:{
                receita: true,
                despesa: true,
                saldo: true,
            }
        })

        return budget;

    }

}

export { BudgetUserService } 

