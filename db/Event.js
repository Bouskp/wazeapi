import { DataTypes, Sequelize } from 'sequelize'
import { db } from './db.js'
import { UserModele } from './User.js'

export const EventModele = db.define(
  'Event',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categorie: {
      type: DataTypes.STRING,
      defaultValue: 'concert',
      validate: {
        isIn: [
          [
            'concert',
            'festival',
            'concert-spctacle',
            'event etudiant',
            'tourisme et loisirs',
            'spectacle',
            'seminaire et loisirs',
            'semininaire,convention interne',
            'spectacle(théâtre danse, one-man show',
            'atelier et cours',
            'match,manifestation sportive',
            'conference et séminaire',
            'salon et foire',
            'autre',
          ],
        ],
      },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    heure: {
      type: DataTypes.TIME,
    },
    telephone: { type: DataTypes.INTEGER },
    ville: { type: DataTypes.STRING },
    visuel: { type: DataTypes.STRING, defaultValue: '' },
    description: { type: DataTypes.TEXT, defaultValue: '' },
    siteWeb: { type: DataTypes.TEXT, defaultValue: '' },
    nbreTicket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isOnline: { type: DataTypes.BOOLEAN, defaultValue: false },
    isUniqueEvent: { type: DataTypes.BOOLEAN, defaultValue: true },
    codeEvent: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, underscored: true, tableName: 'Events' }
)
