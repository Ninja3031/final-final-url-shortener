# URL Shortener Frontend

Modern React frontend for the URL Shortener application with Tailwind CSS and TanStack Router.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🌐 Vercel Deployment

### Step 1: Prepare Repository
1. Push code to GitHub
2. Ensure `vercel.json` is in the frontend directory

### Step 2: Deploy on Vercel
1. Import project from GitHub
2. Set root directory to `frontend`
3. Framework will be auto-detected as Vite
4. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
5. Deploy

### Vercel Configuration
The `vercel.json` file handles:
- SPA routing (redirects to index.html)
- Asset caching
- Build optimization

## 🎨 UI Features

### Design System
- **Dark Theme**: Modern dark aesthetic
- **Blue Accent**: Primary color scheme
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions

### Components
- **Navbar**: Navigation with auth state
- **Forms**: Styled input components
- **Cards**: Content containers
- **Buttons**: Multiple variants
- **Toasts**: Notification system

### Pages
- **Home**: URL shortening interface
- **Login**: User authentication
- **Register**: User registration
- **Dashboard**: URL management

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   └── Navbar.jsx
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── DashboardPage.jsx
│   ├── routing/        # Router configuration
│   │   └── routeTree.js
│   ├── store/          # Redux store
│   │   ├── store.js
│   │   └── slices/
│   │       └── authSlice.js
│   ├── utils/          # Utility functions
│   │   └── axiosInstance.js
│   ├── index.css       # Global styles
│   ├── main.jsx        # App entry point
│   └── RootLayout.jsx  # Root layout component
├── public/             # Static assets
├── index.html          # HTML template
├── package.json
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── vercel.json         # Vercel deployment config
└── .env.example        # Environment variables template
```

## 🛠️ Technologies

### Core
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### Routing & State
- **TanStack Router** - Client-side routing
- **Redux Toolkit** - Global state management
- **TanStack Query** - Server state management

### UI & UX
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Tailwind Animations** - Smooth transitions

### HTTP & Auth
- **Axios** - HTTP client
- **Cookie-based Auth** - Secure authentication

## 🎯 Features

### Authentication
- User registration and login
- Persistent authentication state
- Automatic token refresh
- Secure logout

### URL Management
- Create short URLs
- Custom slugs for authenticated users
- Copy to clipboard functionality
- Click tracking and analytics

### User Experience
- Responsive design
- Loading states
- Error handling
- Toast notifications
- Form validation

## 🔧 Configuration

### Vite Configuration
- React plugin
- Development server settings
- Build optimization

### Tailwind Configuration
- Custom color palette
- Animation utilities
- Component classes
- Responsive breakpoints

### Router Configuration
- Route definitions
- Layout components
- Context providers
- Navigation guards

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Touch-friendly buttons
- Optimized forms
- Collapsible navigation
- Swipe gestures ready

## 🎨 Styling Guide

### Color Palette
```css
/* Primary Colors */
primary-50: #eff6ff
primary-500: #3b82f6
primary-600: #2563eb
primary-700: #1d4ed8

/* Gray Scale */
gray-50: #f9fafb
gray-800: #1f2937
gray-900: #111827
```

### Component Classes
```css
.btn - Base button styles
.btn-primary - Primary button
.btn-secondary - Secondary button
.input - Input field styles
.card - Card container
```

### Animations
- Fade in effects
- Slide up transitions
- Hover states
- Loading spinners

## 🔒 Security

### Authentication
- HTTP-only cookies
- Automatic logout on 401
- Secure token handling
- CSRF protection ready

### Data Validation
- Client-side validation
- Server-side validation
- Input sanitization
- XSS protection

## 📊 Performance

### Optimization
- Code splitting
- Lazy loading ready
- Asset optimization
- Bundle analysis

### Caching
- Static asset caching
- API response caching
- Browser caching headers
- Service worker ready

## 🧪 Testing

Recommended testing setup:
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com` |

## 🚀 Deployment Checklist

- [ ] Set `VITE_API_URL` environment variable
- [ ] Verify `vercel.json` configuration
- [ ] Test build locally with `npm run build`
- [ ] Ensure all routes work with SPA routing
- [ ] Test on mobile devices
- [ ] Verify CORS settings with backend
