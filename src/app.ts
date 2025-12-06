import express, { Request, Response } from "express"
import initDB from "./config/database"
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { userRouter } from "./modules/users/user.routes";


const app = express();

app.use(express.json());

initDB();


// Authentication API
app.use("/api/v1/auth", authRoutes)

// Vehicles API
app.use("/api/v1/vehicles", vehiclesRoutes)

// Users API
app.use("/api/v1/users", userRouter)

app.get('/', (req: Request, res:Response) => {
  res.send('Vehicle Rental System running')
})




export default app;