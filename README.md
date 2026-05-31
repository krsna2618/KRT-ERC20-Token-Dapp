# KRT ERC20 Token DApp

A full-stack decentralized application (DApp) demonstrating the complete lifecycle and standard operations of an ERC-20 token. Built with Solidity and React, this project features a verified deployment on the Ethereum Sepolia testnet and a responsive Web3 dashboard for real-time wallet interaction.

## 🚀 Live Project

| Component | Link |
*🌐 Frontend Demo** | [![Vercel] (https://krt-erc-20-token-dapp.vercel.app/)|
*📜 Smart Contract** | [![Etherscan] (https://sepolia.etherscan.io/token/0xb9f893a7aa014dc6477392f06c9b930f44e0c3d1) |

## 🚀 Features

### Standard ERC-20 Compliance

* Implements OpenZeppelin contracts for secure minting and logic.

### Complete Wallet Interaction

* Full support for MetaMask connection and real-time state changes.

### Token Management Suite

* Direct token transfers (`transfer`)
* Third-party spending permissions (`approve`)
* Real-time balance and allowance checking (`allowance`)
* Delegated token transfers (`transferFrom`)
* Secure permission management (Allowance Revocation)

### Production Ready

* Smart contract is fully verified on Etherscan
* Frontend is optimized for deployment 


## 🛠️ Tech Stack

### Backend & Smart Contracts

* Solidity
* Hardhat
* OpenZeppelin Contracts
* Ethereum Sepolia Testnet

### Frontend & Integration

* React (via Vite)
* Tailwind CSS
* Ethers.js
* MetaMask


## 📂 Project Structure

```plaintext
KRT-ERC20-Token-Dapp/
├── smart-contract/          # Hardhat development environment
│   ├── contracts/           # Solidity smart contracts
│   ├── scripts/             # Deployment and interaction scripts
│   ├── test/                # Local automation test suites
│   └── hardhat.config.js
│
└── frontend/                # React client application
    ├── src/                 # Application components and context
    └── vite.config.js
```


## 💻 Development & Interaction Scripts

The scripts folder contains Hardhat scripts used during development and testing:

* `deploy.js` — Handles network deployment and constructor initialization
* `interact.js` — Quick state-reading utility for balances and metadata
* `approve.js` — Scripted ERC-20 approval workflow
* `transfer.js` — Scripted ERC-20 transfer workflow
* `transferFrom.js` — Scripted delegated transfer workflow


## ▶️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/krsna2618/KRT-ERC20-Token-Dapp.git
cd KRT-ERC20-Token-Dapp
```

### 2. Smart Contract Setup

Navigate to the smart contract directory:

```bash
cd smart-contract
npm install
```

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Compile the contract:

```bash
npx hardhat compile
```

Deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Verify the contract:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will start on:

```text
http://localhost:5173
```

### 4. Connect Wallet

* Install MetaMask
* Switch to Ethereum Sepolia Testnet
* Connect your wallet
* Interact with the deployed KRT token through the dashboard

### 5. Production Build

```bash
npm run build
```


## 🧠 Core Learning Outcomes

This project serves as a comprehensive reference architecture for:

### ERC-20 Token Dynamics

* Practical usage of the allowance and delegation registry

### Web3 State Management

* Syncing asynchronous blockchain RPC data with reactive UI components

### DevOps for Smart Contracts

* Managing environment variables
* Deploying to public testnets
* Programmatic verification via Etherscan
