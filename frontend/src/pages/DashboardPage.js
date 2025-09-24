import React, { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockData = {
    user: {
      address: '0x51eaD...48D35',
      totalValue: '$12,099.43',
      totalBets: 47,
      winRate: '68%',
      totalWinnings: '$3,450.20'
    },
    positions: [
      {
        id: 1,
        market: 'Will Bitcoin reach $100k by 2025?',
        outcome: 'Yes',
        shares: 150,
        avgPrice: '0.65',
        currentPrice: '0.72',
        value: '$108.00',
        pnl: '+$10.50',
        pnlPercent: '+10.8%'
      },
      {
        id: 2,
        market: 'Will Ethereum 2.0 launch in Q1?',
        outcome: 'No',
        shares: 200,
        avgPrice: '0.45',
        currentPrice: '0.38',
        value: '$76.00',
        pnl: '+$14.00',
        pnlPercent: '+22.6%'
      },
      {
        id: 3,
        market: 'Will AI replace developers by 2025?',
        outcome: 'Yes',
        shares: 100,
        avgPrice: '0.25',
        currentPrice: '0.18',
        value: '$18.00',
        pnl: '-$7.00',
        pnlPercent: '-28.0%'
      }
    ],
    recentBets: [
      {
        id: 1,
        market: 'Bitcoin $100k prediction',
        outcome: 'Yes',
        amount: '50 ROSE',
        price: '0.65',
        timestamp: '2 hours ago',
        status: 'Confirmed'
      },
      {
        id: 2,
        market: 'Ethereum 2.0 launch',
        outcome: 'No',
        amount: '30 ROSE',
        price: '0.45',
        timestamp: '1 day ago',
        status: 'Confirmed'
      }
    ],
    achievements: [
      { name: 'First Win', description: 'Won your first bet', earned: true },
      { name: 'High Roller', description: 'Bet over 100 ROSE', earned: true },
      { name: 'Streak Master', description: '5 wins in a row', earned: false },
      { name: 'Diversified', description: 'Bet on 10+ markets', earned: true }
    ]
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="wallet-info">
          <div className="wallet-address">{mockData.user.address}</div>
          <div className="wallet-balance">{mockData.user.totalValue}</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-label">Total Value</div>
            <div className="stat-value">{mockData.user.totalValue}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Total Bets</div>
            <div className="stat-value">{mockData.user.totalBets}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{mockData.user.winRate}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-label">Total Winnings</div>
            <div className="stat-value">{mockData.user.totalWinnings}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'positions' ? 'active' : ''}`}
          onClick={() => setActiveTab('positions')}
        >
          Positions
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button 
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="chart-section">
              <h3>Portfolio Performance</h3>
              <div className="mock-chart">
                <div className="chart-placeholder">
                  📊 Portfolio chart would go here
                </div>
              </div>
            </div>
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {mockData.recentBets.map(bet => (
                  <div key={bet.id} className="activity-item">
                    <div className="activity-info">
                      <div className="activity-market">{bet.market}</div>
                      <div className="activity-details">
                        {bet.outcome} • {bet.amount} • {bet.timestamp}
                      </div>
                    </div>
                    <div className="activity-status">{bet.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'positions' && (
          <div className="positions-content">
            <div className="positions-header">
              <h3>Active Positions</h3>
              <div className="positions-summary">
                Total Value: {mockData.user.totalValue}
              </div>
            </div>
            <div className="positions-list">
              {mockData.positions.map(position => (
                <div key={position.id} className="position-card">
                  <div className="position-header">
                    <div className="position-market">{position.market}</div>
                    <div className={`position-outcome ${position.outcome.toLowerCase()}`}>
                      {position.outcome}
                    </div>
                  </div>
                  <div className="position-details">
                    <div className="position-row">
                      <span>Shares:</span>
                      <span>{position.shares}</span>
                    </div>
                    <div className="position-row">
                      <span>Avg Price:</span>
                      <span>{position.avgPrice}</span>
                    </div>
                    <div className="position-row">
                      <span>Current Price:</span>
                      <span>{position.currentPrice}</span>
                    </div>
                    <div className="position-row">
                      <span>Value:</span>
                      <span>{position.value}</span>
                    </div>
                    <div className="position-row">
                      <span>P&L:</span>
                      <span className={`pnl ${position.pnl.startsWith('+') ? 'positive' : 'negative'}`}>
                        {position.pnl} ({position.pnlPercent})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-content">
            <h3>Betting History</h3>
            <div className="history-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Wins</button>
              <button className="filter-btn">Losses</button>
              <button className="filter-btn">Pending</button>
            </div>
            <div className="history-list">
              {mockData.recentBets.map(bet => (
                <div key={bet.id} className="history-item">
                  <div className="history-info">
                    <div className="history-market">{bet.market}</div>
                    <div className="history-details">
                      {bet.outcome} • {bet.amount} at {bet.price}
                    </div>
                    <div className="history-time">{bet.timestamp}</div>
                  </div>
                  <div className="history-status">{bet.status}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <h3>Achievements</h3>
            <div className="achievements-grid">
              {mockData.achievements.map((achievement, index) => (
                <div key={index} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                  <div className="achievement-icon">
                    {achievement.earned ? '🏆' : '🔒'}
                  </div>
                  <div className="achievement-info">
                    <div className="achievement-name">{achievement.name}</div>
                    <div className="achievement-description">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
