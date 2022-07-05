import { customAlphabet } from 'nanoid/async'

export const genShortUrl = async (size) => {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(alphabet, size)
  return await nanoid()
}
