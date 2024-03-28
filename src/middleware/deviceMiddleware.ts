import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../modules/users/usersModels';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication failed: Token missing.' });
    }

    try {
        if (!process.env.AUTH_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is missing from environment variables.');
        }

        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET_KEY);

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed: User not found.' });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        console.error('Error authenticating JWT token:', error);
        return res.status(401).json({ error: `Authentication failed: ${error.message}` });
    }
};