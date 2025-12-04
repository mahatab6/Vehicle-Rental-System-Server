import express, { Request, Response } from "express"


const app = express()


app.get('/', (req: Request, res:Response) => {
  res.send('Vehicle Rental System running')
})




export default app;