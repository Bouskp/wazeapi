import { Sequelize } from 'sequelize'

export const db = new Sequelize('waze', 'root', '', {
  dialect: 'mariadb',
  port: 3307,
  host: 'localhost',
})
