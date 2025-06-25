# 🚀 Deployment Guide

Complete guide to deploy your URL Shortener application on Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub account
- Render account (free)
- Vercel account (free)
- MongoDB Atlas account (free)

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### Step 2: Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select a cloud provider and region
4. Name your cluster (e.g., "url-shortener")
5. Click "Create Cluster"

### Step 3: Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `url-shortener`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/url-shortener`

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Ensure your repository has the `render.yaml` file in the root

### Step 2: Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your repository
5. Configure the service:
   - **Name**: `url-shortener-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

### Step 3: Set Environment Variables
In the Render dashboard, go to "Environment" and add:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/url-shortener
JWT_SECRET=your_super_secure_jwt_secret_make_it_long_and_random_at_least_32_characters
APP_URL=https://your-service-name.onrender.com/
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important Notes:**
- Replace `MONGO_URI` with your actual MongoDB Atlas connection string
- Generate a strong `JWT_SECRET` (use a password generator)
- `APP_URL` will be provided by Render after deployment
- `FRONTEND_URL` will be your Vercel URL (set this after frontend deployment)

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (5-10 minutes)
4. Note your backend URL: `https://your-service-name.onrender.com`

### Step 5: Test Backend
Visit these URLs to verify deployment:
- `https://your-service-name.onrender.com/health` - Should return health status
- `https://your-service-name.onrender.com/` - Should return API info

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Repository
Ensure your frontend code is in the `frontend` directory with `vercel.json` file.

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Step 3: Set Environment Variables
In Vercel project settings, add:

```
VITE_API_URL=https://your-backend-service-name.onrender.com
```

Replace with your actual Render backend URL.

### Step 4: Deploy
1. Click "Deploy"
2. Vercel will build and deploy automatically
3. Wait for deployment to complete (2-5 minutes)
4. Note your frontend URL: `https://your-project-name.vercel.app`

### Step 5: Update Backend CORS
1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend service

## 🔧 Post-Deployment Configuration

### Update Environment Variables
1. **Backend (Render)**: Update `FRONTEND_URL` with your Vercel URL
2. **Frontend (Vercel)**: Ensure `VITE_API_URL` points to your Render URL

### Test Full Application
1. Visit your frontend URL
2. Test URL shortening (both authenticated and anonymous)
3. Test user registration and login
4. Test dashboard functionality
5. Verify redirects work correctly

## 🔍 Troubleshooting

### Common Backend Issues

**Database Connection Failed**
- Verify MongoDB Atlas connection string
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

**CORS Errors**
- Verify `FRONTEND_URL` environment variable
- Check CORS configuration in `app.js`
- Ensure both HTTP and HTTPS URLs are handled

**JWT Errors**
- Verify `JWT_SECRET` is set and secure
- Check cookie settings for production

### Common Frontend Issues

**API Calls Failing**
- Verify `VITE_API_URL` environment variable
- Check if backend is running and accessible
- Verify CORS configuration

**Routing Issues**
- Ensure `vercel.json` has correct rewrite rules
- Check if all routes are defined in router

**Build Failures**
- Check for TypeScript errors
- Verify all dependencies are installed
- Check build logs in Vercel dashboard

### Performance Optimization

**Backend (Render)**
- Enable compression middleware
- Add rate limiting
- Implement caching strategies
- Monitor with Render metrics

**Frontend (Vercel)**
- Optimize images and assets
- Enable Vercel Analytics
- Use Vercel Edge Functions if needed
- Monitor Core Web Vitals

## 📊 Monitoring & Maintenance

### Backend Monitoring
- Use Render's built-in metrics
- Set up log monitoring
- Monitor database performance in MongoDB Atlas
- Set up uptime monitoring

### Frontend Monitoring
- Use Vercel Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry recommended)
- Monitor user engagement

### Regular Maintenance
- Update dependencies regularly
- Monitor security vulnerabilities
- Backup database regularly
- Review and rotate JWT secrets

## 🔒 Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled (automatic on Render/Vercel)
- [ ] CORS properly configured
- [ ] Database access restricted
- [ ] Environment variables secured
- [ ] No sensitive data in client-side code
- [ ] Input validation implemented
- [ ] Rate limiting considered

## 🎉 Success!

Your URL Shortener application should now be fully deployed and accessible:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-service.onrender.com`
- **Database**: MongoDB Atlas cluster

Share your application with the world! 🌍
