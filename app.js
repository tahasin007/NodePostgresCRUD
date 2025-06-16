import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import { createUsersTable } from './db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

app.use('/users', userRoutes)

app.listen(port, async () => {
  await createUsersTable()
  console.log(`Server running at http://localhost:${port}`)
})
