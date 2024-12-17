import prismaClient from "../../prisma";

interface BankInformation {
    user_id: string;
    renda_mensal: number,
    despesas_fixas: number,
    despesas_variaveis: number,
    objetivo_financeiro: string,
    perfil_risco: string,
    patrimonio_atual: number
}

class RegisterBankInformationService {
    async execute({ user_id, renda_mensal, despesas_fixas, despesas_variaveis, objetivo_financeiro, perfil_risco, patrimonio_atual }: BankInformation) {
        if (!user_id) {
            throw new Error("Invalid User");
        }

        const userExists = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
        });

        if (!userExists) {
            throw new Error("User not found");
        }

        const finProfile = await prismaClient.finProfile.create({
            data:{
                user_id: user_id,
                renda_mensal: renda_mensal,
                despesas_fixas: despesas_fixas,
                despesas_variaveis: despesas_variaveis,
                objetivo_financeiro: objetivo_financeiro,
                perfil_risco: perfil_risco,
                patrimonio_atual: patrimonio_atual
            }
        });

        return finProfile;
    }
}

export { RegisterBankInformationService }