import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    public async register(email: string, name: string, password: string) {
        const hashedPassword = await hash(password, 10);
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            throw new BadRequestException(
                "User with such email already exists",
            );

        const user = await this.prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return this.signToken(user.id, user.email);
    }

    public async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isValid = await compare(password, user.password);
        if (!isValid) throw new UnauthorizedException("Invalid credentials");

        return this.signToken(user.id, user.email);
    }

    public async getMe(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            omit: { password: true },
        });
    }

    private async signToken(userId: string, email: string) {
        const token = await this.jwt.signAsync({ sub: userId, email });

        return { token };
    }
}
