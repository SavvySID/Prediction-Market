# 🎯 PredaMark Frontend

A modern React application for the PredaMark prediction market platform, featuring real-time trading, interactive charts, and Oasis Sapphire integration.

## 🚀 Features

### **Core Functionality**
- **Real-time Trading**: Live price updates and market dynamics
- **Interactive Charts**: Beautiful price charts with Recharts
- **Wallet Integration**: MetaMask with Oasis Sapphire testnet
- **Responsive Design**: Works on desktop and mobile
- **State Management**: React Context for global state
- **Routing**: React Router for navigation

### **Pages & Components**
- **HomePage**: Market browsing and category selection
- **PredictionPage**: Individual market trading interface
- **DashboardPage**: User portfolio and betting history
- **LeaderboardPage**: Top trader rankings
- **AboutPage**: Platform information
- **Layout**: Header, navigation, and wallet connection

## 🛠️ Technology Stack

- **React 18.2.0**: Modern React with hooks
- **React Router 6**: Client-side routing
- **Ethers.js**: Ethereum interaction
- **Recharts**: Interactive charting
- **Oasis Sapphire**: Confidential computing integration
- **CSS3**: Modern styling with gradients

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🎮 Demo Data

The application includes comprehensive demo data:

### **Markets**
- 8 different prediction markets
- Categories: Politics, Crypto, Sports, Tech, Economy
- Real-time price updates every 10 seconds
- Interactive charts with historical data

### **User Features**
- Mock wallet connection
- Betting simulation
- Portfolio tracking
- Achievement system
- Leaderboard rankings

## 🔧 Configuration

### **Environment Variables**
```bash
# .env.local
REACT_APP_CONTRACT_ADDRESS=0x...
REACT_APP_RPC_URL=https://testnet.sapphire.oasis.dev
REACT_APP_CHAIN_ID=23295
```

### **MetaMask Setup**
The app automatically configures MetaMask for Oasis Sapphire testnet:
- Network Name: Sapphire Testnet
- RPC URL: https://testnet.sapphire.oasis.dev
- Chain ID: 23295
- Currency Symbol: TEST

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.js        # Main layout component
│   ├── Layout.css       # Layout styles
│   ├── PriceChart.js    # Interactive price chart
│   └── PriceChart.css   # Chart styles
├── pages/               # Page components
│   ├── HomePage.js      # Home page with market browsing
│   ├── HomePage.css     # Home page styles
│   ├── PredictionPage.js # Individual market page
│   ├── PredictionPage.css # Market page styles
│   ├── DashboardPage.js  # User dashboard
│   ├── DashboardPage.css # Dashboard styles
│   ├── LeaderboardPage.js # Leaderboard
│   ├── LeaderboardPage.css # Leaderboard styles
│   ├── AboutPage.js     # About page
│   └── AboutPage.css    # About page styles
├── context/             # React context
│   └── DemoContext.js   # Global state management
├── data/                # Demo data
│   └── demoData.js      # Mock data for demo
├── App.js               # Main application component
├── App.css              # Global styles
└── index.js             # Application entry point
```

## 🎨 Styling

### **Design System**
- **Color Scheme**: Oasis blue theme with gradients
- **Typography**: Modern, clean fonts
- **Layout**: Responsive grid system
- **Components**: Consistent button and card styles
- **Animations**: Smooth transitions and hover effects

### **CSS Architecture**
- **Component-scoped styles**: Each component has its own CSS file
- **Global styles**: App.css for common styles
- **Responsive design**: Mobile-first approach
- **CSS Variables**: Consistent color and spacing

## 🔌 API Integration

### **Wallet Connection**
```javascript
// Connect to MetaMask
const connectWallet = async () => {
  const accounts = await window.ethereum.request({ 
    method: 'eth_requestAccounts' 
  });
  // Handle connection
};
```

### **Contract Interaction**
```javascript
// Place a bet
const placeBet = async (marketId, outcome, amount) => {
  const contract = new ethers.Contract(address, abi, signer);
  const tx = await contract.placeBet(outcome, { value: amount });
  await tx.wait();
};
```

## 📊 State Management

### **DemoContext**
Global state management using React Context:

```javascript
const {
  markets,           // Available markets
  user,             // User profile
  walletConnected,  // Wallet status
  placeBet,         // Betting function
  getMarketById,    // Market lookup
  // ... more state and functions
} = useDemo();
```

### **State Updates**
- Real-time price updates every 10 seconds
- Bet placement updates market prices
- Wallet connection status
- Notification system

## 🎯 Key Features

### **Real-time Updates**
- Prices update automatically
- Market volume changes
- User portfolio updates
- Notification system

### **Interactive Charts**
- Hover effects on data points
- Timeframe selection
- Price change indicators
- Responsive design

### **Wallet Integration**
- MetaMask connection
- Network switching
- Transaction handling
- Error management

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### **Development**
```bash
npm start
# Opens http://localhost:3000
```

### **Production Build**
```bash
npm run build
# Creates optimized build in build/
```

### **Deploy to Netlify**
```bash
# Build and deploy
npm run build
# Upload build/ folder to Netlify
```

## 🔧 Customization

### **Adding New Markets**
1. Update `demoData.js` with new market data
2. Add chart data for the new market
3. Update category counts if needed

### **Styling Changes**
1. Modify component CSS files
2. Update global styles in `App.css`
3. Adjust color scheme in CSS variables

### **New Features**
1. Create new components in `components/`
2. Add new pages in `pages/`
3. Update routing in `App.js`
4. Extend context in `DemoContext.js`

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch Optimized**: Mobile-friendly interactions
- **Performance**: Optimized for mobile devices
- **PWA Ready**: Can be converted to Progressive Web App

## 🔒 Security

- **Wallet Security**: MetaMask integration
- **Network Validation**: Oasis Sapphire testnet
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Graceful error management

## 🎉 Demo Guide

1. **Start the app**: `npm start`
2. **Connect wallet**: Click "Connect Wallet"
3. **Browse markets**: Explore different categories
4. **Place bets**: Try the betting functionality
5. **Check dashboard**: View your portfolio
6. **Compare rankings**: See the leaderboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for PredaMark**