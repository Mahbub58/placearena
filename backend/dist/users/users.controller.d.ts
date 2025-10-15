import { CreateUserDto } from './dto/create-user-dto';
import { Users } from './schemas/users.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    crate(createUserDto: CreateUserDto): Promise<Users>;
    getSingle(id: string): Promise<Users>;
    getAllUser(): Promise<Users[]>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    updateUser(id: string, updateData: Partial<Users>): Promise<Users>;
    sendOtp(body: {
        phone: string;
        id: string;
    }): Promise<any>;
    verifyOtp(body: {
        id: string;
        code: string;
    }): Promise<{
        verified: boolean;
    }>;
}
