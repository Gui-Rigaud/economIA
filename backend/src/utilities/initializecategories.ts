import prismaClient from "../prisma";

async function initializecategories() {
    try {
        // Verifica se a categoria "Outros" já existe
        const existingCategory = await prismaClient.categories.findUnique({
            where: { id: 1 }, // Ou where: { nome: "Outros" } se preferir
        });

        if (!existingCategory) {
            await prismaClient.categories.create({
                data: {
                    nome: "Outros",
                },
            });
            //console.log("Categoria 'Outros' criada automaticamente.");
        }
    } catch (error) {
        console.error("Erro ao inicializar a categoria padrão:", error);
    }
}

// Chama essa função ao iniciar o servidor
export default initializecategories;