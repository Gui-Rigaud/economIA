import fs from "fs";
import path from "path";
import { generate } from "../../utilities/vertexai";
import { generateTxt } from "../../utilities/vertexaiTxt";
const { Storage: GoogleCloudStorage } = require('@google-cloud/storage');
import prismaClient from "../../prisma";

const prompt = 'Classifique cada transação financeira desta fatura de Cartão de Crédito em categorias amplas e bem definidas, agrupando categorias semelhantes sob um mesmo rótulo. Utilize supernichos para unificar categorias relacionadas. Por exemplo, "Restaurante" e "Alimentação" devem ser classificadas apenas como "Alimentação", e "Esportes" e "Lazer" podem ser unificadas se fizer sentido. Não adicione transações com valores negativos. Retorne um JSON onde cada objeto contenha apenas três atributos: "id" (numeração sequencial crescente a partir de 1), "nome" (o nome do supernicho identificado para a transação) e "valor" contendo o valor da transação. Além disso adicione no final do JSON um objeto no formato { "despesas": valor }, sendo "valor" o total dos valores positivos da fatura.'

class RegisterTransactionService {
  async saveFile(user_id: string, fileBuffer: Buffer, originalname: string) {
    const storage = new GoogleCloudStorage();
    const bucket = storage.bucket('fatura_cartao_1');

    try {
      const sameFile = await prismaClient.user.findUnique({
        where: { id: user_id },
        select: { file: true }
      });

      const fileName = sameFile?.file || "Arquivo não encontrado";

      if (fileName !== originalname || fileName === "Arquivo não encontrado") {
        await prismaClient.user.update({
          where: { id: user_id },
          data: { file: originalname }
        });

        await prismaClient.categories.deleteMany({
          where: { user_id }
        });
      }

      const tipo = originalname.slice(-3).toLowerCase();
      const directoryPath = path.join(__dirname, "../gen-categories");

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      if (tipo === "pdf") {
        const file = bucket.file('pdf/fatura.pdf');
        await file.save(fileBuffer, { contentType: 'application/pdf' });
      } else if (tipo === "csv") {
        const file = bucket.file('json/fatura_cartao.txt');
        await file.save(fileBuffer, { contentType: 'text/plain' });
      }

      const transactionsExist = await prismaClient.categories.findMany({
        where: { user_id }
      });

      if (!transactionsExist || transactionsExist.length === 0) {
        const fileNameData = await prismaClient.user.findUnique({
          where: { id: user_id },
          select: { file: true }
        });

        const name = fileNameData?.file;
        const fileType = name.slice(-3).toLowerCase();

        let ia_result: any[] = [];
        if (fileType === "pdf") {
          ia_result = await generate(prompt, "fatura.pdf");
        } else if (fileType === "csv") {
          ia_result = await generateTxt(prompt, "fatura_cartao.txt");
        }

        const despesasBlocado = ia_result.pop();
        const { despesas } = despesasBlocado;

        const userData = await prismaClient.user.findUnique({
          where: { id: user_id },
          select: { receita: true, despesa: true }
        });

        const receita = Number(userData?.receita) || 0;

        await prismaClient.user.update({
          where: { id: user_id },
          data: {
            saldo: receita - despesas,
            despesa: despesas
          }
        });

        await prismaClient.categories.createMany({
          data: ia_result.map(categoria => ({
            nome: categoria.nome,
            valor: Number(categoria.valor),
            user_id
          }))
        });

        return {message: "Novas transações processadas com sucesso."};
      } else {
        return {message: "Transações já processadas."};
      }
    } catch (error) {
      console.error("Erro ao processar transações:", error);
      throw new Error("Erro ao salvar arquivo e processar transações.");
    }
  }
}

export { RegisterTransactionService };