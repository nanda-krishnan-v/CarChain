# Project Context: Car Registry DApp

This project is a simple decentralized application (DApp) designed to demonstrate the fundamentals of blockchain development on the Ethereum network. The primary goal is to provide a user-friendly web interface for individuals who are not familiar with blockchain tools like Remix IDE or the Solidity programming language.

## Core Functionality

The DApp allows users to perform two main actions:

1.  **Register a Car**: Users can connect their MetaMask wallet and submit their car's name and model. This information is stored on the blockchain through a smart contract.
2.  **View a Car**: Users can retrieve and view the details of the car they have registered.

## Technical Stack

-   **Blockchain**: Ethereum (specifically, the **Hoodie** test network).
-   **Smart Contract**: Written in **Solidity** (`^0.8.0`).
-   **Frontend**: Built with standard **HTML**, **CSS**, and **JavaScript**.
-   **Web3 Library**: **Ethers.js** is used to facilitate communication between the frontend and the Ethereum blockchain.
-   **Wallet**: **MetaMask** is required for users to manage their accounts and sign transactions.

## Workflow

1.  A user visits the web page (`index.html`).
2.  They click "Connect Wallet" to link their MetaMask account to the DApp.
3.  They fill in the car name and model and click "Register Car."
4.  Ethers.js sends a transaction request to the `registerCar` function in the deployed `CarRegistry` smart contract.
5.  The user confirms the transaction in MetaMask, and the data is stored on the blockchain.
6.  The user can then click "View My Car" to call the `getCar` function and see their registered car's details displayed on the page.
