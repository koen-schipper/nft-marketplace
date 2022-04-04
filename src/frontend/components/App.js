import './App.css';
import Navigation from './Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { ethers } from "ethers";
import MarketplaceAbi from '../contractsData/Marketplace.json';
import MarketplaceAddress from '../contractsData/Marketplace-address.json';
import NFTAbi from '../contractsData/NFT.json';
import NFTAddress from '../contractsData/NFT-address.json';
import Home from './Home';
import Create from './Create';
import MyListedItems from './MyListedItem';
import MyPurchases from './MyPurchaes';
import { Spinner } from 'react-bootstrap';
 
function App() {
  // Declare state
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState({});
  const [nft, setNFT] = useState({});
  // Metamask Login/Connect
  const web3Handler = async () => {
    // Get account list
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Store connected account to state
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.AlchemyProvider("rinkeby", "MQmFfJnpqKfvKV8zBWAZKBVf0QKTCOW0");
    // Set signer
    // let privateKey = "052d8c6d1a295e5ec054e739c564de1600f3a1910482305fbe8907abaa3d58a8";
    // let wallet = new ethers.Wallet(privateKey);
    // const signer = "052d8c6d1a295e5ec054e739c564de1600f3a1910482305fbe8907abaa3d58a8";
    const wallet = new ethers.Wallet("052d8c6d1a295e5ec054e739c564de1600f3a1910482305fbe8907abaa3d58a8", provider);
    const walletSigner = wallet.connect(provider);

    loadContracts(walletSigner)
  }
  const loadContracts = async (walletSigner) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, walletSigner);
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, walletSigner);
    setNFT(nft);
    setLoading(false);
  }

  return (
      <BrowserRouter>
        <div className="App">
          <Navigation web3Handler={web3Handler} account={account} />
          {loading ? (
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
             <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
           </div>
          ) : (
              <Routes>
                <Route path="/" element={
                  <Home marketplace={marketplace} nft={nft} />
                } />
                <Route path="/create" element={
                  <Create marketplace={marketplace} nft={nft} />
                } />
                <Route path="/my-listed-items" element={
                  <MyListedItems marketplace={marketplace} nft={nft} account={account} />
                } />
                <Route path="/my-purchases" element={
                  <MyPurchases marketplace={marketplace} nft={nft} account={account} />
                } />
              </Routes>
          )}
        </div>
      </BrowserRouter>
  );
}

export default App;
