// const { assert, expect } = require("chai");
// const { deployments, ethers, getNamedAccounts } = require("hardhat");

// describe("FundMe", async () => {
//   let fundMe;
//   let mockV3Aggregator;
//   let deployer;
//   const sendValue = ethers.utils.parseEther("1");
//   beforeEach(async () => {
//     // const accounts = await ethers.getSigners()
//     // deployer = accounts[0]
//     deployer = (await getNamedAccounts()).deployer;
//     await deployments.fixture(["all"]);
//     fundMe = await ethers.getContract("FundMe", deployer);
//     mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
//   });

//   describe("constructor", async () => {
//     it("Set the aggregator addresses correctly", async () => {
//       const response = await fundMe.priceFeed();
//       assert.equal(response, mockV3Aggregator.address);
//     });
//   });
//   describe("fund", async () => {
//     it("Fails if you don't send enough ETH", async () => {
//       await expect(fundMe.fund()).to.be.reverted;
//     });
//     it("Update amount funded data structure ", async () => {
//       await fundMe.fund({ value: sendValue });
//       const response = await fundMe.addressToAmountFunded(deployer);
//       assert.equal(response.toString(), sendValue.toString());
//     });
//     it("adds funders to array of funders", async () => {
//       await fundMe.fund({ value: sendValue });
//       const funder = await fundMe.funders(0);
//       assert.equal(funder, deployer);
//     });
//   });
//   describe("withdraw", async () => {
//     beforeEach(async () => {
//       await fundMe.fund({ value: sendValue });
//     });
//     it("Withdraw ETH from a single funder", async () => {
//       // arrange
//       const startingFundMeBalance = await fundMe.provider.getBalance(
//         fundMe.address
//       );
//       const startingDeployerBalance = await fundMe.provider.getBalance(
//         deployer
//       );
//       // act
//       const transactionResponse = await fundMe.withdraw();
//       const transactionReceipt = await transactionResponse.wait(1);
//       const { gasUsed, effectiveGasPrice } = transactionReceipt;
//       const gasCost = gasUsed.mul(effectiveGasPrice);

//       const endingFundMeBalance = await fundMe.provider.getBalance(
//         fundMe.address
//       );

//       const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

//       //assert
//       assert.equal(endingFundMeBalance, 0);
//       assert.equal(
//         startingFundMeBalance.add(startingDeployerBalance).toString(),
//         endingDeployerBalance.add(gasCost).toString()
//       );
//     });
//     it("allows us to withdraw with multiple funders", async () => {
//       const accounts = await ethers.getSigners();
//       for (let i = 1; i < 6; i++) {
//         const fundMeConnectedContract = await fundMe.connect(accounts[i]);
//         await fundMeConnectedContract.fund({ value: sendValue });
//       }
//       const startingFundMeBalance = await fundMe.provider.getBalance(
//         fundMe.address
//       );
//       const startingDeployerBalance = await fundMe.provider.getBalance(
//         deployer
//       );
//       //act
//       const transactionResponse = await fundMe.withdraw();
//       const transactionReceipt = await transactionResponse.wait(1);
//       const { gasUsed, effectiveGasPrice } = transactionReceipt;
//       const gasCost = gasUsed.mul(effectiveGasPrice);

//       const endingFundMeBalance = await fundMe.provider.getBalance(
//         fundMe.address
//       );

//       const endingDeployerBalance = await fundMe.provider.getBalance(deployer);

//       //assert
//       assert.equal(endingFundMeBalance, 0);
//       assert.equal(
//         startingFundMeBalance.add(startingDeployerBalance).toString(),
//         endingDeployerBalance.add(gasCost).toString()
//       );

//       //make sure funders are reset properly
//       await expect(fundMe.funders(0)).to.be.reverted;
//       for (i = 1; i < 6; i++) {
//         assert.equal(
//           await fundMe.addressToAmountFunded(accounts[i].address),
//           0
//         );
//       }
//     });
//     it("Only allows the owner to withdraw", async () => {
//       const accounts = await ethers.getSigners();
//       const fundMeConnectedContract = await fundMe.connect(accounts[1]);
//       await expect(fundMeConnectedContract.withdraw()).to.be.revertedWith(
//         "FundMe__NotOwner"
//       );
//     });
//   });
// });
