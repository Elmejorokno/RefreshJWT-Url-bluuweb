import jwt from 'jsonwebtoken'

const createJWT = ({ userId }) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15min'
  })
}

export default createJWT
