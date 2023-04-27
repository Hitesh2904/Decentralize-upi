import abi from "./contract/vendor.json"
import {useState,useEffect} from 'react';
import {ethers} from "ethers";

import './App.css';

function App() {
  
  const [state,setState] = useState({
    provider:null, 
    signer:null,
    contract:null
  })
  
  useEffect(()=> {
    const connectWallet = async () => {
      const contractAddress = "0xfb407e71a906c1891584cb05187d27aa049a1a79";
      const contractABI = abi.abi;
      
      try{
        const {ethereum} = window;

        if(ethereum)
        {
          const account = await ethereum.request({method : "eth_requestAccounts",})
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setState({provider,signer,contract});
      }catch(error)
      {
        console.log(error);
      }
    };
    connectWallet();
  },[]);
  console.log(state);

  return (<div className="App"></div>);
}

export default App;
