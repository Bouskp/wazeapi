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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'participant,',
      get() {
        const value = this.getDataValue('role')
        return value.split(',')
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: false,
    },
    siteWeb: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  { tableName: 'Users', timestamps: true, underscored: true }
)
