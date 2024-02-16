import { TicketModele, UserModele, EventModele } from '../db/index.js'
import { nanoid } from 'nanoid'

// Creer un nouveau ou plusieurs tickets
const addTicket = async (req, res) => {
  return res.status(200).json({ msg: 'Bonjour' })
}
const addManyTicket = async (req, res) => {}

// chercher un ticket
const getTicketById = async (req, res) => {}
const getTicketByCodeTicket = async (req, res) => {}

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
