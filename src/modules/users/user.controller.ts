import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const usersGet = async (req:Request, res:Response) => {
    try {
        const result = await userService.usersGet();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result,
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const usersPut = async (req:Request, res: Response) => {

    try {
       const result = await userService.usersPut(req.body, req.params.userId as string, req.payloadData as JwtPayload);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })  
    }
}

export const userController = {
    usersGet,
    usersPut
}