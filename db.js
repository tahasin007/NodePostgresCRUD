// db.js
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

export async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `
  await pool.query(query)
  console.log('Users table ensured')
}
