import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        RecipesModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [PrismaService],
})
export class AppModule {}
