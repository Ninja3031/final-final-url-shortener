import ShortUrl from "../models/shortUrl.model.js"
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new ShortUrl({
            full_url: longUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId
        }
        return await newUrl.save()
    } catch (error) {
        if (error.code == 11000) {
            throw new ConflictError("Short URL already exists")
        }
        throw error
    }
};

export const getShortUrl = async (shortUrl) => {
    return await ShortUrl.findOneAndUpdate(
        { short_url: shortUrl }, 
        { $inc: { clicks: 1 } },
        { new: true }
    );
}

export const getCustomShortUrl = async (slug) => {
    return await ShortUrl.findOne({ short_url: slug });
}

export const getUserUrls = async (userId) => {
    return await ShortUrl.find({ user: userId }).sort({ createdAt: -1 });
}

export const deleteShortUrl = async (id, userId) => {
    return await ShortUrl.findOneAndDelete({ _id: id, user: userId });
}
