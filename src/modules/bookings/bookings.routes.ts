import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post("/",auth('admin', 'customer'), bookingsController.bookingsPost)

router.get("/",auth('admin', 'customer'), bookingsController.bookingsGet)


export const bookingsRouter = router;