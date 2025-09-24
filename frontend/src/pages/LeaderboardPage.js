import React, { useState } from 'react';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const [timeframe, setTimeframe] = useState('all');

  const mockLeaderboard = [
    {
      rank: 1,
      address: '0x1234...5678',
      totalValue: '$45,230.50',
      winRate: '78%',
      totalBets: 156,
      pnl: '+$12,450.20',
      avatar: '🏆'
    },
    {
      rank: 2,
      address: '0x2345...6789',
      totalValue: '$38,920.30',
      winRate: '72%',
      totalBets: 134,
      pnl: '+$9,230.10',
      avatar: '🥈'
    },
    {
      rank: 3,
      address: '0x3456...7890',
      totalValue: '$32,150.80',
      winRate: '69%',
      totalBets: 98,
      pnl: '+$7,890.50',
      avatar: '🥉'
    },
    {
      rank: 4,
      address: '0x4567...8901',
      totalValue: '$28,450.20',
      winRate: '65%',
      totalBets: 87,
      pnl: '+$5,230.40',
      avatar: '🎯'
    },
    {
      rank: 5,
      address: '0x5678...9012',
      totalValue: '$25,670.90',
      winRate: '71%',
      totalBets: 76,
      pnl: '+$4,120.30',
      avatar: '🚀'
    }
  ];

  const timeframes = [
    { id: 'all', name: 'All Time' },
    { id: 'month', name: 'This Month' },
    { id: 'week', name: 'This Week' },
    { id: 'day', name: 'Today' }
  ];

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Top performers on PredaMark</p>
      </div>

      <div className="timeframe-selector">
        {timeframes.map(tf => (
          <button
            key={tf.id}
            className={`timeframe-btn ${timeframe === tf.id ? 'active' : ''}`}
            onClick={() => setTimeframe(tf.id)}
          >
            {tf.name}
          </button>
        ))}
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="header-cell rank">Rank</div>
            <div className="header-cell trader">Trader</div>
            <div className="header-cell value">Total Value</div>
            <div className="header-cell winrate">Win Rate</div>
            <div className="header-cell bets">Total Bets</div>
            <div className="header-cell pnl">P&L</div>
          </div>
          
          {mockLeaderboard.map(trader => (
            <div key={trader.rank} className="table-row">
              <div className="cell rank">
                <span className="rank-number">{trader.rank}</span>
                {trader.rank <= 3 && <span className="rank-icon">{trader.avatar}</span>}
              </div>
              <div className="cell trader">
                <div className="trader-info">
                  <div className="trader-address">{trader.address}</div>
                </div>
              </div>
              <div className="cell value">
                <span className="value-amount">{trader.totalValue}</span>
              </div>
              <div className="cell winrate">
                <span className="winrate-percentage">{trader.winRate}</span>
              </div>
              <div className="cell bets">
                <span className="bets-count">{trader.totalBets}</span>
              </div>
              <div className="cell pnl">
                <span className="pnl-amount positive">{trader.pnl}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-stats">
          <div className="stats-card">
            <h3>Market Statistics</h3>
            <div className="stat-item">
              <span className="stat-label">Total Traders</span>
              <span className="stat-value">15,432</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active Markets</span>
              <span className="stat-value">2,847</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Volume</span>
              <span className="stat-value">$12.5M</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Win Rate</span>
              <span className="stat-value">52%</span>
            </div>
          </div>

          <div className="stats-card">
            <h3>Top Categories</h3>
            <div className="category-stats">
              <div className="category-item">
                <span className="category-name">Crypto</span>
                <span className="category-volume">$4.2M</span>
              </div>
              <div className="category-item">
                <span className="category-name">Politics</span>
                <span className="category-volume">$3.8M</span>
              </div>
              <div className="category-item">
                <span className="category-name">Sports</span>
                <span className="category-volume">$2.1M</span>
              </div>
              <div className="category-item">
                <span className="category-name">Tech</span>
                <span className="category-volume">$1.9M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
