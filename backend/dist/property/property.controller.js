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
exports.PropertyController = void 0;
const create_property_dto_1 = require("./dto/create-property-dto");
const property_service_1 = require("./property.service");
const common_1 = require("@nestjs/common");
let PropertyController = class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    async crate(createPropertyDto) {
        console.log(createPropertyDto);
        return await this.propertyService.create(createPropertyDto);
    }
    async searchProperties(query) {
        if (!query || query.trim().length === 0) {
            return await this.propertyService.getAll();
        }
        return await this.propertyService.searchProperties(query);
    }
    async getAll() {
        return await this.propertyService.getAll();
    }
    async getAllApproved() {
        return await this.propertyService.getAllApproved();
    }
    async getByOwnerId(ownerId) {
        return await this.propertyService.getByOwnerId(ownerId);
    }
    async getPropertiesByIds(ids) {
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            throw new common_1.BadRequestException('Ids array is required in request body');
        }
        return this.propertyService.getAllProductByIds(ids);
    }
    async getUsersNotApproved() {
        return this.propertyService.getPropertiesNotApproved();
    }
    async getSingle(id) {
        return await this.propertyService.getSingle(id);
    }
    async updateProperty(id, updatedData) {
        return this.propertyService.updateProperty(id, updatedData);
    }
    async deleteUser(id) {
        return this.propertyService.deleteProperty(id);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "crate", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "searchProperties", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('approve'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getAllApproved", null);
__decorate([
    (0, common_1.Get)('owner/:ownerId'),
    __param(0, (0, common_1.Param)('ownerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getByOwnerId", null);
__decorate([
    (0, common_1.Post)('by-ids'),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertiesByIds", null);
__decorate([
    (0, common_1.Get)('not-approved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getUsersNotApproved", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getSingle", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "updateProperty", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "deleteUser", null);
exports.PropertyController = PropertyController = __decorate([
    (0, common_1.Controller)('property'),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map