import { getUserUrls, deleteShortUrl } from "../dao/shortUrl.dao.js"
import { NotFoundError } from "../utils/errorHandler.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const getUserShortUrls = wrapAsync(async (req, res) => {
    const urls = await getUserUrls(req.user._id)
    
    // Add full URL to each short URL
    const urlsWithFullPath = urls.map(url => ({
        ...url.toObject(),
        fullShortUrl: `${process.env.APP_URL}${url.short_url}`
    }))
    
    res.status(200).json({ 
        success: true,
        urls: urlsWithFullPath 
    })
})

export const deleteUserShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const deletedUrl = await deleteShortUrl(id, req.user._id)
    
    if (!deletedUrl) {
        throw new NotFoundError("URL not found or you don't have permission to delete it")
    }
    
    res.status(200).json({ 
        success: true,
        message: "URL deleted successfully" 
    })
})
