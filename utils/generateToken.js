import jwt from 'jsonwebtoken'

function generateToken(data) {
  return jwt.sign(data, process.env.PRIVATE, { expiresIn: '15min' })
}

export default generateToken
