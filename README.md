# Vehicle Rental System Backend API

Welcome to the backend repository for the **Vehicle Rental System**. This project provides a robust, scalable API for managing vehicle rentals, customer accounts, and bookings, featuring secure role-based authentication.

The architecture is based on a modular pattern with a clear separation of concerns, organizing code into feature-based modules (e.g., `auth`, `users`, `vehicles`, `bookings`) with proper layering (routes, controllers, services).

## Live URL

The live application is deployed and available here: [XXXXXXXXXXXXXXXXX](XXXXXXXXXXXXXXXXX)

## Features

- **Vehicles**: Comprehensive management of vehicle inventory, including real-time availability tracking.
- **Customers**: Management of customer accounts and profiles.
- **Bookings**: Handling of vehicle rental processes, return management, and automated cost calculation.
- **Authentication**: Secure, role-based access control (RBAC) supporting both `Admin` and `Customer` roles using JWTs.

## Technology Stack

The project is built using TypeScript and Node.js with Express.js, backed by a PostgreSQL database.

### Core Dependencies

- `express`: The primary web framework for Node.js.
- `pg`: Non-blocking PostgreSQL client for Node.js.
- `bcryptjs`: For hashing and securing passwords.
- `jsonwebtoken`: For implementing JWT-based authentication.
- `date-fns`: For efficient date management and calculations.
- `dotenv`: For managing environment variables.

### Development Dependencies

- `typescript` & `ts-node`: For building and running TypeScript code.
- `@types/*`: Type definitions for Node.js, Express, jsonwebtoken, and pg.

## Setup & Usage Instructions

To run this project locally, follow these steps:

### 1. Clone the Repository

Clone the project repository to your local machine using the following command:

```bash
git clone <YOUR_REPOSITORY_URL_HERE>
cd vehicle-rental-system

```

### 2. Install Dependencies

Install all required Node.js dependencies using npm or yarn:

- `npm install`

### 3. Configure Environment Variables

Create a .env file in the root directory of the project. This file will store your configuration variables.

# .env file content

- PORT=5000
- CONNECTIONSTRING="postgresql://user:password@localhost:5432/vehiclerentaldb"
- jwtSecretKey="A_VERY_STRONG_AND_SECRET_KEY_FOR_JWT_SIGNING"

### 4. Run the Application

- npm run dev

### API Endpoints

| Module       | HTTP Method | Endpoint                      | Description                                  | Roles           |
| ------------ | ----------- | ----------------------------- | -------------------------------------------- | --------------- |
| **Auth**     | POST        | `/api/v1/auth/signup`         | Register a new customer account              | Public          |
| **Auth**     | POST        | `/api/v1/auth/signin`         | Authenticate and receive a JWT token         | Public          |
| **Users**    | GET         | `/api/v1/users`               | List all users                               | Admin           |
| **Users**    | PUT         | `/api/v1/users/:userId`       | Update user profile                          | Admin, Customer |
| **Users**    | DELETE      | `/api/v1/users/:userId`       | Delete a user account                        | Admin           |
| **Vehicles** | POST        | `/api/v1/vehicles`            | Add a new vehicle to inventory               | Admin           |
| **Vehicles** | GET         | `/api/v1/vehicles`            | List all vehicles                            | Public          |
| **Vehicles** | GET         | `/api/v1/vehicles/:vehicleId` | Get details for a specific vehicle           | Public          |
| **Vehicles** | PUT         | `/api/v1/vehicles/:vehicleId` | Update vehicle details                       | Admin           |
| **Vehicles** | DELETE      | `/api/v1/vehicles/:vehicleId` | Remove a vehicle                             | Admin           |
| **Bookings** | POST        | `/api/v1/bookings`            | Create a new rental booking                  | Admin, Customer |
| **Bookings** | GET         | `/api/v1/bookings`            | View all bookings/current user's bookings    | Admin, Customer |
| **Bookings** | PUT         | `/api/v1/bookings/:bookingId` | Update/Process a booking (e.g., mark return) | Admin, Customer |
