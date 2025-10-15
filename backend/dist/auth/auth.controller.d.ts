import { AuthService } from './auth.service';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    login(loginDto: LoginUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signWithGooglePopup(user: CreateUserDto, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(userDto: CreateUserDto, res: Response): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): {
        success: boolean;
        message: string;
        data: any;
    };
    refresh(req: any): Promise<{
        accessToken: string;
    }>;
    logout(req: any, res: Response): {
        message: string;
    };
}
