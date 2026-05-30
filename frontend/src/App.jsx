import { useState } from "react";
import { ethers } from "ethers";
import { ABI } from "./abi/MyTokenABI";
import DashboardUI from "./DashboardUI";

function App() {

  const [walletAddress, setWalletAddress] =
    useState("");

  const [tokenName, setTokenName] =
    useState("");

  const [symbol, setSymbol] =
    useState("");

  const [balance, setBalance] =
    useState("");

  const [receiver, setReceiver] =
    useState("");

  const [transferFromStatus, setTransferFromStatus] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [allowance, setAllowance] =
    useState("");

  const [spenderAddress] =
    useState(
      "0x002E0FbCF16fE7CaDF6261c378D7Ea316ceDAd6A"
    ); //spender address 

  const contractAddress =
    "0xB9F893A7Aa014dC6477392F06c9b930F44e0C3D1"; //contract address of deployed token

  async function connectWallet() {

    try {

      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const network = await provider.getNetwork();
      console.log("Connected network:", network.name, network.chainId);

      const signer =
        await provider.getSigner();

      const address =
        await signer.getAddress();

      setWalletAddress(address);

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      const tokenName =
        await contract.name();

      setTokenName(tokenName);

      const tokenSymbol =
        await contract.symbol();

      setSymbol(tokenSymbol);

      const walletBalance =
        await contract.balanceOf(address);

      setBalance(
        ethers.formatUnits(
          walletBalance,
          18
        )
      );

    } catch (error) {

      console.error(error);

      let debugMsg = "";
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const net = await provider.getNetwork();
        let providerName = "Unknown";
        if (window.ethereum) {
          if (window.ethereum.isMetaMask && !window.ethereum.isBraveWallet) providerName = "MetaMask";
          else if (window.ethereum.isBraveWallet) providerName = "Brave Wallet";
          else if (window.ethereum.isCoinbaseWallet) providerName = "Coinbase Wallet";
          else if (window.ethereum.isRabby) providerName = "Rabby";
          else {
            const keys = Object.keys(window.ethereum).filter(k => k.startsWith("is"));
            providerName = keys.length ? keys.join(", ") : "Generic";
          }
        }
        debugMsg = ` (Provider: ${providerName}, Chain ID: ${net.chainId})`;
      } catch (err) {
        console.warn("Silent network check failure:", err);
      }

      alert(
        "Contract connection failed" + debugMsg + ": " + (error.message || error)
      );
    }
  }

  async function transferTokens() {

    try {

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      const tx =
        await contract.transfer(
          receiver,
          ethers.parseUnits(amount, 18)
        );

      await tx.wait();

      alert(
        "Transfer Successful"
      );

      const updatedBalance =
        await contract.balanceOf(
          walletAddress
        );

      setBalance(
        ethers.formatUnits(
          updatedBalance,
          18
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Transfer Failed: " + (error.message || error)
      );

      throw error;
    }
  }

  async function approveTokens() {

    try {

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      const tx =
        await contract.approve(
          spenderAddress,
          ethers.parseUnits("50", 18)
        );

      await tx.wait();

      alert(
        "Approved 50 KRT"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Approval Failed: " + (error.message || error)
      );

      throw error;
    }
  }

  async function revokeAllowance() {

    try {

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      const tx =
        await contract.approve(
          spenderAddress,
          0
        );

      await tx.wait();

      alert(
        "Allowance Revoked"
      );

    } catch (error) {

      console.error(error);
    }
  }

  async function checkAllowance() {

    try {

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      const owner =
        "0x2CA11E0C264B2fE14111DF7bdDa1339a10E66399";

      const value =
        await contract.allowance(
          owner,
          spenderAddress
        );

      setAllowance(
        ethers.formatUnits(
          value,
          18
        )
      );

    } catch (error) {

      console.error(error);
    }
  }

  async function transferFromTokens() {

    try {

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          contractAddress,
          ABI,
          signer
        );

      console.log(
        "Connected signer:",
        await signer.getAddress()
      );

      const owner =
        "0x2CA11E0C264B2fE14111DF7bdDa1339a10E66399";

      const receiver =
        "0xce72275474170826AA042b5186c19A58eD5b603B";

      setTransferFromStatus(
        "Waiting for confirmation..."
      );

      const tx =
        await contract.transferFrom(
          owner,
          receiver,
          ethers.parseUnits("50", 18)
        );

      await tx.wait();

      setTransferFromStatus(
        "transferFrom Successful"
      );
      setTimeout(() => {

        setTransferFromStatus("");

      }, 8000);

    } catch (error) {

      console.error(error);

      setTransferFromStatus(
        "transferFrom Failed: " + (error.message || error)
      );
    }
  }

  return (
    <DashboardUI
      walletAddress={walletAddress}
      tokenName={tokenName}
      symbol={symbol}
      balance={balance}
      allowance={allowance}
      receiver={receiver}
      setReceiver={setReceiver}
      amount={amount}
      setAmount={setAmount}
      connectWallet={connectWallet}
      transferTokens={transferTokens}
      approveTokens={approveTokens}
      checkAllowance={checkAllowance}
      revokeAllowance={revokeAllowance}
      transferFromTokens={transferFromTokens}
      transferFromStatus={transferFromStatus}
    />
  );
}

export default App;