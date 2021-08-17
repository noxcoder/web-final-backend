import { Schema } from "mongoose";

const ContactSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        default: "Hacker"
    },
    body: {
        type: String,
        required: true,
        default: "Just give me the flag"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default ContactSchema;