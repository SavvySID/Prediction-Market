import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';
import './PriceChart.css';

const PriceChart = ({ data, currentPrice, priceChange }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('ALL');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const timeframes = [
    { id: '1H', label: '1H' },
    { id: '6H', label: '6H' },
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: 'ALL', label: 'ALL' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="price-chart">
      <div className="chart-header">
        <div className="chart-info">
          <div className="volume-info">
            <span className="volume-label">Vol</span>
            <span className="volume-value">$1,200,056</span>
          </div>
          <div className="end-date">Dec 31, 2025</div>
        </div>
        <div className="chart-actions">
          <button className="chart-action-btn">×</button>
          <button className="chart-action-btn">📄</button>
          <button className="chart-action-btn">🎯</button>
          <button className="chart-action-btn">🔗</button>
          <button className="chart-action-btn">🔖</button>
        </div>
      </div>

      <div className="chart-stats">
        <div className="price-info">
          <span className="current-price">{currentPrice}%</span>
          <span className="price-label">Chance</span>
          <div className="price-change">
            <span className={`change-indicator ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              {priceChange >= 0 ? '▲' : '▼'}
            </span>
            <span className={`change-value ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              {Math.abs(priceChange)}%
            </span>
          </div>
        </div>
        <div className="timeframe-selector">
          {timeframes.map(timeframe => (
            <button
              key={timeframe.id}
              className={`timeframe-btn ${selectedTimeframe === timeframe.id ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(timeframe.id)}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={['dataMin - 2', 'dataMax + 2']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
