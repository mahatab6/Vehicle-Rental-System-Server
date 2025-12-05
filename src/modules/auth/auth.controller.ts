import { Request, Response } from "express";
import { authService } from "./auth.service";


const userSignup = async (req:Request, res:Response) => {
   try {
    const result = await authService.userSignup(req.body);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
    })
   } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
};

const userSignin = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.userSignin(email, password);
        
        if(result === null){
           res.status(401).json({
            success: false,
            message: "Unauthorized, Please submit your correct email address"
        })} else if (result === false){
            res.status(403).json({
            success: false,
            message: "Forbidden, Please write correct password "
        })} else{
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            })
        }


    } catch (error:any) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const authController = {
    userSignup,
    userSignin
}