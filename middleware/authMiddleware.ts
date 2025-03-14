import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: any;
}
const varifyToken = async(req: AuthRequest,res: Response, next: any): Promise<any>=> {

    const token = req.header('Authorization')?.split(' ')?.[1];
    if(!token){
        return res.status(401).send({success: false,message:"Token Required"})
    }

    try {
        console.log('req', req)
        const decodeToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        console.log('decodeToken', decodeToken?.userId)
        req.user = decodeToken.userId
        next();
    } catch (error) {
        if(!token){
            return res.status(401).send({success: false,message:"Invalid Token"})
        }
        
    }

}
export default varifyToken;