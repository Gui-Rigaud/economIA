import prismaClient from "../../prisma";

class GenCategoriesService {
    async execute(user_id: string) {
        const transactionsExist = await prismaClient.categories.findMany({
            where:{
                user_id: user_id,
            }
        });
        if (!transactionsExist || transactionsExist.length == 0){
            throw new Error("Nenhuma transação encontrada");
        } else {
            const ia_result_formatada: Array<{ id: number, nome: string, valor: number } | { despesas: number }> = transactionsExist.map(categoria => ({
                id: categoria.id,
                nome: categoria.nome,
                valor: Number(categoria.valor),
            }));
            
            const despesasBusca = await prismaClient.user.findUnique({
                where: {
                    id: user_id,
                }, 
                select: {
                    despesa: true,
                }
            });
            
            const despesas = Number(despesasBusca?.despesa) || 0;
            
            // Adiciona o total de despesas no final
            ia_result_formatada.push({ despesas });
            
            return ia_result_formatada;
        } 
    }
}

export { GenCategoriesService };