import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('trending');

  const categories = [
    { id: 'trending', name: 'Trending', icon: '🔥' },
    { id: 'politics', name: 'Politics', icon: '🏛️' },
    { id: 'crypto', name: 'Crypto', icon: '₿' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'economy', name: 'Economy', icon: '📈' }
  ];

  const mockMarkets = [
    {
      id: 1,
      question: 'Will Bitcoin reach $100,000 by end of 2024?',
      category: 'crypto',
      volume: '$2,450,000',
      yesPrice: 0.65,
      noPrice: 0.35,
      endDate: 'Dec 31, 2024',
      participants: 1247
    },
    {
      id: 2,
      question: 'Will the US have a recession in 2024?',
      category: 'economy',
      volume: '$1,890,000',
      yesPrice: 0.42,
      noPrice: 0.58,
      endDate: 'Dec 31, 2024',
      participants: 892
    },
    {
      id: 3,
      question: 'Will AI replace 50% of jobs by 2030?',
      category: 'tech',
      volume: '$1,200,000',
      yesPrice: 0.28,
      noPrice: 0.72,
      endDate: 'Dec 31, 2030',
      participants: 654
    },
    {
      id: 4,
      question: 'Will the next US President be under 60?',
      category: 'politics',
      volume: '$3,100,000',
      yesPrice: 0.55,
      noPrice: 0.45,
      endDate: 'Nov 5, 2024',
      participants: 2103
    },
    {
      id: 5,
      question: 'Will Messi win Ballon d\'Or 2024?',
      category: 'sports',
      volume: '$890,000',
      yesPrice: 0.38,
      noPrice: 0.62,
      endDate: 'Dec 31, 2024',
      participants: 445
    },
    {
      id: 6,
      question: 'Will Tesla stock reach $300 by 2025?',
      category: 'crypto',
      volume: '$1,650,000',
      yesPrice: 0.72,
      noPrice: 0.28,
      endDate: 'Dec 31, 2025',
      participants: 789
    }
  ];

  const filteredMarkets = selectedCategory === 'trending' 
    ? mockMarkets 
    : mockMarkets.filter(market => market.category === selectedCategory);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Predict the Future with
            <span className="gradient-text"> PredaMark</span>
          </h1>
          <p className="hero-subtitle">
            Trade on the outcomes of real-world events with confidential predictions on Oasis Sapphire
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">$12.5M</div>
              <div className="stat-label">Total Volume</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">2,847</div>
              <div className="stat-label">Active Markets</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">15,432</div>
              <div className="stat-label">Traders</div>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="categories-header">
          <h2>Browse Markets</h2>
          <p>Explore prediction markets across different categories</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="markets-section">
        <div className="markets-header">
          <h2>
            {selectedCategory === 'trending' ? 'Trending Markets' : 
             categories.find(c => c.id === selectedCategory)?.name + ' Markets'}
          </h2>
          <Link to="/markets" className="view-all-link">
            View All →
          </Link>
        </div>
        <div className="markets-grid">
          {filteredMarkets.slice(0, 6).map(market => (
            <Link key={market.id} to={`/market/${market.id}`} className="market-card">
              <div className="market-header">
                <h3 className="market-question">{market.question}</h3>
                <div className="market-category">
                  {categories.find(c => c.id === market.category)?.icon}
                </div>
              </div>
              <div className="market-stats">
                <div className="market-stat">
                  <span className="stat-label">Volume</span>
                  <span className="stat-value">{market.volume}</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">Ends</span>
                  <span className="stat-value">{market.endDate}</span>
                </div>
                <div className="market-stat">
                  <span className="stat-label">Traders</span>
                  <span className="stat-value">{market.participants}</span>
                </div>
              </div>
              <div className="market-odds">
                <div className="odds-item">
                  <span className="odds-label">Yes</span>
                  <span className="odds-value yes">{market.yesPrice * 100}%</span>
                </div>
                <div className="odds-item">
                  <span className="odds-label">No</span>
                  <span className="odds-value no">{market.noPrice * 100}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="features-section">
        <div className="features-header">
          <h2>Why Choose PredaMark?</h2>
          <p>Built on Oasis Sapphire for confidential and secure predictions</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Confidential</h3>
            <p>Your predictions are encrypted and private using Oasis Sapphire's confidential computing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Secure</h3>
            <p>Built on Oasis Sapphire for instant settlements and maximum security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Markets</h3>
            <p>Trade on events from politics to sports, crypto to technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
