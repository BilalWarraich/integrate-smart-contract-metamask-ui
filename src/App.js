import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import contract from './contracts/contract.json';

const contractAddress = "0xeBa4cB2cFa8D2c00Bc1cd04bC8Af55c40B50610C";
const abi = contract.abi;

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamast installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found!");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address:", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }

  // const mintNftHandler = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const nftContract = new ethers.Contract(contractAddress, abi, signer);

  //       console.log("Initialize payment");
  //       let nftTxn = await nftContract.mint('0x41f532bED9dF43eb4895c4ddc9A756ED568E761d', 1, {
  //         value: ethers.utils.parseEther("0.1")
  //       });

  //       // let nftTxn = await nftContract.hiddenURI();
  //       // console.log(nftTxn);

  //       console.log("Mining... please wait");
  //       await nftTxn.wait();

  //       console.log(`Mined, transaction hash: ${nftTxn.hash}`);
  //     } else {
  //       console.log("Ethereum object does not exit");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');


  const [updated, setUpdated] = useState(num1+num2);

  const handleNum1 = (event) => {
    setNum1(event.target.value);
  };
  const handleNum2 = (event) => {
    setNum2(event.target.value);
  };


  const handleClick = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize methods");
        let Txn = await Contract.store( num1, num2);



        console.log("Storing... please wait");
        await Txn.wait();

        console.log(`Stored, transaction hash: ${Txn.hash}`);
        let addTxn = await Contract.add();
        let sum = addTxn.toString();
        console.log(sum);
    

        console.log("Adding... please wait");
        setUpdated(sum);

      } else {
        console.log("Ethereum object does not exit");
      }
    } catch (err) {
      console.log(err);
    }    
  };

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='btn btn-wallet-connect'>
        Connect Wallet
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <><div className="App">
      <div className="div-wallet-address">
        Wallet Address: {currentAccount ? currentAccount : "No Wallet Connected"}
      </div>
      <div className="div-wallet-button">
        {currentAccount ? connectWalletButton() : connectWalletButton()}
      </div>
    </div><div>
    <label>
    First Number:
        <input
          type="number"
          id="num1"
          name="num1"
          onChange={handleNum1}
          value={num1} />
    </label>
    <label>
    Second Number:
        <input
          type="number"
          id="num2"
          name="num2"
          onChange={handleNum2}
          value={num2} />
    </label>
        <h2>Sum: {updated}</h2>

        <button onClick={handleClick}>Add</button>
      </div></>

  );
}

export default App;
