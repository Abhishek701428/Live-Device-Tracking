import Subscription from '../../webSocketServer/models/subscriptionModel';
import { Server as SocketIOServer } from 'socket.io';
import * as mqtt from 'mqtt';
import { Server as HttpServer } from 'http';
import { Socket } from 'socket.io';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const MAX_DATA_COUNT = 5;
let devicesData: { [deviceId: string]: any[] } = {};

const saveDataToMongo = async (deviceID: string) => {
    const dataToSave = devicesData[deviceID].splice(0, MAX_DATA_COUNT);
    if (dataToSave.length > 0) {
        try {
            const currentDate = new Date();
            const currentTime = currentDate.getTime();
            await Subscription.create({ deviceId: deviceID, data: dataToSave, nowDate: currentDate, nowTime: currentTime });
            console.log(`Saved ${dataToSave.length} data points for device ${deviceID} to MongoDB`);
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
        }
    }
};

const initWebSocketServer = (httpServer: HttpServer) => {
    const io: SocketIOServer = require('socket.io')(httpServer, {
        cors: {
            origin: "*", // Replace with your frontend's origin
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
    });
    const flespiToken = process.env.FLESPI_TOKEN;
    const mqttBrokerUrl = process.env.MQTT_BROKER_URL;
    const clientId = process.env.CLIENT_ID;

    const options: mqtt.IClientOptions = {
        clientId: clientId,
        username: flespiToken,
        password: '',
    };
    const client: mqtt.MqttClient = mqtt.connect(mqttBrokerUrl, options);

    client.on('connect', () => {
        console.log('Connected to Flespi MQTT broker');
        client.subscribe('flespi/message/gw/devices/+', (err) => {
            if (!err) {
                console.log('Subscribed to messages for all devices');
            } else {
                console.error('Subscription failed:', err);
            }
        });
    });

    client.on('message', async (topic, message) => {
        try {
            const jsonData = JSON.parse(message.toString());
            const deviceID = topic.split('/').pop();
            console.log(`Received real-time data from device ${deviceID}:`, jsonData);
            io.to(deviceID).emit('realTimeData', jsonData);
            io.to(deviceID).emit('realTimeData', { deviceID, data: jsonData });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

    client.on('error', (error) => {
        console.error('MQTT error:', error);
    });

    client.on('close', () => {
        console.log('Disconnected from MQTT broker');
    });

    io.on('connection', async (socket: Socket) => {
        console.log('A client connected');
        try {
            const token = socket.handshake.query.token as string;
            if (!token) {
                throw new Error('JWT token not provided');
            }
            const decodedToken: any = jwt.verify(token, process.env.AUTH_SECRET_KEY);
            const userDevices = decodedToken.devicesId;
            if (typeof userDevices === 'string') {
                socket.join(userDevices);
            } else if (Array.isArray(userDevices)) {
                for (const device of userDevices) {
                    socket.join(device);
                }
            }

            const lastData = await Subscription.find({ deviceId: { $in: userDevices } }).sort({ nowTime: -1 }).limit(1);
            if (lastData) {
                socket.emit('lastData', lastData);
            }
        } catch (error) {
            console.error('Error fetching last saved data:', error.message);
            socket.emit('tokenError', { message: error.message });
        }
    });

    Subscription.watch().on('change', async (change) => {
        try {
            const updatedData = await Subscription.findOne({ deviceId: change.fullDocument.deviceId }).sort({ nowTime: -1 }).limit(1);
            if (updatedData) {
                io.emit('realTimeDataUpdate', updatedData);
            }
        } catch (error) {
            console.error('Error fetching updated data:', error);
        }
    });

    return io;
};
export default initWebSocketServer;
