import express, { Request, Response } from "express"
import initDB from "./config/database"


const app = express()

initDB();


app.get('/', (req: Request, res:Response) => {
  res.send('Vehicle Rental System running')
})




export default app;