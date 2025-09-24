## Prediction Market – Confidential Bets on EVM

This repository contains a full-stack prediction market prototype:
- **Smart contracts** in `contracts/` built with Hardhat
- **React frontend** in `frontend/` for placing and viewing bets
- **Oracle utility** in `oracle/` for resolving outcomes programmatically

The core contract `PredictionMarket.sol` uses Oasis Sapphire primitives to encrypt user predictions on-chain, keeping each bet’s direction confidential until resolution.

### Repository Structure
- `contracts/` – Solidity sources (see `PredictionMarket.sol`)
- `scripts/` – Deployment scripts (see `scripts/deploy.js`)
- `ignition/` – Optional Hardhat Ignition deployment module (sample `Lock.js`)
- `test/` – Hardhat tests (sample `Lock.js`)
- `frontend/` – React application
- `oracle/` – Example resolver script (`resolver.py`)

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+ (only if using the `oracle/` resolver)
- Git

### Global notes
- Commands below use `PowerShell` friendly syntax (works on Windows). On macOS/Linux, the commands are the same unless noted.

## Quick Start
1) Install dependencies at the root and in `frontend/`:
```bash
npm install
cd frontend && npm install && cd ..
```

2) Start a local Hardhat node in one terminal:
```bash
npx hardhat node
```

3) In a second terminal, deploy the contract to the local network:
```bash
npx hardhat run scripts\deploy.js --network localhost
```
The script will print the deployed address.

4) Start the frontend (third terminal):
```bash
cd frontend
npm start
```
Open `http://localhost:3000` and connect your wallet to the same network (e.g., Hardhat localhost).

## Smart Contracts
### `contracts/PredictionMarket.sol`
- Stores encrypted user predictions using Sapphire’s Curve25519 utilities
- `placeBet(bool _prediction)` – place a bet with `msg.value`; prediction is encrypted on-chain
- `resolveBet(uint256 _betId, bool _actualOutcome)` – decrypts and pays out if the prediction matches the outcome
- `nextUnresolvedBetId()` – helper to find the next unresolved bet

Key events and state:
- `event NewBet(uint256 betId, address better)` emitted on every bet
- `mapping(uint256 => Bet) bets` and `uint256 betCounter`

### Build, Test, and Deploy
```bash
# Compile
npx hardhat compile

# Test (sample tests included)
npx hardhat test

# Local node
npx hardhat node

# Deploy (local)
npx hardhat run scripts\deploy.js --network localhost

# Help
npx hardhat help
```

If you prefer Ignition, there’s a sample module:
```bash
npx hardhat ignition deploy .\ignition\modules\Lock.js --network localhost
```

## Frontend
Located in `frontend/` (Create React App).

### Run locally
```bash
cd frontend
npm start
```

### Notes
- The app expects a deployed `PredictionMarket` contract. Point your wallet (e.g., MetaMask) to the same network where the contract is deployed (localhost for development).
- If you wire the contract address into the UI, store it in a small configuration module or environment variable as you prefer.

## Oracle / Resolver
The `oracle/resolver.py` script is a placeholder for outcome resolution automation. Typical flow:
1) Determine the real-world outcome from a data source
2) Call the contract’s `resolveBet(betId, actualOutcome)` from an authorized account

### Python environment
```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

## Project Scripts (Common)
- **Compile contracts**: `npx hardhat compile`
- **Run tests**: `npx hardhat test`
- **Run local node**: `npx hardhat node`
- **Deploy**: `npx hardhat run scripts\deploy.js --network <network>`
- **Ignition deploy (optional)**: `npx hardhat ignition deploy .\ignition\modules\Lock.js`

## Troubleshooting
- **Frontend can’t find contract**: Ensure you’ve deployed to the same network your wallet is connected to, and the address is configured where the frontend expects it.
- **Nonce or encryption issues**: Re-deploy locally to reset state. Ensure you’re using a recent Hardhat/ethers environment.
- **Windows paths**: The README uses backslashes for Windows. On macOS/Linux, replace `scripts\deploy.js` with `scripts/deploy.js` and remove drive letters.

## License
MIT
