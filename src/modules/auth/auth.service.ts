import { pool } from "../../config/database";
import bcrypt from "bcryptjs";


const userSignup = async (payload: Record<string, unknown>) => {

    const {name, email, password, phone, role} = payload;
    const hash = bcrypt.hashSync(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, email, hash, phone, role]);

    return result.rows[0];
   
}

export const authService = {
    userSignup,
}