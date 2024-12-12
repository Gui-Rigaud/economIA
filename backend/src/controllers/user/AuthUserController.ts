import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        const { email, cpf, senha} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            email,
            cpf,
            senha
        })

        return res.json(auth);
    }

}

export { AuthUserController }