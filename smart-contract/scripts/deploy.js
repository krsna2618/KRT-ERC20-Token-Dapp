const { ethers } = require("hardhat");

async function main() {

    const MyToken =
        await ethers.getContractFactory(
            "MyToken"
        );

    const token =
        await MyToken.deploy();

    await token.waitForDeployment();

    console.log(
        `Token deployed to: ${token.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});