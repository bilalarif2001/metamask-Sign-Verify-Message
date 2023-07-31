# MetaMask Sign-Verify Message React App

This is a web3 app that demonstrates how we can sign messages using metamask and verify them via the generated signature hash. This application required crypto wallet extension installed on your browser i.e **MetaMask**. The app connects to the wallet. Using the signing tab, messages can be signed to the connected wallet. When signed, it returns signature hash. The signature hash will be stored along with message and sender's public key in the form of object. The verify section receives the object containing address, message and signature. If the message or signature is not signed against given address, it is invalid.

## Tools

1. React.js
2. Tailwind.css
3. ethers.js

## How to run this project?

1. Download zip file from github or clone git repository from terminal via repo link.
2. Open terminal and set path directory in folder using cd command.
3. In terminal, type **npm install** to download required node modules.
4. Type **npm start**.
5. The project is live on **http://localhost:3000/**

