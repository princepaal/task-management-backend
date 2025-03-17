import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: { id: string };
}

const varifyToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    console.log('Middleware triggered', req.header('Authorization'));

    const token = req.header('Authorization')?.split(' ')?.[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token Required" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        console.log('Decoded Token:', decodedToken.userId);
        req.user = { id: decodedToken.userId };
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default varifyToken;
