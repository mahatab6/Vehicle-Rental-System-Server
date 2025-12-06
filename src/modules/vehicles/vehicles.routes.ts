import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth('admin'), vehiclesController.vehiclesPost)

router.get("/", vehiclesController.vehiclesAllGet)

router.get("/:vehicleId", vehiclesController.vehiclesSpecificGet)

router.put("/:vehicleId",auth('admin'), vehiclesController.vehiclesUpdate)

router.delete("/:vehicleId", vehiclesController.vehiclesDelete)

export const vehiclesRoutes = router;

