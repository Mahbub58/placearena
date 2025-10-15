"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schemas/users.schema");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const property_service_1 = require("../property/property.service");
let UsersService = class UsersService {
    usersModel;
    config;
    propertyService;
    constructor(usersModel, config, propertyService) {
        this.usersModel = usersModel;
        this.config = config;
        this.propertyService = propertyService;
    }
    async create(user) {
        const isUserExist = await this.usersModel.findOne({ email: user.email });
        if (!!isUserExist) {
            throw new common_1.ConflictException('User with this email not exists.');
        }
        return await this.usersModel.create(user);
    }
    async getSingle(id) {
        const result = await this.usersModel.findById(id);
        if (!result) {
            throw new common_1.NotFoundException('Not Found');
        }
        return result;
    }
    async getByEmail(email) {
        return await this.usersModel.findOne({ email: email });
    }
    async findByEmailAndPassword({ email, password, }) {
        return await this.usersModel
            .findOne({ email: email, password: password })
            .select('+password');
    }
    async getAllUser() {
        return await this.usersModel.find({});
    }
    async findByEmail(email) {
        const result = await this.usersModel
            .findOne({ email: email })
            .select('+password');
        if (!result) {
            throw new common_1.ConflictException('User not found.');
        }
        return result;
    }
    async deleteUser(id) {
        const session = await this.usersModel.db.startSession();
        session.startTransaction();
        try {
            const resultUserDelete = await this.usersModel.findByIdAndDelete(id, {
                session,
            });
            if (!resultUserDelete) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            const resultPropertyDelete = await this.propertyService.deleteAllPropertyOfUser({
                id: id,
                session: session,
            });
            await session.commitTransaction();
            return {
                message: `User and  properties deleted successfully`,
            };
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async updateUser(id, updateData) {
        const updatedUser = await this.usersModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }
    async sendOtp({ phone, id }) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 5 * 60 * 1000;
        await this.usersModel.findByIdAndUpdate(id, {
            $set: { otp: { code, expires }, verified: false, phoneNumber: phone },
        });
        try {
            const url = `${this.config.get('SMS_BASE_URL')}/sendtext?apikey=${this.config.get('SMS_API_KEY')}&secretkey=${this.config.get('SMS_SECRET_KEY')}&callerID=123&toUser=${phone}&messageContent=Welcome to Place Arena, your verification code is ${code}`;
            const response = await fetch(url, { method: 'GET' });
            return response.json();
        }
        catch (err) {
            console.log(err);
        }
    }
    async verifyOtp({ id, code }) {
        const user = await this.usersModel.findOne({ _id: id });
        if (!user?.otp || user.otp.expires < Date.now() || user.otp.code !== code) {
            return false;
        }
        await this.usersModel.updateOne({ _id: id }, {
            $unset: { otp: 1 },
            $set: { verified: true },
        });
        return true;
    }
    async checkStatus(messageId) {
        const url = `${this.config.get('SMS_BASE_URL')}/getstatus?apikey=${this.config.get('SMS_API_KEY')}&secretkey=${this.config.get('SMS_SECRET_KEY')}&messageid=11720913`;
        const response = await fetch(url, { method: 'GET' });
        return response.json();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        property_service_1.PropertyService])
], UsersService);
//# sourceMappingURL=users.service.js.map