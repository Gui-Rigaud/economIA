import prismaClient from "../../prisma";

interface CreateCategory {
    category_name: string;
}

interface CreateCategories {
    categories_name: string[];
}

class CreateCategoryService {
    // Assinaturas de método
    async execute(params: CreateCategory): Promise<void>;
    async execute(params: CreateCategories): Promise<void>;

    // Implementação do método
    async execute(params: CreateCategory | CreateCategories): Promise<void> {
        if ('category_name' in params) {
            // Lógica para criar uma única categoria
            const { category_name } = params;
            await prismaClient.categories.create({
                data: { nome: category_name },
            });
        } else if ('categories_name' in params) {
            // Lógica para criar múltiplas categorias
            let { categories_name } = params;
            const categories = await prismaClient.categories.findMany();

            categories.map(({id, nome}) => {
                categories_name.map((category_name) => {
                    if (nome === category_name) {
                        categories_name = this.filterCategoryNames(categories_name, category_name);
                    }
                })
            });

            for (const category_name of categories_name) {
                await prismaClient.categories.create({
                    data: { nome: category_name },
                });
            }

        }

    }
    private filterCategoryNames(categories_name: string[], category_name: string): string[] {
        const result: string[] = [];
        for (const name of categories_name) {
            if (name !== category_name) {
                result.push(name);
            }
        }
        return result;
    }
}

export { CreateCategoryService };