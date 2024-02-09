import express from 'express'
import { getUserByCodeClient, getUserById } from '../Controllers/user.js'

const userRouter = express.Router()
userRouter.get('/:id', getUserById)
userRouter.get('/code/:codeClient', getUserByCodeClient)

export { userRouter }
