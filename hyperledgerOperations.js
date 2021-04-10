
'use strict';

const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'samplechannel';
const chaincodeName = 'ProductTransfer';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';


function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function enrollInit() {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		console.log('registerAndEnrollUser');
        
		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		console.log('Creating Gateaway..');

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } ,
				eventHandlerOptions:{
					strategy: null
				} // using asLocalhost as this gateway is using a fabric network deployed locally
			});
			console.log('Connecting to Gateaway..');

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);
			console.log('Building network..');

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);
			console.log('Getting the contract..');

			// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
			// This type of transaction would only be run once by an application the first time it was started after it
			// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
			// an "init" type function.
			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			await contract.submitTransaction('InitLedger');
			console.log('*** Result: committed');

			
			
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			console.log('Disconnect from Fabric gateway.');
			gateway.disconnect();
		}

	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

async function createSupply() {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();
		console.log('Creating Gateaway..');

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true },
				eventHandlerOptions:{
					strategy: null
				} 
				// using asLocalhost as this gateway is using a fabric network deployed locally
			});
			console.log('Connecting to Gateaway..');


			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);
			console.log('Building network..');

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);
			console.log('Getting the contract..');

			var preId = Math.floor(Math.random() * 10000)
			console.log('preId;' + preId)
			// Now let's try to submit a transaction.
			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
			// to the orderer to be committed by each of the peer's to the channel ledger.
			console.log('\n--> Submit Transaction: addNewProduct, creates new product with arguments');
			let result = await contract.submitTransaction('addNewProduct', 'Pharmacy1_AUGBID_01.01.2021_' +  preId, 'AUGBID_01.01.2020','AUGBID',  'Pharmacy1','13','65','03.03.2033','01.03.2020','on sale', '03.04.2020','Pharmacy1',  '' );
			console.log('*** Result: committed');

			if (`${result}` !== '') {
				console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			}
			
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			console.log('Disconnect from Fabric gateway.');
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

async function getAllSupplyAndDemand() {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();
		console.log('Creating Gateaway..');

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true },
				eventHandlerOptions:{
					strategy: null
				}  // using asLocalhost as this gateway is using a fabric network deployed locally
			});
			console.log('Connecting to Gateaway..');


			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);
			console.log('Building network..');

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);
			console.log('Getting the contract..');

		

			// Let's try a query type operation (function).
			// This will be sent to just one peer and the results will be shown.
			console.log('\n--> Evaluate Transaction: queryAllProducts, function returns the current product on the ledger');
			let result = await contract.evaluateTransaction('GetAllAssets');
			//console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			if (`${result}` !== '') {
				console.log(`*** Result: ${prettyJSONString(result.toString())}`);
				return prettyJSONString(result.toString());

			}
			
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			console.log('Disconnect from Fabric gateway.');
			gateway.disconnect();
			console.log('Disconnected');

		}
	} catch (error) {
		console.error(`****666**** FAILED to run the application: ${error}`);
	}
}
module.exports = { enrollInit , createSupply, getAllSupplyAndDemand}

