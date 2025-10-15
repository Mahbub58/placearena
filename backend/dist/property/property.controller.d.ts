import { CreatePropertyDto } from './dto/create-property-dto';
import { PropertyService } from './property.service';
import { Property } from './schemas/property.schema';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    crate(createPropertyDto: CreatePropertyDto): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllApproved(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getByOwnerId(ownerId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getPropertiesByIds(ids: string[]): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getUsersNotApproved(): Promise<Property[]>;
    getSingle(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProperty(id: string, updatedData: Partial<Property>): Promise<Property>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
