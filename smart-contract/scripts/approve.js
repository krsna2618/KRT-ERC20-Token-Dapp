const { ethers } = require("hardhat");

async function main() {

    const contractAddress =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const token =
        await ethers.getContractAt(
            "MyToken",
            contractAddress
        );

    const [owner, spender] =
        await ethers.getSigners();

    console.log(
        "Owner:",
        owner.address
    );

    console.log(
        "Spender:",
        spender.address
    );

    const amount =
        ethers.parseUnits("100", 18);

    const tx =
        await token.approve(
            spender.address,
            amount
        );

    await tx.wait();

    console.log(
        "Approval successful"
    );

    const allowance =
        await token.allowance(
            owner.address,
            spender.address
        );

    console.log(
        "Allowance:",
        allowance.toString()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});