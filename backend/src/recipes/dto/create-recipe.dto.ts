import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    ingredients: string[];

    @IsNotEmpty()
    @IsString()
    instructions: string;

    @IsOptional()
    @IsString()
    image?: string;
}
