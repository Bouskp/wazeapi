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
import { register } from './Controllers/auth.js'
import { userRouter } from './routes/userRoutes.js'
import { updateUser } from './Controllers/user.js'
import { ticketRouter } from './routes/ticketRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import verifyToken from './middlewares/verifyToken.js'

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
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// Stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    const { originalname } = file
    const extension = originalname.slice(
      ((originalname.lastIndexOf('.') - 1) >>> 0) + 2
    )
    req.body.avatar = req.body.nom + '.' + extension
    cb(null, req.body.nom + '.' + extension)
  },
})

// uplaod avec multer
const upload = multer({ storage })

//les routes avec upload
app.post('/auth/register', upload.single('avatar'), register)
app.put('/user/:userId', upload.single('avatar'), updateUser)

//Les routes
app.use('/user', verifyToken, userRouter)
app.use('/ticket', verifyToken, ticketRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}...`)
})

try {
  await db.authenticate()
  console.log('Connection Réussie... ')
} catch (e) {
  console.log('error : ' + e.message)
  db.close()
}
