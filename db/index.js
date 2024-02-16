import { UserModele } from './User.js'
import { TicketModele } from './Ticket.js'
import { EventModele } from './Event.js'

// Event et User
EventModele.belongsTo(UserModele, {
  foreignKey: 'organisateurId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
UserModele.hasMany(EventModele)

// Ticket et Event
TicketModele.belongsTo(EventModele, {
  foreignKey: 'eventId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
EventModele.hasMany(TicketModele)

// Ticket et User
TicketModele.belongsTo(UserModele, {
  foreignKey: 'userId',
  allowNull: true,
})
UserModele.hasMany(TicketModele)

export { EventModele, UserModele, TicketModele }
