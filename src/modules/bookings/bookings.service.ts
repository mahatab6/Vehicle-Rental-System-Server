import { differenceInDays, format, parseISO } from "date-fns";
import { pool } from "../../config/database";
import { JwtPayload } from "jsonwebtoken";

const bookingsPost = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);
  if (vehicle?.rows[0]?.availability_status === "booked") {
    return "booked";
  }

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);
  const day = differenceInDays(end, start);

  const total_price = vehicle?.rows[0]?.daily_rent_price * day;
  const newStatus = "booked";

  const vehicleStatusUpdate = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id=$2`,
    [newStatus, vehicle_id]
  );

  if (vehicleStatusUpdate?.rowCount === 1) {
    const status: string = "active";

    const booking = await pool.query(
      `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, customer_id, vehicle_id, TO_CHAR(rent_start_date, 'YYYY-MM-DD') AS rent_start_date, TO_CHAR(rent_end_date, 'YYYY-MM-DD') AS rent_end_date, total_price, status`,
      [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status,
      ]
    );

    const result = {
      ...booking.rows[0],
      vehicle: {
        vehicle_name: vehicle?.rows[0].vehicle_name,
        daily_rent_price: vehicle?.rows[0].daily_rent_price,
      },
    };

    return result;
  }
};

const bookingsGet = async (payloadData: JwtPayload) => {
  const isAdmin = payloadData.role === "admin";
  const id = payloadData.id;
  if (isAdmin) {
    const result = await pool.query(
      `SELECT * FROM bookings INNER JOIN users ON bookings.customer_id = users.id INNER JOIN vehicles ON bookings.vehicle_id = vehicles.id`
    );

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        customer_id: item.customer_id,
        vehicle_id: item.vehicle_id,
        rent_start_date: item.rent_start_date.toISOString().split("T")[0],
        rent_end_date: item.rent_end_date.toISOString().split("T")[0],
        total_price: Number(item.total_price),
        status: item.status,
        customer: {
          name: item.name,
          email: item.email,
        },
        vehicle: {
          vehicle_name: item.vehicle_name,
          registration_number: item.registration_number,
        },
      };
    });

    return data;
  } else {
    const result = await pool.query(
      `SELECT * FROM bookings INNER JOIN users ON bookings.customer_id = users.id INNER JOIN vehicles ON bookings.vehicle_id = vehicles.id WHERE customer_id=$1`,
      [id]
    );

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        customer_id: item.customer_id,
        vehicle_id: item.vehicle_id,
        rent_start_date: item.rent_start_date.toISOString().split("T")[0],
        rent_end_date: item.rent_end_date.toISOString().split("T")[0],
        total_price: Number(item.total_price),
        status: item.status,
        customer: {
          name: item.name,
          email: item.email,
        },
        vehicle: {
          vehicle_name: item.vehicle_name,
          registration_number: item.registration_number,
          type: item.type
        },
      };
    });

    return data;
  }
};

export const bookingsService = {
  bookingsPost,
  bookingsGet,
};
