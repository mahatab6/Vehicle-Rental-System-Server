import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/database"

const usersGet = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
}

const usersPut = async (payload:Record<string, unknown>, id:string, payloadData: JwtPayload) => {

    const { name, email, phone, role } = payload;

    const isCustomer = (payloadData?.role === "customer")
   
    let roleUpdate = role;

    if(isCustomer){
        roleUpdate = "customer";
    } 
    
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`, [name, email, phone, roleUpdate, id])

    return result.rows[0]
}

const userDelete = async (id:string) => {

    const checkUser = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [id]);
    if(checkUser?.rows[0]?.status === "active"){
        return "active"
    } else{
        const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
        return result.rowCount
    }
}


export const userService = {
    usersGet,
    usersPut,
    userDelete
}