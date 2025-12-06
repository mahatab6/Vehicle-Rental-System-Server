import { pool } from "../../config/database"

const usersGet = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
}


export const userService = {
    usersGet,
}