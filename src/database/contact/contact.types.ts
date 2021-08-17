import { Document, Model } from "mongoose";

export interface IContact {
    email: string;
    name: string;
    body: string;
    createdOn: Date;
}

export interface IContactDocument extends IContact, Document {};

export interface IContactModel extends Model<IContactDocument> {};