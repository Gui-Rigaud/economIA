import prismaClient from "../prisma";
import { CsvParser } from "csv-parser";

interface BankInformation{
    user_id: number;
    csv_file: CsvParser
}

class RegisterBankInformationService{
    async execute({ user_id, csv_file }: BankInformation){
        if (!user_id){
            throw new Error("Invalid User")
        }

        const userExists = prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        if (!userExists){
            throw new Error("User not found")
        }

        const { renda_mensal, despesas_fixas, despesas_variaveis, objetivo_financeiro, perfil_risco, patrimonio_atual } = csv_file.read();
        const finProfile = await prismaClient.finProfile.create({
            data:{
                user_id: user_id,
                renda_mensal: renda_mensal,
                despesas_fixas: despesas_fixas,
                despesas_variaveis: despesas_variaveis,
                objetivo_financeiro: objetivo_financeiro,
                perfil_risco: , 
                patrimonio_atual: patrimonio_atual
            }
        });
        return finProfile;
    }
}

export { RegisterBankInformationService }