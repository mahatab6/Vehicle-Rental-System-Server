import { pool } from "../../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";


const userSignup = async (payload: Record<string, unknown>) => {

    const {name, email, password, phone, role} = payload;
    const hash = bcrypt.hashSync(password as string, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, email, hash, phone, role]);

    return result.rows[0];
}

const userSignin = async ( email:string, password:string) => {
    
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if(result.rows.length === 0){
        return null;
    }

    const user = result.rows[0];
    const passwordMatch =await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        return false;
    }

    const payloadData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        role: user?.role,
    }

    const token = jwt.sign(payloadData, config.jwtSecret as string, {expiresIn:"3d"} )
    const resData = {
        token,
        user: payloadData
    }

    return resData
}

export const authService = {
    userSignup,
    userSignin
}