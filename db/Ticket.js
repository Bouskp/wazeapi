import { DataTypes, Sequelize } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:', {
  freezeTableName: true,
})

export const TicketModele = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  prix: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pass: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codeQrUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isSell: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  codeTicket: {
    type: DataTypes.TEXT,
    unique: true,
  },
})
