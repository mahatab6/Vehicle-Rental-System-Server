import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";

const auth = (...role:string[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {

        try {
            const authHeader = req.headers.authorization;
            if(!authHeader){
                res.status(500).json({
                    success: false,
                    message: "You access not allowed"
                })
            }

            const token = authHeader?.split(" ")[1];

            const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;

            if(!role.includes(decoded.role)){
                res.status(500).json({
                    success: false,
                    message: "You can't visit this link's"
                })
            }
            
            next();

        } catch (error:any) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
}


export default auth;