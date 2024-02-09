import { DataTypes, Sequelize } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:', {
  freezeTableName: true,
})

export const EventModele = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categorie: {
    type: DataTypes.ENUM(
      'concert',
      'festival',
      'concert-spctacle',
      'festival',
      'event etudiant',
      'tourisme et loisirs',
      'spectacle',
      'seminaire et loisirs',
      'spectacle',
      'semininaire,convention interne',
      'spectacle(théâtre danse, one-man show',
      'sports et loisirs',
      'atelier et cours',
      'match, manifestation sportive',
      'conference et séminaire',
      'salon et foire',
      'autre'
    ),
    defaultValue: 'concert',
  },
  eventDate: {
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
  description: { type: DataTypes.TEXT, defaultValue: '' },
  nbreTicket: {
    type: DataTypes.INTEGER,
  },
  isOnline: { type: DataTypes.BOOLEAN, defaultValue: false },
  isUniqueEvent: { type: DataTypes.BOOLEAN, defaultValue: true },
  codeEvent: { type: DataTypes.STRING, allowNull: false },
})
