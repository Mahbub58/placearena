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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const property_schema_1 = require("./schemas/property.schema");
const mongoose_2 = require("mongoose");
let PropertyService = class PropertyService {
    propertyModel;
    constructor(propertyModel) {
        this.propertyModel = propertyModel;
    }
    async create(data) {
        const result = await this.propertyModel.create(data);
        if (!result) {
            throw new common_1.NotFoundException('Property could not be created');
        }
        return { success: true, data: result };
    }
    async getAll() {
        return await this.propertyModel.find({});
    }
    async getAllApproved() {
        return await this.propertyModel.find({ status: 'approve' });
    }
    async getSingle(id) {
        const result = await this.propertyModel
            .findById(id)
            .populate('ownerId', 'fullName email phoneNumber role');
        if (!result) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return result;
    }
    async getByOwnerId(ownerId) {
        return await this.propertyModel.find({ ownerId });
    }
    async getAllProductByIds(ids) {
        try {
            const properties = await this.propertyModel.find({ _id: { $in: ids } });
            if (!properties || properties.length === 0) {
                throw new common_1.NotFoundException('No properties found for the given IDs');
            }
            return { success: true, data: properties };
        }
        catch (error) {
            throw new common_1.NotFoundException('Error fetching properties by IDs');
        }
    }
    async getPropertiesNotApproved() {
        return this.propertyModel
            .find({
            $or: [{ status: { $exists: false } }, { status: { $ne: 'approve' } }],
        })
            .exec();
    }
    async updateProperty(id, updatedData) {
        const updatedProperty = await this.propertyModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        if (!updatedProperty) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return updatedProperty;
    }
    async deleteProperty(id) {
        const result = await this.propertyModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return { message: 'Property deleted successfully' };
    }
    async deleteAllPropertyOfUser({ id, session }) {
        const result = await this.propertyModel.deleteMany({ ownerId: id }, session ? { session } : {});
        if (!result.acknowledged) {
            throw new common_1.NotFoundException(`Property with ID ${id} not found`);
        }
        return true;
    }
    async searchProperties(query) {
        const searchRegex = new RegExp(query, 'i');
        return await this.propertyModel.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { location: searchRegex },
                { type: searchRegex },
                { features: { $in: [searchRegex] } },
            ],
        });
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PropertyService);
//# sourceMappingURL=property.service.js.map