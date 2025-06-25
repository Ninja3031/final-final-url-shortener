# URL Shortener - Full Stack Application

A modern, full-stack URL shortener application built with React, Node.js, Express, and MongoDB. Create short, memorable links with custom slugs, track clicks, and manage your URLs with a beautiful dashboard.

## 🚀 Live Demo

- **Frontend**: Deploy on [Vercel](https://vercel.com/new)
- **Backend**: Deploy on [Render](https://render.com)

## ✨ Features

- 🔗 **URL Shortening**: Create short, memorable links instantly
- 👤 **User Authentication**: Secure registration and login system
- 🎯 **Custom Slugs**: Create personalized short URLs (authenticated users)
- 📊 **Click Tracking**: Monitor link performance with detailed analytics
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🌙 **Dark Theme**: Modern dark aesthetic with smooth animations
- ⚡ **Fast & Reliable**: Optimized for performance and scalability
- 🔒 **Secure**: JWT authentication with HTTP-only cookies

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **TanStack Router** for client-side routing
- **TanStack Query** for server state management
- **Redux Toolkit** for global state management
- **Tailwind CSS** for styling
- **Lucide React** for beautiful icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests
- **Cookie Parser** for cookie handling

## 📁 Project Structure

```
url-shortener-fullstack/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── dao/           # Data access objects
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── app.js             # Express app setup
│   ├── package.json
│   └── .env.example       # Environment variables template
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── routing/       # Router configuration
│   │   ├── store/         # Redux store
│   │   └── utils/         # Utility functions
│   ├── index.html
│   ├── package.json
│   ├── vercel.json        # Vercel deployment config
│   └── .env.example       # Environment variables template
├── render.yaml            # Render deployment config
├── package.json           # Root package.json
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortener-fullstack.git
   cd url-shortener-fullstack
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install individually
   npm run install:backend
   npm run install:frontend
   ```

3. **Set up environment variables**
   
   **Backend** (`backend/.env`):
   ```env
   MONGO_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your_super_secure_jwt_secret_here_make_it_long_and_random
   APP_URL=http://localhost:3000/
   NODE_ENV=development
   ```

   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend (runs on port 3000)
   npm run dev:backend
   
   # Terminal 2 - Frontend (runs on port 5173)
   npm run dev:frontend
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🌐 Deployment

### Backend Deployment (Render)

1. **Push your code to GitHub**
2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the branch to deploy
3. **Configure build settings**:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. **Set environment variables** in Render dashboard:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
   JWT_SECRET=your_super_secure_jwt_secret_here
   APP_URL=https://your-app-name.onrender.com/
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
5. **Deploy** - Render will automatically build and deploy

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**
2. **Import project in Vercel**
   - Connect your GitHub repository
   - Select the `frontend` folder as the root directory
3. **Configure build settings** (auto-detected):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Set environment variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
5. **Deploy** - Vercel will automatically build and deploy

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### URL Management
- `POST /api/create` - Create short URL
- `GET /:id` - Redirect to original URL
- `GET /api/user/urls` - Get user's URLs (authenticated)
- `DELETE /api/user/urls/:id` - Delete URL (authenticated)

### Health Check
- `GET /health` - Health check endpoint
- `GET /` - API info endpoint

## 🔧 Available Scripts

### Root Level
- `npm run install:all` - Install all dependencies
- `npm run dev:backend` - Start backend in development mode
- `npm run dev:frontend` - Start frontend in development mode

### Backend
- `npm run dev` - Start with nodemon (development)
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 UI Features

- **Modern Dark Theme**: Sleek dark design with blue accents
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Subtle animations and transitions
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Clear loading indicators for better UX
- **Form Validation**: Client-side and server-side validation
- **Copy to Clipboard**: One-click copying of short URLs

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Secure cookie storage
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Secure error messages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting
