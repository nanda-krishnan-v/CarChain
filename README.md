# Car Registry DApp

This is a simple decentralized application (DApp) that allows users to register their car details on the **Hoodie test network**. It provides a web interface for users to connect their MetaMask wallet and interact with a smart contract without needing to use Remix IDE or write Solidity code.

> **Note:** We are using the Sepolia testnet because it is stable and widely supported, ensuring a reliable development experience.

## Features

- Connect to MetaMask wallet.
- Register a car with a name and model.
- Each wallet address can only register one car.
- View the details of the registered car.
- Simple, user-friendly interface.

## Project Structure

```
/
|-- CarRegistry.sol    # The Solidity smart contract
|-- index.html         # The main HTML file for the frontend
|-- script.js          # JavaScript logic for frontend and contract interaction
|-- context.md         # Project overview
|-- README.md          # This file
```

## How to Set Up and Run

### Prerequisites

1.  **MetaMask**: A web browser extension for managing Ethereum wallets. [Download here](https://metamask.io/).
2.  **Node.js & npm**: Required if you want to serve the files locally using a simple server.
3.  **Test Ether (ETH)**: You'll need test ETH to pay for gas fees on the test network. **Even on test networks, you need ETH to pay for transactions!** The good news is test ETH is free from faucets.

#### Getting Test ETH from Faucets:

**For Sepolia Test Network:**

- [sepoliafaucet.com](https://sepoliafaucet.com/)
- [infura.io/faucet/sepolia](https://infura.io/faucet/sepolia)
- [faucet.quicknode.com/ethereum/sepolia](https://faucet.quicknode.com/ethereum/sepolia)
- [faucets.chain.link](https://faucets.chain.link/)

**For Holesky Test Network (formerly Hoodi):**

- [holesky-faucet.pk910.de](https://holesky-faucet.pk910.de/)
- [faucet.quicknode.com/ethereum/holesky](https://faucet.quicknode.com/ethereum/holesky)

**For Goerli Test Network:**

- [goerlifaucet.com](https://goerlifaucet.com/)
- [faucets.chain.link/goerli](https://faucets.chain.link/goerli)

**How to Use a Faucet:**

1. Make sure MetaMask is connected to the correct test network
2. Copy your wallet address from MetaMask
3. Paste it into the faucet website
4. Complete any required verification (CAPTCHA, social media, etc.)
5. Wait a few minutes for the test ETH to arrive in your wallet
6. You'll typically receive 0.1-0.5 test ETH, which is enough for many transactions

**Note:** Gas fees on test networks are usually very small (less than 0.001 ETH per transaction), so a small amount of test ETH goes a long way!

### Step 1: Deploy the Smart Contract

1.  **Open Remix IDE**: Go to [https://remix.ethereum.org/](https://remix.ethereum.org/).
2.  **Create a New File**: Create a new file named `CarRegistry.sol` and paste the content from the `CarRegistry.sol` file in this project.
3.  **Compile the Contract**:
    - Go to the "Solidity Compiler" tab (third icon on the left).
    - Set the compiler version to `0.8.0` or a compatible version (e.g., `0.8.20`).
    - Click the **Compile CarRegistry.sol** button.
4.  **Deploy the Contract**:
    - Go to the "Deploy & Run Transactions" tab (fourth icon).
    - In the "ENVIRONMENT" dropdown, select **Injected Provider - MetaMask**. This will connect Remix to your MetaMask wallet.
    - Make sure your MetaMask is connected to a **test network** (Sepolia, Holesky, or Goerli). If you don't see test networks, enable them in MetaMask's settings under "Advanced" > "Show test networks".
    - **Important:** Make sure you have test ETH in your wallet! If you see "Insufficient funds" error, get test ETH from a faucet (see Prerequisites above).
    - Under the "CONTRACT" dropdown, make sure `CarRegistry` is selected.
    - Click the **Deploy** button and confirm the transaction in MetaMask.
    - The deployment will cost a small amount of test ETH (usually 0.001-0.01 ETH) for gas fees.

### Step 2: Get the Contract Address and ABI

1.  **Contract Address**: After deployment, you will see your deployed contract under the "Deployed Contracts" section in Remix. Click the copy icon next to the contract name to copy its address.

2.  **Contract ABI (Application Binary Interface)**:
    - Go back to the "Solidity Compiler" tab.
    - Click the **ABI** button under the `CarRegistry.sol` contract details to copy the ABI to your clipboard. The ABI is a JSON array.

### Step 3: Configure the Frontend

1.  **Open `script.js`**: Open the `script.js` file in a text editor.
2.  **Update Contract Address**: Find the line `const contractAddress = 'YOUR_CONTRACT_ADDRESS';` and replace `YOUR_CONTRACT_ADDRESS` with the address you copied from Remix.
3.  **Update Contract ABI**: Find the line `const contractABI = [];` and paste the ABI you copied from Remix inside the square brackets `[]`.

    _Before:_

    ```javascript
    const contractABI = [];
    ```

    _After (example):_

    ```javascript
    const contractABI = [{"inputs":[...],"name":"CarRegistered","type":"event"}, ...];
    ```

### Step 4: Run the DApp on Localhost

**Important:** MetaMask requires the DApp to be served from `http://localhost` (not `file://`) to work properly.

**Option 1: Using Python (Easiest)**

1. Open a terminal/command prompt in the project folder
2. Run: `python -m http.server 8000`
   - Or double-click `start-server.bat` (Windows)
   - Or run `.\start-server.ps1` (PowerShell)
3. Open your browser and go to: `http://localhost:8000`

**Option 2: Using Node.js**

1. Open a terminal/command prompt in the project folder
2. Run: `node server.js`
   - Or run: `npx http-server -p 8000`
3. Open your browser and go to: `http://localhost:8000`

**Option 3: Using VS Code**

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

**After the server starts:**

1. **Connect Wallet**: Click the "Connect Wallet" button and approve the connection in MetaMask
2. **Check Your Balance**: Make sure you have test ETH in your wallet. If you see "Insufficient funds" error, get test ETH from a faucet (see Prerequisites above)
3. **Interact**: You can now register your car and view its details
   - Registering a car costs a small amount of test ETH (gas fee, usually < 0.001 ETH)
   - Viewing your car is free (read-only operation)

## How It Works

- **Smart Contract (`CarRegistry.sol`)**: This Solidity contract stores car data. The `registerCar` function saves a car's name and model, linking it to the sender's wallet address. The `getCar` function retrieves this data.
- **Frontend (`index.html` & `script.js`)**: The webpage provides a user interface. It uses the **Ethers.js** library to communicate with the Ethereum blockchain. When a user clicks a button, the JavaScript code calls the corresponding function in the smart contract via MetaMask.
