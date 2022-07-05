import jwt from 'jsonwebtoken'

/**
 * Create and sign a refresh JWT with the id from the user.
 * @param {object} userId
 * @returns The JWT token with sign and expiration date in 15 days.
 */
const createRefreshJWT = function ({ userId }) {
  return jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: '15d'
  })
}

export default createRefreshJWT
