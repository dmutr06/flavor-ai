import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";

@Injectable()
export class RecipesService {
    constructor(private prisma: PrismaService) {}

    public create(userId: string, dto: CreateRecipeDto) {
        return this.prisma.recipe.create({
            data: {
                ...dto,
                ingredients: JSON.stringify(dto.ingredients),
                authorId: userId,
            },
        });
    }

    public async findAll(search?: string) {
        const recipes = await this.prisma.recipe.findMany({
            where: search
                ? {
                      OR: [
                          { title: { contains: search, mode: "insensitive" } },
                          {
                              ingredients: {
                                  contains: search,
                                  mode: "insensitive",
                              },
                          },
                      ],
                  }
                : undefined,
            select: { title: true, id: true, ingredients: true, ratings: true },
            orderBy: { createdAt: "desc" },
        });

        return recipes.map((r) => ({
            ...r,
            ingredients: JSON.parse(r.ingredients),
        }));
    }

    public async findById(id: string) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id },
            include: { ratings: true, author: { select: { name: true } } },
        });

        if (!recipe) {
            throw new NotFoundException("Recipe with such id does not exist");
        }

        return { ...recipe, ingredients: JSON.parse(recipe.ingredients) };
    }

    public async findByUser(userId: string) {
        const recipes = await this.prisma.recipe.findMany({
            where: { authorId: userId },
            select: { title: true, id: true, ingredients: true, ratings: true },
            orderBy: { createdAt: "desc" },
        });

        return recipes.map((r) => ({
            ...r,
            ingredients: JSON.parse(r.ingredients),
        }));
    }

    public async rate(userId: string, recipeId: string, value: number) {
        const recipe = await this.prisma.recipe.findUnique({
            where: { id: recipeId },
        });
        if (!recipe) throw new BadRequestException("Recipe now found");

        return await this.prisma.rating.upsert({
            where: {
                userId_recipeId: { userId, recipeId },
            },
            update: { value },
            create: { value, userId, recipeId },
        });
    }
}
