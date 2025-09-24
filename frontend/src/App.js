import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { wrapEthereumProvider, NETWORKS } from '@oasisprotocol/sapphire-paratime';
import './App.css';

function App() {
  const [bets, setBets] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [betAmount, setBetAmount] = useState('0.1');
  const [prediction, setPrediction] = useState(true);
  const [loading, setLoading] = useState(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Wrap provider for Sapphire compatibility
        const sapphireChainId = NETWORKS.testnet; 
        const wrappedProvider = wrapEthereumProvider(
          window.ethereum,
          sapphireChainId
        );

        // Check if correct network is selected
        if ((await wrappedProvider.getNetwork()).chainId !== sapphireChainId) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${sapphireChainId.toString(16)}` }],
          });
        }

        const provider = new ethers.BrowserProvider(wrappedProvider);
        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  // Place bet through OPL
  const placeBet = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(
        wrapEthereumProvider(window.ethereum, NETWORKS.testnet)
      );
      const signer = await provider.getSigner();
      
      const contract = new ethers.Contract(
        '0x42dB46bD5EaF31e0E3DD2acd3324978EdD14965c',
        [
          {
              "inputs": [],
              "name": "nextUnresolvedBetId",
              "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {"internalType": "uint256", "name": "_betId", "type": "uint256"},
                  {"internalType": "bool", "name": "_actualOutcome", "type": "bool"}
              ],
              "name": "resolveBet",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
          }
        ],   //might change
        signer
      );

      const tx = await contract.placeBet(prediction, {
        value: ethers.parseEther(betAmount)
      });
      
      await tx.wait();
      alert('Confidential bet placed!');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
    setLoading(false);
  };

  // Load existing bets
  useEffect(() => {
    // For Future : Add contract interaction to fetch bets
    const sampleBets = [
      { id: 1, amount: '0.1 ROSE', prediction: 'Yes', outcome: 'Pending' },
      { id: 2, amount: '0.2 ROSE', prediction: 'No', outcome: 'Won' },
    ];
    setBets(sampleBets);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Oasis Confidential Predictions</h1>
        {walletAddress ? (
          <div className="wallet-info">
            <span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
        ) : (
          <button className="connect-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </header>

      <main>
        <div className="bet-form">
          <h2>Place New Bet</h2>
          <div className="form-group">
            <label>Amount (ROSE)</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0.1"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Prediction</label>
            <div className="toggle-group">
              <button
                className={prediction ? 'active' : ''}
                onClick={() => setPrediction(true)}
              >
                Yes
              </button>
              <button
                className={!prediction ? 'active' : ''}
                onClick={() => setPrediction(false)}
              >
                No
              </button>
            </div>
          </div>
          <button 
            className="place-bet-btn"
            onClick={placeBet}
            disabled={!walletAddress || loading}
          >
            {loading ? 'Processing...' : 'Place Confidential Bet'}
          </button>
        </div>

        <div className="bets-list">
          <h2>Active Bets</h2>
          {bets.map((bet) => (
            <div key={bet.id} className="bet-card">
              <div className="bet-info">
                <span>Amount: {bet.amount}</span>
                <span>Prediction: {bet.prediction}</span>
                <span>Status: {bet.outcome}</span>
              </div>
              {bet.outcome === 'Pending' && (
                <button className="resolve-btn">Resolve</button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;