import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { User } from "src/common/decorators/user.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt.guard";
import { RecipesService } from "./recipes.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { RateRecipeDto } from "./dto/rate-recipe.dto";

@Controller("recipes")
export class RecipesController {
    constructor(private recipesService: RecipesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRecipe(
        @User("userId") userId: string,
        @Body() dto: CreateRecipeDto,
    ) {
        return await this.recipesService.create(userId, dto);
    }

    @Get()
    async findAll(@Query("search") search?: string) {
        return await this.recipesService.findAll(search);
    }

    @UseGuards(JwtAuthGuard)
    @Get("my")
    async findMine(@User("userId") userId: string) {
        return await this.recipesService.findByUser(userId);
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return await this.recipesService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":id/rate")
    async rateRecipe(
        @User("userId") userId: string,
        @Param("id") recipeId: string,
        @Body() rateDto: RateRecipeDto,
    ) {
        return await this.recipesService.rate(userId, recipeId, rateDto.value);
    }
}
