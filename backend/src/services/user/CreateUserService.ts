import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string;
    cpf: string;
    senha: string;
    telefone: string;
    data_nasc: string;
    email: string;
    receita: number;
}

class CreateUserService{
    async execute({ name, cpf, senha, telefone, data_nasc, email, receita }:UserRequest){

        if (!name || !cpf || !senha || !telefone || !data_nasc || !email){
            throw new Error("Informações incompletas!");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                cpf: cpf,
                email: email,
                telefone: telefone
            }
        })


        if (userAlreadyExists){
            throw new Error("Usuário já cadastrado");
        }

        var datastring = data_nasc;
        var partes = datastring.split('-');
        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const dia = parseInt(partes[2], 10);
        

        const data_formatada = new Date(ano, mes, dia);

        const passwordHash = await hash(senha, 8);

        const user = await prismaClient.user.create({
            data:{
            name: name,
            cpf: cpf,
            senha: passwordHash,
            telefone: telefone,
            data_nasc: data_formatada,
            email: email,
            receita: receita
            },
            select:{
                id: true,
                name: true,
                email: true,
                cpf: true,
                telefone: true,
                data_nasc: true,
                receita: true,
            }

        })

        return user;

    }

}

export { CreateUserService }