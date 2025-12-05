import express, { Request, Response } from "express"
import initDB from "./config/database"
import { authRoutes } from "./modules/auth/auth.routes";


const app = express();

app.use(express.json());

initDB();


// Authentication API
app.use("/api/v1/auth", authRoutes)




app.get('/', (req: Request, res:Response) => {
  res.send('Vehicle Rental System running')
})




export default app;