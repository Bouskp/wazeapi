import express from 'express'
import { config } from 'dotenv'
import { db } from './db/db.js'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import path from 'path'
import multer from 'multer'
import { login, register } from './Controllers/auth.js'
import { userRouter } from './routes/userRoutes.js'
import { updateUser } from './Controllers/user.js'

// creation du server
const app = express()

// Mise en place des middlewares du serveur
config()
app.use(helmet())
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cors())
app.use(morgan('common'))

// Definition de l'emplacement des assets
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// Stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    req.body.avatar = file.avatar
    cb(null, file.originalname)
  },
})

// uplaod avec multer
const upload = multer({ storage })

//les routes avec upload
app.post('/auth/register', upload.single('avatar'), register)
app.put('/user/:id', upload.single('avatar'), updateUser)

//Les routes
app.post('/auth/login', login)
app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}...`)
})

try {
  await db.authenticate()
  console.log('Connection Réussie... ')
} catch (e) {
  db.close()
  console.log('error : ' + e.message)
}
