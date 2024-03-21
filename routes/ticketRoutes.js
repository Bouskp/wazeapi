import express from 'express'
import {
  getTicketById,
  addTicket,
  addManyTicket,
  removeTicket,
  getTicketByCodeTicket,
  updateManyTicket,
  updateTicket,
} from '../Controllers/ticket.js'
import verifyToken from '../middlewares/verifyToken.js'

const ticketRouter = express.Router()

ticketRouter.get('/:id', getTicketById)
ticketRouter.get('/:code', getTicketByCodeTicket)
ticketRouter.post('/', verifyToken, addTicket)
ticketRouter.post('/many', addManyTicket)
ticketRouter.delete('/:id', removeTicket)
ticketRouter.put('/many', updateManyTicket)
ticketRouter.put('/:id', updateTicket)

export { ticketRouter }
