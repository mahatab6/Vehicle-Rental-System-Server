import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get('/',auth('admin'), userController.usersGet)

router.put('/:userId',auth('admin', 'customer'), userController.usersPut)

export const userRouter = router;