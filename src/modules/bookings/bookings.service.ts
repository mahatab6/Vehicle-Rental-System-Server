import { differenceInDays } from "date-fns";
import { pool } from "../../config/database";


const bookingsPost = async (payload:Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])
    if(vehicle.rows[0].availability_status === "booked"){
        return "booked"
    }

    const start = new Date(rent_start_date as string)
    const end = new Date(rent_end_date as string)
    const day = differenceInDays(end, start)
    
    const total_price = (vehicle.rows[0].daily_rent_price * day)
    const newStatus = "booked"
    
    const vehicleStatusUpdate = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [newStatus, vehicle_id])

    if(vehicleStatusUpdate.rowCount === 1){
        const status:string = "active";

        const booking = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, TO_CHAR(rent_end_date,   'YYYY-MM-DD') AS rent_end_date, total_price, status`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);

        const result = {
            ...booking.rows[0],
            vehicle:{
                vehicle_name: vehicle.rows[0].vehicle_name,
                daily_rent_price: vehicle.rows[0].daily_rent_price
            }
        }

        return result
    }

}

export const bookingsService = {
    bookingsPost
}