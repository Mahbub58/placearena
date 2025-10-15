import mongoose, { Document } from 'mongoose';
export type PropertyDocument = Property & Document;
export declare class Property {
    title: string;
    ownerId: string;
    location: string;
    type: string;
    rent: string;
    rooms: string;
    bathrooms: string;
    area: string;
    description: string;
    features: string[];
    images: string[];
    status?: string;
}
export declare const PropertySchema: mongoose.Schema<Property, mongoose.Model<Property, any, any, any, mongoose.Document<unknown, any, Property, any, {}> & Property & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Property, mongoose.Document<unknown, {}, mongoose.FlatRecord<Property>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Property> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
