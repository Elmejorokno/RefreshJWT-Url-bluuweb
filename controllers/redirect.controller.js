import Url from '../models/Url.js'

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params
  console.log(shortUrl)
  try {
    const originUrl = await Url.findOne({ shortUrl }).select('originUrl')
    console.log(originUrl)
    if (!originUrl) {
      const error = new Error(`The url isn't exists.`)
      error.status = 404
      throw error
    }

    return res.status(200).redirect(originUrl.originUrl)
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}
