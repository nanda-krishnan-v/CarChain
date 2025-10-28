// -- Frontend Logic --

const connectWalletBtn = document.getElementById('connectWalletBtn');
const registerBtn = document.getElementById('registerBtn');
const viewCarBtn = document.getElementById('viewCarBtn');
const carNameInput = document.getElementById('carName');
const carModelInput = document.getElementById('carModel');
const statusDiv = document.getElementById('status');
const carDetailsDiv = document.getElementById('carDetails');
const walletAddressP = document.getElementById('walletAddress');
const dappDiv = document.getElementById('dapp');

// ------------------------------------------------------------------
// TODO: REPLACE WITH YOUR CONTRACT ADDRESS AND ABI
// ------------------------------------------------------------------
const contractAddress = '0x65D3B8B82699E752FD3a22822f2A42386943CFf8'; // <-- Replace with your deployed contract address
const contractABI = [[
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
]]; // <-- Replace with your contract's ABI
// ------------------------------------------------------------------

let provider;
let signer;
let contract;

// 1. Connect to MetaMask
connectWalletBtn.addEventListener('click', async () => {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install it to use this DApp.');
        return;
    }

    try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Set up Ethers.js provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const address = await signer.getAddress();

        // Create a contract instance
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Update UI
        walletAddressP.innerText = `Connected: ${address}`;
        connectWalletBtn.style.display = 'none';
        dappDiv.style.display = 'block';
        statusDiv.innerText = 'Wallet connected successfully.';
        carDetailsDiv.innerText = '';

    } catch (error) {
        console.error('Error connecting wallet:', error);
        statusDiv.innerText = `Error: ${error.message}`;
    }
});

// 2. Register a Car
registerBtn.addEventListener('click', async () => {
    const carName = carNameInput.value;
    const carModel = carModelInput.value;

    if (!carName || !carModel) {
        alert('Please enter both car name and model.');
        return;
    }

    statusDiv.innerText = 'Registering car... Please wait for the transaction to be confirmed.';
    carDetailsDiv.innerText = '';

    try {
        const tx = await contract.registerCar(carName, carModel);
        await tx.wait(); // Wait for the transaction to be mined

        statusDiv.innerText = 'Car registered successfully!';
        carNameInput.value = '';
        carModelInput.value = '';

        // Automatically view the car after registration
        viewCarBtn.click();

    } catch (error) {
        console.error('Error registering car:', error);
        statusDiv.innerText = `Error: ${error.message}`;
    }
});

// 3. View a Car
viewCarBtn.addEventListener('click', async () => {
    statusDiv.innerText = 'Fetching car details...';
    carDetailsDiv.innerText = '';

    try {
        const ownerAddress = await signer.getAddress();
        const car = await contract.getCar(ownerAddress);

        if (car && car[0] && car[1]) {
            carDetailsDiv.innerHTML = `
                <strong>Owner:</strong> ${ownerAddress}<br>
                <strong>Car Name:</strong> ${car[0]}<br>
                <strong>Car Model:</strong> ${car[1]}
            `;
            statusDiv.innerText = 'Car details retrieved successfully.';
        } else {
            statusDiv.innerText = 'No car found for this address.';
        }
    } catch (error) {
        console.error('Error fetching car:', error);
        statusDiv.innerText = `Error: ${error.message}`;
        carDetailsDiv.innerText = 'Could not retrieve car details. Make sure a car is registered to your address.';
    }
});
