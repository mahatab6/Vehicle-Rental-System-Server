import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get('/',auth('admin'), userController.usersGet)

export const userRouter = router;