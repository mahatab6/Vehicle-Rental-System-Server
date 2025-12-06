import { Request, Response } from "express";
import { bookingsService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

const bookingsPost = async (req: Request, res: Response) => {
  try {
    const result = await bookingsService.bookingsPost(req.body);
    if (result === "booked") {
      res.status(200).json({
        success: false,
        message: "Already vehicle booked.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Booking created successfully.",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const bookingsGet = async (req: Request, res: Response) => {
  try {
    const result = await bookingsService.bookingsGet(
      req.payloadData as JwtPayload
    );
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingsController = {
  bookingsPost,
  bookingsGet,
};
