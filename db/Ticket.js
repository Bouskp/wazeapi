import { DataTypes } from 'sequelize'
import { db } from './db.js'

export const TicketModele = db.define(
  'tickets',
  {
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
      type: DataTypes.STRING,
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
  },
  { timestamps: true, underscored: true, tableName: 'Tickets' }
)
