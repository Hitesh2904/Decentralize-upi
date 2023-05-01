import abi from "./contract/vendor.json"
import {useState,useEffect} from 'react';
import {ethers} from "ethers";
import Buy from "./components/Buy"
import Memos from "./components/Memos";
import photo from "./photo.png";
import './App.css';

function App() {
  
  const [state,setState] = useState({
    provider:null, 
    signer:null,
    contract:null
  });

  const [account, setAccount] = useState("None");
  useEffect(()=> {
    const connectWallet = async () => {
      const contractAddress ="0xfb407e71a906c1891584cb05187d27aa049a1a79";
      // "0xE026717dCd57563587a93F30d204F53bB9Fe7D7f";
      const contractABI = abi.abi;
      
      try{
        const {ethereum} = window;

        if(ethereum)
        {
          const account = await ethereum.request({method : "eth_requestAccounts",});

          window.ethereum.on("chainChanged", () => {window.location.reload();});
          window.ethereum.on("accountsChanged", () => {window.location.reload()}); 

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress,contractABI,signer);
          
          setAccount(account);
          setState({provider,signer,contract});
        }
        else {
          alert("Please install metamask");
        }
      }catch(error)
      {
        console.log(error);
      }
    };
    connectWallet();
  },[]);
  // console.log(state);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={photo} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state = {state}></Buy>
        <Memos state = {state}></Memos>
      </div>
    </div>
  );
}

export default App;
