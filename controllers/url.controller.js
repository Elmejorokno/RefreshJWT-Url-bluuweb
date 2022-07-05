import { matchedData } from 'express-validator'
import Url from '../models/Url.js'
import { genShortUrl } from '../utils/genShortUrl.js'

export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find({ createdBy: req.userId }).sort({
      createdAt: -1 //descending order
    })

    return res.status(200).json({ urls })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: { msg: error.message } })
  }
}

export const getSingleUrl = async (req, res) => {
  const { urlId } = req.params
  try {
    const url = await Url.findOne({ _id: urlId, createdBy: req.userId })

    if (!url) {
      const error = new Error(`The url isn't exists.`)
      error.status = 404
      throw error
    }
    return res.status(200).json({ url })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}

export const createUrl = async (req, res) => {
  const { originUrl } = req.body

  try {
    const shortUrl = await genShortUrl(5)
    const url = await Url.create({
      originUrl,
      createdBy: req.userId,
      shortUrl
    })

    return res.status(201).json({ url })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: { msg: error.message } })
  }
}

export const updateUrl = async (req, res) => {
  const { urlId } = req.params
  const { originUrl } = matchedData(req)
  try {
    const url = await Url.findOneAndUpdate(
      { _id: urlId, createdBy: req.userId },
      { originUrl },
      { new: true, runValidators: true }
    )

    if (!url) {
      const error = new Error(`The url isn't exists.`)
      error.status = 404
      throw error
    }

    return res.status(200).json({ url })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}

export const deleteUrl = async (req, res) => {
  const { urlId } = req.params

  console.log(urlId)

  try {
    const url = await Url.findOneAndDelete({
      _id: urlId,
      createdBy: req.userId
    })

    if (!url) {
      const error = new Error(`The url isn't exists.`)
      error.status = 404
      throw error
    }

    return res.status(200).json({ url })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}
