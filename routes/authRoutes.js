import express from 'express'
import { login } from '../Controllers/auth.js'

const authRouter = express.Router()
authRouter.post('/login', login)

export { authRouter }
