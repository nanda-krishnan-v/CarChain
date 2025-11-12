// -- Frontend Logic --

const connectWalletBtn = document.getElementById("connectWalletBtn");
const registerBtn = document.getElementById("registerBtn");
const viewCarBtn = document.getElementById("viewCarBtn");
const carNameInput = document.getElementById("carName");
const carModelInput = document.getElementById("carModel");
const statusDiv = document.getElementById("status");
const carDetailsDiv = document.getElementById("carDetails");
const walletAddressP = document.getElementById("walletAddress");
const dappDiv = document.getElementById("dapp");

// ------------------------------------------------------------------
// TODO: REPLACE WITH YOUR CONTRACT ADDRESS AND ABI
// ------------------------------------------------------------------
const contractAddress = "0x6F36900b70FCfbB0706B43b10CaF4Ea30510e0d1"; // <-- Replace with your deployed contract address
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "model",
				"type": "string"
			}
		],
		"name": "CarRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			}
		],
		"name": "registerCar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "cars",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getCar",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // <-- Replace with your contract's ABI
// ------------------------------------------------------------------

let provider;
let signer;
let contract;

// 1. Connect to MetaMask
connectWalletBtn.addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install it to use this DApp.");
    return;
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Set up Ethers.js provider and signer
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const address = await signer.getAddress();

    // Create a contract instance
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Update UI
    walletAddressP.innerText = `Connected: ${address}`;
    connectWalletBtn.style.display = "none";
    dappDiv.style.display = "block";
    statusDiv.innerText = "Wallet connected successfully.";
    carDetailsDiv.innerText = "";
  } catch (error) {
    console.error("Error connecting wallet:", error);
    statusDiv.innerText = `Error: ${error.message}`;
  }
});

// 2. Register a Car
registerBtn.addEventListener("click", async () => {
  const carName = carNameInput.value;
  const carModel = carModelInput.value;

  if (!carName || !carModel) {
    alert("Please enter both car name and model.");
    return;
  }

  statusDiv.innerText =
    "Registering car... Please wait for the transaction to be confirmed.";
  carDetailsDiv.innerText = "";

  try {
    const tx = await contract.registerCar(carName, carModel);
    statusDiv.innerText = "Transaction submitted! Waiting for confirmation...";

    const receipt = await tx.wait(); // Wait for the transaction to be mined

    // Display transaction details in a beautiful format
    statusDiv.innerText = "✅ Car registered successfully!";
    statusDiv.style.backgroundColor = "#d4edda";
    statusDiv.style.color = "#155724";

    carDetailsDiv.innerHTML = `
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 15px; border: 1px solid #dee2e6;">
                <h3 style="margin-top: 0; color: #007bff;">Transaction Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>📋 Transaction Hash:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6; word-break: break-all; font-family: monospace; font-size: 0.9em;">${
                          receipt.transactionHash
                        }</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>✅ Status:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><span style="background-color: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">Success</span></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>📦 Block:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">${
                          receipt.blockNumber
                        }</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>⛽ Gas Used:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">${receipt.gasUsed.toString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>🚗 Car Name:</strong></td>
                        <td style="padding: 8px; color: #007bff; font-weight: bold;">${carName}</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                        <td style="padding: 8px;"><strong>🏷️ Car Model:</strong></td>
                        <td style="padding: 8px; color: #007bff; font-weight: bold;">${carModel}</td>
                    </tr>
                </table>
            </div>
        `;

    carNameInput.value = "";
    carModelInput.value = "";
  } catch (error) {
    console.error("Error registering car:", error);

    // Check if the error is due to already having a car registered
    if (
      error.message.includes("already registered") ||
      error.message.includes("execution reverted") ||
      error.message.includes("cannot estimate gas")
    ) {
      statusDiv.innerText = "⚠️ Cannot Register: Car Already Registered";
      statusDiv.style.backgroundColor = "#fff3cd";
      statusDiv.style.color = "#856404";
      carDetailsDiv.innerHTML = `
                <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 15px; border: 1px solid #ffc107;">
                    <h4 style="margin-top: 0; color: #856404;">⚠️ Registration Limit Reached</h4>
                    <p style="color: #856404;">This wallet address has already registered a car. Each address can only register <strong>one car</strong>.</p>
                    <p style="color: #856404;">To register a different car, please:</p>
                    <ul style="text-align: left; color: #856404;">
                        <li>Switch to a different MetaMask account, or</li>
                        <li>Use the "View My Car" button to see your currently registered car</li>
                    </ul>
                </div>
            `;
    } else if (error.message.includes("user rejected")) {
      statusDiv.innerText = "❌ Transaction Cancelled";
      statusDiv.style.backgroundColor = "#f8d7da";
      statusDiv.style.color = "#721c24";
      carDetailsDiv.innerHTML = `<p style="text-align: center; color: #666;">You rejected the transaction in MetaMask.</p>`;
    } else {
      statusDiv.innerText = "❌ Error: Failed to register car.";
      statusDiv.style.backgroundColor = "#f8d7da";
      statusDiv.style.color = "#721c24";
      carDetailsDiv.innerHTML = `<p style="text-align: center; color: #666;">${error.message}</p>`;
    }
  }
});

// 3. View a Car
viewCarBtn.addEventListener("click", async () => {
  statusDiv.innerText = "Fetching car details...";
  carDetailsDiv.innerText = "";

  try {
    const ownerAddress = await signer.getAddress();
    const car = await contract.getCar(ownerAddress);

    if (car && car[0] && car[1]) {
      carDetailsDiv.innerHTML = `
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <tr style="background-color: #007bff; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Field</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Value</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Owner Address</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd; word-break: break-all;">${ownerAddress}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Car Name</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${car[0]}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Car Model</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${car[1]}</td>
                    </tr>
                </table>
            `;
      statusDiv.innerText = "✅ Car details retrieved successfully!";
      statusDiv.style.backgroundColor = "#d4edda";
      statusDiv.style.color = "#155724";
    } else {
      statusDiv.innerText = "ℹ️ No car found for this address.";
      statusDiv.style.backgroundColor = "#fff3cd";
      statusDiv.style.color = "#856404";
      carDetailsDiv.innerText = "";
    }
  } catch (error) {
    console.error("Error fetching car:", error);
    // Check if the error is due to no car being registered
    if (
      error.message.includes("execution reverted") ||
      error.message.includes("revert")
    ) {
      statusDiv.innerText = "ℹ️ No car registered for this address yet.";
      statusDiv.style.backgroundColor = "#fff3cd";
      statusDiv.style.color = "#856404";
      carDetailsDiv.innerHTML =
        '<p style="text-align: center; color: #666;">Please register a car first using the form above.</p>';
    } else {
      statusDiv.innerText = "❌ Error: Could not retrieve car details.";
      statusDiv.style.backgroundColor = "#f8d7da";
      statusDiv.style.color = "#721c24";
      carDetailsDiv.innerHTML =
        '<p style="text-align: center; color: #666;">Please try again or check the console for details.</p>';
    }
  }
});
