const { ethers } = require("hardhat");

async function main() {

    const contractAddress =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const token =
        await ethers.getContractAt(
            "MyToken",
            contractAddress
        );

    const [owner, spender, receiver] =
        await ethers.getSigners();

    console.log(
        "Owner:",
        owner.address
    );

    console.log(
        "Spender:",
        spender.address
    );

    console.log(
        "Receiver:",
        receiver.address
    );

    const allowanceBefore =
        await token.allowance(
            owner.address,
            spender.address
        );

    console.log(
        "Allowance Before:",
        allowanceBefore.toString()
    );

    const receiverBalanceBefore =
        await token.balanceOf(
            receiver.address
        );

    console.log(
        "Receiver Balance Before:",
        receiverBalanceBefore.toString()
    );

    const amount =
        ethers.parseUnits("50", 18);

    const tx =
        await token
            .connect(spender)
            .transferFrom(
                owner.address,
                receiver.address,
                amount
            );

    await tx.wait();

    console.log(
        "transferFrom successful"
    );

    const allowanceAfter =
        await token.allowance(
            owner.address,
            spender.address
        );

    console.log(
        "Allowance After:",
        allowanceAfter.toString()
    );

    const receiverBalanceAfter =
        await token.balanceOf(
            receiver.address
        );

    console.log(
        "Receiver Balance After:",
        receiverBalanceAfter.toString()
    );


    const ownerBalanceAfter =
        await token.balanceOf(
            owner.address
        );

    console.log(
        "Owner Balance After:",
        ownerBalanceAfter.toString()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});