import { Request,Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){
        const { name, cpf, senha, telefone, data_nasc, email, receita } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            cpf,
            senha,
            telefone,
            data_nasc,
            email,
            receita
        })

        return res.json(user);
    }

}

export { CreateUserController }