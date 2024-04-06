import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { IUser } from './usersModels';
import UserModel from './usersModels';
import Subscription from '../../devices/webSocketServer/models/subscriptionModel';
dotenv.config();

const loginAllUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.usertype !== 'superadmin' && !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.usertype === 'superadmin' && user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const subscriptions = await Subscription.find({ deviceId: { $in: user.devicesId } });

    const matchedDevicesId = subscriptions.map(subscription => subscription.deviceId);

    const matchedDevices = matchedDevicesId.filter(deviceId => user.devicesId.includes(deviceId));

    const uniqueDevices = [...new Set(matchedDevices)];

    console.log('Matched Devices:', uniqueDevices);

    let responseData: { token: string; name: string; usertype: string; devicesId?: string[] } = {
      token: '',
      name: user.name,
      usertype: user.usertype,
    };

    if (uniqueDevices.length > 0) {
      responseData.devicesId = uniqueDevices;
    }

    const token = jwt.sign(
      {
        id: user._id,
        usertype: user.usertype,
        name: user.name,
        devicesId: uniqueDevices, 
      },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '30d' }
    );

    responseData.token = token;

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const registerAllUser = async (req: Request, res: Response) => {
  const { name, email, password, usertype, devicesId } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User or Admin already exists' });
    }

    const requester = (req as any).user as IUser;

    if (requester.usertype !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can register users.' });
    }

    if (usertype !== 'user') {
      return res.status(400).json({ message: 'Invalid usertype. Only "user" is allowed.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword, usertype, devicesId });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { loginAllUsers, registerAllUser };
