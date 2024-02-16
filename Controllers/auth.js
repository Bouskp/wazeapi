import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { UserModele } from '../db/index.js'
import generateToken from '../utils/generateToken.js'

const register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      ville,
      pays,
      siteWeb,
      telephone,
      avatar,
      role = ['participant'],
    } = req.body

    // si l'utilisateur existe déjà
    const findUser = await UserModele.findOne({
      where: {
        email: email,
      },
    })
    if (findUser) {
      return res.status(400).json({ message: "l'utilisateur existe déjà" })
    }
    // gestion password
    const hashpawword = await bcrypt.hash(password, 2)

    // gestion codeClient
    const codeClient = nanoid()

    // Gestion des roles
    const strRoles = role.join(',')

    const newUser = UserModele.build({
      nom,
      prenom,
      email,
      password: hashpawword,
      telephone,
      ville,
      pays,
      siteWeb,
      codeClient,
      role: strRoles,
      avatar,
    })
    const user = {
      nom,
      prenom,
      email,
      ville,
      pays,
      siteWeb,
      role: strRoles,
    }
    const result = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const findUser = await UserModele.findOne({ where: { email: email } })
    if (findUser === null) {
      return res.status(400).json({ message: 'utilisateur introuvable' })
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password)
      if (isMatch) {
        const token = generateToken({
          id: findUser.id,
          nom: findUser.nom,
          prenom: findUser.prenom,
          email: findUser.email,
          avatar: findUser.avatar,
          telephone: findUser.telephone,
          pays: findUser.pays,
          ville: findUser.ville,
          codeClient: findUser.codeClient,
          siteWeb: findUser.siteWeb,
          role: findUser.role,
        })
        return res.status(200).json({ token })
      } else {
        return res.status(400).json({ msg: 'mot de passe incorect' })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export { register, login }
