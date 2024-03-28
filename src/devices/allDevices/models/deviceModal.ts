import mongoose, { Schema, Document } from 'mongoose';

interface Device extends Document {
  messages_ttl: number;
  protocol_id: number;
  device_type_id: number;
  id: number;
  media_ttl: number;
  name: string;
  configuration: {
    ident: string;
    settings_polling: string;
    sms_password: string;
  };
  cid: number;
  media_rotate: number;
  messages_rotate: number;
}

const deviceSchema: Schema<Device> = new Schema({
  messages_ttl: Number,
  protocol_id: Number,
  device_type_id: Number,
  id: Number,
  media_ttl: Number,
  name: String,
  configuration: {
    ident: String,
    settings_polling: String,
    sms_password: String
  },
  cid: Number,
  media_rotate: Number,
  messages_rotate: Number
});

const Device = mongoose.model<Device>('Device', deviceSchema);

export default Device;
