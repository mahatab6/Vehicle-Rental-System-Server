import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const vehiclesPost = async (req:Request, res:Response) => {
    try {
        const result = await vehiclesService.vehiclesPost(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result,
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const vehiclesController = {
    vehiclesPost,
}