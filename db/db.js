import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mariadb',
    port: process.env.DB_PORT,
    host: 'localhost',
  }
)
