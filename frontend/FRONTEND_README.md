# PredaMark Frontend

A modern, responsive prediction market platform built with React and styled with Oasis blue theme.

## 🎨 Design Features

- **Oasis Blue Theme**: Beautiful blue gradient colors inspired by Oasis network
- **Modern UI**: Clean, professional design similar to Polymarket
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with dark backgrounds and blue accents

## 📱 Pages

### 1. Home Page (`/`)
- Hero section with platform statistics
- Category browsing (Politics, Crypto, Sports, Tech, etc.)
- Featured markets grid
- Platform features showcase

### 2. Prediction Page (`/market/:id`)
- Market question and description
- Interactive price chart
- Yes/No betting interface
- Real-time odds display
- Bet placement form

### 3. Dashboard Page (`/dashboard`)
- User portfolio overview
- Active positions tracking
- Betting history
- Achievements system
- Performance statistics

### 4. Leaderboard Page (`/leaderboard`)
- Top traders ranking
- Performance metrics
- Market statistics
- Category breakdowns

### 5. About Page (`/about`)
- Platform information
- Technology stack
- How it works guide
- Mission statement

## 🛠️ Technology Stack

- **React 19.1.0** - Latest React with hooks
- **React Router** - Client-side routing
- **CSS3** - Modern styling with gradients and animations
- **Oasis Sapphire** - Blockchain integration
- **Ethers.js** - Ethereum library for wallet connectivity

## 🎯 Key Features

### Navigation
- Sticky header with logo and navigation
- Search functionality
- Wallet connection status
- Responsive mobile menu

### Wallet Integration
- MetaMask connection
- Oasis Sapphire network support
- Balance display
- Transaction handling

### Market Interface
- Real-time price updates
- Interactive charts
- Bet placement forms
- Outcome selection (Yes/No)

### User Experience
- Smooth animations and transitions
- Loading states
- Error handling
- Responsive design

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## 📁 File Structure

```
src/
├── components/
│   ├── Layout.js          # Main layout component
│   └── Layout.css         # Layout styles
├── pages/
│   ├── HomePage.js        # Home page
│   ├── HomePage.css       # Home page styles
│   ├── PredictionPage.js  # Market prediction page
│   ├── PredictionPage.css # Prediction page styles
│   ├── DashboardPage.js   # User dashboard
│   ├── DashboardPage.css  # Dashboard styles
│   ├── LeaderboardPage.js # Leaderboard
│   ├── LeaderboardPage.css# Leaderboard styles
│   ├── AboutPage.js       # About page
│   └── AboutPage.css      # About page styles
├── App.js                 # Main app component
└── App.css               # Global styles
```

## 🎨 Color Scheme

- **Primary Blue**: `#3b82f6` (Oasis blue)
- **Secondary Blue**: `#60a5fa` (Light blue)
- **Dark Blue**: `#1d4ed8` (Dark blue)
- **Background**: `#0a0a0a` to `#16213e` (Dark gradient)
- **Cards**: `rgba(31, 41, 55, 0.6)` (Semi-transparent dark)
- **Text**: `#ffffff` (White) and `#9ca3af` (Gray)

## 📱 Responsive Design

- **Desktop**: Full grid layouts and sidebars
- **Tablet**: Adjusted grid columns and spacing
- **Mobile**: Single column layouts and stacked elements

## 🔗 Integration

- **Oasis Sapphire**: Network configuration and wallet connection
- **MetaMask**: Wallet provider integration
- **Smart Contracts**: Betting and market interaction
- **Confidential Computing**: Privacy-preserving transactions

## 🚀 Deployment

The frontend is ready for deployment to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build folder

## 📈 Performance

- **Fast Loading**: Optimized React components
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Images**: Optimized for different screen sizes
- **Efficient Routing**: Client-side navigation

## 🔒 Security

- **Wallet Security**: MetaMask integration
- **Network Validation**: Oasis Sapphire network checks
- **Input Validation**: Form validation and sanitization
- **HTTPS Ready**: Secure connection support

---

Built with ❤️ for the Oasis ecosystem
