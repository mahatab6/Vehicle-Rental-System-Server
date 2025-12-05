import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth('admin'), vehiclesController.vehiclesPost)

export const vehiclesRoutes = router;

