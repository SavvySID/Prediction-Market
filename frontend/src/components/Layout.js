import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connectWalletSafely } from '../utils/wallet';
import './Layout.css';

const Layout = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const location = useLocation();

  const connectWallet = async () => {
    try {
      const address = await connectWalletSafely();
      setWalletAddress(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert(error.message || 'Failed to connect wallet');
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">P</div>
              <span className="logo-text">PredaMark</span>
            </div>
          </div>

          <nav className="main-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Markets
            </Link>
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/leaderboard" 
              className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
            >
              Leaderboard
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>

          <div className="header-actions">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search markets..." 
                className="search-input"
              />
            </div>
            
            {walletAddress ? (
              <div className="wallet-info">
                <span className="wallet-address">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <div className="wallet-balance">0.134 ROSE</div>
              </div>
            ) : (
              <button className="connect-btn" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
