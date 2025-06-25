import { getShortUrl } from "../dao/shortUrl.dao.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js"
import { NotFoundError } from "../utils/errorHandler.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body
    let shortUrl

    if (req.user) {
        shortUrl = await createShortUrlWithUser(url, req.user._id, slug)
    } else {
        shortUrl = await createShortUrlWithoutUser(url)
    }

    const fullShortUrl = `${process.env.APP_URL}${shortUrl}`
    
    res.status(201).json({ 
        success: true,
        message: "Short URL created successfully",
        shortUrl: fullShortUrl,
        slug: shortUrl
    })
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    
    if (!url) {
        throw new NotFoundError("Short URL not found")
    }
    
    res.redirect(url.full_url)
})
