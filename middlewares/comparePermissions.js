import { permissions } from '../utils/roles.js'

export default function comparePermissions(permission) {
  console.log(permission)
  // la function savoir si l'utilisateur peut effectuer cette action
  return (req, res, next) => {
    // les roles de l'utilisateur
    const { role } = req.user

    // tableau des permissions
    console.log([...role.map((r) => permissions[r])])

    //parcourir le tableau des roles et ajouter les permissions au
    //tableau des permissions

    next()
  }
}
