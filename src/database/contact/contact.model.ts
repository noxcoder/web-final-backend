import { model } from "mongoose";
import ContactSchema from "./contact.schema";
import { IContactDocument } from "./contact.types";

export const ContactModel = model<IContactDocument>("contact", ContactSchema);