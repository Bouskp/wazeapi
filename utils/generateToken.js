import jwt from 'jsonwebtoken'

function generateToken(data) {
  return jwt.sign(data, process.env.PRIVATE, { expiresIn: '1d' })
}

export default generateToken
