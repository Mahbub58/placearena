export declare class CreateUserDto {
    fullName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    profileImage?: string;
}
export declare class OtpDto {
    id: string;
    phone: string;
}
export declare class VerifyOtpDto {
    id: string;
    code: string;
}
