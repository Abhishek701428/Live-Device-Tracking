import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
    deviceId: string;
    data: any[];
    nowDate: Date;
    nowTime: number;
}

const subscriptionSchema: Schema = new Schema({
    deviceId: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    nowDate: { type: Date, required: true },
    nowTime: { type: Number, required: true }
});

const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;