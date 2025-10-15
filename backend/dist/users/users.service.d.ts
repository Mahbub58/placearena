import { Users, UsersDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, OtpDto, VerifyOtpDto } from './dto/create-user-dto';
import { ConfigService } from '@nestjs/config';
import { PropertyService } from 'src/property/property.service';
export declare class UsersService {
    private usersModel;
    private config;
    private readonly propertyService;
    constructor(usersModel: Model<UsersDocument>, config: ConfigService, propertyService: PropertyService);
    create(user: CreateUserDto): Promise<Users>;
    getSingle(id: string): Promise<Users>;
    getByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, UsersDocument, {}, {}> & Users & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    findByEmailAndPassword({ email, password, }: {
        email: string;
        password: string;
    }): Promise<(import("mongoose").Document<unknown, {}, UsersDocument, {}, {}> & Users & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    getAllUser(): Promise<Users[]>;
    findByEmail(email: string): Promise<Users>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    updateUser(id: string, updateData: Partial<Users>): Promise<Users>;
    sendOtp({ phone, id }: OtpDto): Promise<any>;
    verifyOtp({ id, code }: VerifyOtpDto): Promise<boolean>;
    checkStatus(messageId: string): Promise<any>;
}
