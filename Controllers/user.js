import { UserModele } from '../db/User.js'
import bcrypt from 'bcrypt'

const getUserById = async (req, res) => {
  const { userId } = req.params
  console.log(userId)
  const user = await UserModele.findByPk(userId)
  return user
    ? res.status(200).json({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        avatar: user.avatar,
        telephone: user.telephone,
        codeClient: user.codeClient,
        siteWeb: user.siteWeb,
        role: user.role,
      })
    : res.status(404).json({ msg: 'utilisateur introuvable' })
}

const getUserByCodeClient = async (req, res) => {
  const { codeClient } = req.params
  const user = await UserModele.findOne({ where: { codeClient: codeClient } })
  user
    ? res.status(200).json({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        avatar: user.avatar,
        telephone: user.telephone,
        codeClient: user.codeClient,
        siteWeb: user.siteWeb,
      })
    : res.status(404).json({ msg: 'utilisateur introuvable' })
}

const updateUser = async (req, res) => {
  const { userId } = req.params
  const {
    nom: newNom,
    prenom: newPrenom,
    email: newEmail,
    pays: newPays,
    ville: newville,
    siteWeb: newSiteWeb,
    avatar: newAvatar,
    telephone: newTelephone,
    password: newPassword,
  } = req.body
  const user = await UserModele.findOne({ where: { id: userId } })
  if (!user) {
    res.status(404).json({ msg: 'user introuvable' })
  } else {
    user.nom = newNom
    user.pays = newPays
    user.ville = newville
    user.siteWeb = newSiteWeb
    user.avatar = newAvatar
    user.telephone = newTelephone
    user.email = newEmail
    const newHash = await bcrypt.hash(newPassword, 2)
    user.password = newHash
    user.prenom = newPrenom
    user.save()
    return res.status(205).json({ user: user })
  }
}

export { getUserById, getUserByCodeClient, updateUser }
