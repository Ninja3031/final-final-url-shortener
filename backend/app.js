import express from 'express'
import dotenv from "dotenv"
import connectDB from './src/config/mongo.config.js';
import shortUrl from './src/routes/shortUrl.route.js';
import auth_routes from './src/routes/auth.route.js';
import user_routes from './src/routes/user.route.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors'
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    dotenv.config("./.env")
}

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // local development frontend
    'https://url-sigma-rosy.vercel.app' // your deployed frontend
];

// Add any additional origins from environment variable
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // 👈 this allows cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(attachUser)

// Health check endpoint for Render
app.get('/health', (_req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (_req, res) => {
    res.status(200).json({ 
        message: 'URL Shortener API is running',
        version: '1.0.0'
    });
});

app.use("/api/user" , user_routes)

app.use("/api/auth" , auth_routes)

app.use("/api/create" , shortUrl)

app.get("/:id" , redirectFromShortUrl)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
})
