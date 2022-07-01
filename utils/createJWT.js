import jwt from 'jsonwebtoken'

/**
 * Create and sign a JWT with the id from the user.
 * @param {object} userId
 * @returns The JWT token with sign and expiration date in 15min.
 */
const createJWT = ({ userId }) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15min'
  })
}

export default createJWT
