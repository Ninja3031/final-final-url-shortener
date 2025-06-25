import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.dao.js"
import { ValidationError, ConflictError } from "../utils/errorHandler.js"

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export const createShortUrlWithoutUser = async (url) => {
    // Validation
    if (!url) {
        throw new ValidationError('URL is required');
    }

    if (!isValidUrl(url)) {
        throw new ValidationError('Please provide a valid URL');
    }

    const shortUrl = generateNanoId(7)
    if (!shortUrl) throw new Error("Short URL not generated")
    
    await saveShortUrl(shortUrl, url)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    // Validation
    if (!url) {
        throw new ValidationError('URL is required');
    }

    if (!isValidUrl(url)) {
        throw new ValidationError('Please provide a valid URL');
    }

    let shortUrl = slug;
    
    if (slug) {
        // Validate custom slug
        if (slug.length < 3) {
            throw new ValidationError('Custom slug must be at least 3 characters long');
        }
        
        if (!/^[a-zA-Z0-9-_]+$/.test(slug)) {
            throw new ValidationError('Custom slug can only contain letters, numbers, hyphens, and underscores');
        }
        
        // Check if custom slug already exists
        const exists = await getCustomShortUrl(slug)
        if (exists) {
            throw new ConflictError("This custom URL already exists")
        }
    } else {
        shortUrl = generateNanoId(7)
    }
    
    await saveShortUrl(shortUrl, url, userId)
    return shortUrl
}
