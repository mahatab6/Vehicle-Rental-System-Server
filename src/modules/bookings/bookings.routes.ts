import { Router } from "express";
import { bookingsController } from "./bookings.controller";


const router = Router();

router.post("/", bookingsController.bookingsPost)


export const bookingsRouter = router;