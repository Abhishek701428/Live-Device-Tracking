import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    driver: string;
    totalUpdate: string;
}

const userSchema: Schema = new mongoose.Schema({
    driver: {
        type: String,
        required: true,
    },
    totalUpdate: {
        type: String,
        required: true,
        unique: true,
    },
});

const UserModel = mongoose.model<IUser>('DriverHoursOfServiceAuditReport', userSchema);

export default UserModel;