import prismaClient from "../../prisma"

class BudgetUserService {
  async execute(user_id: string) {
    const budget = await prismaClient.user.findUnique({
      where: { id: user_id },
      select: {
        receita: true,
        despesa: true,
        saldo: true,
      },
    });

    if (!budget) {
      throw new Error("Usuário não encontrado.");
    }

    // Formata os valores como string decimal com 2 casas
    const receita = Number(budget.receita).toFixed(2);
    const despesa = Number(budget.despesa).toFixed(2);
    const saldo = Number(budget.saldo).toFixed(2);

    return {
      receita,
      despesa,
      saldo
    };
  }
}

export { BudgetUserService };