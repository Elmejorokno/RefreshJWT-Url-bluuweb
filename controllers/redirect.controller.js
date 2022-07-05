import Url from '../models/Url.js'

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params

  try {
    const url = await Url.findOne({ shortUrl }).select('originUrl')

    if (!url) {
      const error = new Error(`The url isn't exists.`)
      error.status = 404
      throw error
    }

    return res.status(200).redirect(url.originUrl)
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}
