import mongoose, { Document, Schema } from "mongoose";


type User = Document & {
    email: string;
    socket_id: string;
    name: string;
    avatar_url: string;
};

const UserSchema = new Schema({
    email: String,
    socket_id: String,
    name: String,
    avatar_url: String,
});


const User = mongoose.model<User>('Users', UserSchema);

export { User }