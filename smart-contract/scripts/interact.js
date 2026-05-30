const { ethers } = require("hardhat");

async function main() {

    const contractAddress =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const token =
        await ethers.getContractAt(
            "MyToken",
            contractAddress
        );

    const name =
        await token.name();

    console.log(
        "Token Name:",
        name
    );

    const symbol =
        await token.symbol();

    console.log(
        "Symbol:",
        symbol
    );

    const totalSupply =
        await token.totalSupply();

    console.log(
        "Total Supply:",
        totalSupply.toString()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});