import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface UserRequest{
    cpf?: string;
    email?: string;
    senha: string;
}

interface JwtPayLoad{
    cpf?: string;
    email?: string;
}

class AuthUserService{
    async execute({ cpf, email, senha }: UserRequest){

        if (!email && !cpf){
            throw new Error("Invalid user")
        }

        const user = await prismaClient.user.findFirst({
            where:{
                OR: [
                {cpf:cpf},
                {email: email}
                ]
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        //Verificar se as senhas batem
        const passwordMatch = compare(senha, user.senha)

        if(!passwordMatch){
            throw new Error("Incorrect password")
        }

        const payload: JwtPayLoad = {};

        if(user.cpf){
            payload.cpf = user.cpf;
        } 

        if(user.email){
            payload.email = user.email;
        }





        const jwt = require('jsonwebtoken');

        const token = jwt.sign(
                payload,
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            token: token
        }

    }

}

export { AuthUserService }