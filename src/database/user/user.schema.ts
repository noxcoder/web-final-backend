import { Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "super admin", "IT guy"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    }
});

export default UserSchema;