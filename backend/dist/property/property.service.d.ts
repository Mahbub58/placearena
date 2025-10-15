import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
export declare class PropertyService {
    private propertyModel;
    constructor(propertyModel: Model<PropertyDocument>);
    create(data: Property): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllApproved(): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSingle(id: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getByOwnerId(ownerId: string): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllProductByIds(ids: string[]): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, PropertyDocument, {}, {}> & Property & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getPropertiesNotApproved(): Promise<Property[]>;
    updateProperty(id: string, updatedData: Partial<Property>): Promise<Property>;
    deleteProperty(id: string): Promise<{
        message: string;
    }>;
    deleteAllPropertyOfUser({ id, session }: {
        id: string;
        session: any;
    }): Promise<boolean>;
}
