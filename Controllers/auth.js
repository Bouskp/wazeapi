import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { UserModele } from '../db/User.js'

const register = async (req, res) => {
  try {
    const { nom, prenom, email, password, telephone, ville, pays, siteWeb } =
      req.body
    // gestion password
    const hashpawword = await bcrypt.hash(password, 2)
    console.log(hashpawword.length)
    // gestion codeClient
    const codeClient = nanoid()

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
    })
    const result = await newUser.save()
    console.log(result)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json(err)
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
      return isMatch
        ? res.status(200).json({ user: findUser })
        : res.status(400).json({ message: 'mot de passe incorrect' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export { register, login }
