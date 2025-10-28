# Car Registry DApp

This is a simple decentralized application (DApp) that allows users to register their car details on the Ethereum Hoodie test network. It provides a web interface for users to connect their MetaMask wallet and interact with a smart contract without needing to use Remix IDE or write Solidity code.

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
3.  **Test Ether**: You'll need some test Ether for the **Ethereum Hoodie** test network to pay for gas fees. You can get this from a faucet.

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
    - Make sure your MetaMask is connected to the **Ethereum Hoodie** test network.
    - Under the "CONTRACT" dropdown, make sure `CarRegistry` is selected.
    - Click the **Deploy** button and confirm the transaction in MetaMask.

### Step 2: Get the Contract Address and ABI

1.  **Contract Address**: After deployment, you will see your deployed contract under the "Deployed Contracts" section in Remix. Click the copy icon next to the contract name to copy its address.

2.  **Contract ABI (Application Binary Interface)**:
    - Go back to the "Solidity Compiler" tab.
    - Click the **ABI** button under the `CarRegistry.sol` contract details to copy the ABI to your clipboard. The ABI is a JSON array.

### Step 3: Configure the Frontend

1.  **Open `script.js`**: Open the `script.js` file in a text editor.
2.  **Update Contract Address**: Find the line `const contractAddress = 'YOUR_CONTRACT_ADDRESS';` and replace `YOUR_CONTRACT_ADDRESS` with the address you copied from Remix.
3.  **Update Contract ABI**: Find the line `const contractABI = [];` and paste the ABI you copied from Remix inside the square brackets `[]`.

    *Before:*
    ```javascript
    const contractABI = [];
    ```

    *After (example):*
    ```javascript
    const contractABI = [{"inputs":[...],"name":"CarRegistered","type":"event"}, ...];
    ```

### Step 4: Run the DApp

1.  **Open `index.html`**: Simply open the `index.html` file in your web browser.
2.  **Connect Wallet**: Click the "Connect Wallet" button and approve the connection in MetaMask.
3.  **Interact**: You can now register your car and view its details.

## How It Works

- **Smart Contract (`CarRegistry.sol`)**: This Solidity contract stores car data. The `registerCar` function saves a car's name and model, linking it to the sender's wallet address. The `getCar` function retrieves this data.
- **Frontend (`index.html` & `script.js`)**: The webpage provides a user interface. It uses the **Ethers.js** library to communicate with the Ethereum blockchain. When a user clicks a button, the JavaScript code calls the corresponding function in the smart contract via MetaMask.
