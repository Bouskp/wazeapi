import { DataTypes, Sequelize } from 'sequelize'
import { db } from './db.js'

export const UserModele = db.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prenom: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    // roles: {
    //   type: DataTypes.ENUM('participant', 'organisateur', 'distributeur'),
    //   defaultValue: 'participateur',
    // },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ville: {
      type: DataTypes.STRING,
    },
    pays: {
      type: DataTypes.STRING,
    },
    codeClient: {
      type: DataTypes.STRING,
      unique: true,
    },
    siteWeb: {
      type: DataTypes.STRING,
    },
  },
  { tableName: 'Users', timestamps: true, underscored: true }
)
