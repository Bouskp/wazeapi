import jwt from 'jsonwebtoken'
import { getTokenString } from '../utils/getToken.js'

function verifyToken(req, res, next) {
  const { authorization } = req.headers
  const token = getTokenString(authorization)
  if (!token) {
    res.status(203).json({ message: 'Invalid authorization' })
  } else {
    jwt.verify(token, process.env.PRIVATE, function (err, decoded) {
      if (err) res.status(403).json({ message: 'token invalid' + err })
      if (decoded) {
        req.user = decoded
        return next()
      }
    })
  }
}

export default verifyToken
