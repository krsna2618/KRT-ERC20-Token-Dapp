const { ethers } = require("hardhat");

async function main() {

    const contractAddress =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const token =
        await ethers.getContractAt(
            "MyToken",
            contractAddress
        );

    const [sender, receiver] =
        await ethers.getSigners();

    console.log(
        "Sender:",
        sender.address
    );

    console.log(
        "Receiver:",
        receiver.address
    );

    const senderBalanceBefore =
        await token.balanceOf(
            sender.address
        );

    const receiverBalanceBefore =
        await token.balanceOf(
            receiver.address
        );

    console.log(
        "Sender Balance Before:",
        senderBalanceBefore.toString()
    );

    console.log(
        "Receiver Balance Before:",
        receiverBalanceBefore.toString()
    );

    const amount =
        ethers.parseUnits("10", 18);

    const tx =
        await token.transfer(
            receiver.address,
            amount
        );

    await tx.wait();

    console.log(
        "Transfer Transaction Hash:",
        tx.hash
    );

    const senderBalanceAfter =
        await token.balanceOf(
            sender.address
        );

    const receiverBalanceAfter =
        await token.balanceOf(
            receiver.address
        );

    console.log(
        "Sender Balance After:",
        senderBalanceAfter.toString()
    );

    console.log(
        "Receiver Balance After:",
        receiverBalanceAfter.toString()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});