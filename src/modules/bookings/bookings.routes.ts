import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post("/",auth('admin', 'customer'), bookingsController.bookingsPost)


export const bookingsRouter = router;