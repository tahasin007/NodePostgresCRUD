import e, { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC')
    res.json(rows)
  } catch (error) {
    console.error(`Error creating database: ${error}`)
    res.status
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    console.error(`Error creating database: ${error}`)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    res.json(rows[0])
  } catch (error) {
    console.error(`Error creating database: ${error}`)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    )
    res.json(rows[0])
  } catch (error) {
    console.error(`Error creating database: ${error}`)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { rows } = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    )
    res.json(rows[0])
  } catch (error) {
    console.error(`Error creating database: ${error}`)
  }
})

export default router
