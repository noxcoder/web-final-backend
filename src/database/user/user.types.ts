import { Document, Model } from "mongoose";

export interface IUser {
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {};

export interface IUserModel extends Model<IUserDocument> {};