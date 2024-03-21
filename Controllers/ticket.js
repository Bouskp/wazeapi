import { TicketModele, UserModele, EventModele } from '../db/index.js'
import { nanoid } from 'nanoid'
import ac from '../utils/roles.js'

// Creer un nouveau ou plusieurs tickets
const addTicket = async (req, res) => {
  // GEstion des permissions
  const { role, id } = req.user
  const allpermissions = role.map((r) => ac.can(r).create('user').granted)
  const permission = allpermissions.includes(true)
  if (permission) {
    const { prix, pass, codeQrUrl = '', eventId = 1, userId } = req.body

    // generate codeTicket
    const codeTicket = nanoid(8)

    //isSell
    const isSell = req.body.userId ? true : false

    const ticket = TicketModele.build({
      prix,
      pass,
      isSell,
      codeTicket,
      userId,
      eventId: 1,
      codeQrUrl,
    })
    await ticket.save()
    return res.status(200).json({ msg: 'Vous pouvez ajouter ticket' })
  } else {
    return res.status(403).json({ msg: 'Vous ne pouvez pas ajouter de ticket' })
  }
}

const addManyTicket = async (req, res) => {}

// chercher un ticket
const getTicketById = async (req, res) => {}
const getTicketByCodeTicket = async (req, res) => {}
const getTicketByEventId = async (req, res) => {}

// Modifier un ou plusieurs tickets
const updateTicket = async (req, res) => {}
const updateManyTicket = async (req, res) => {}

// Supprimer un ticket
const removeTicket = async (req, res) => {}

export {
  addManyTicket,
  addTicket,
  getTicketByCodeTicket,
  getTicketById,
  updateManyTicket,
  updateTicket,
  removeTicket,
}
