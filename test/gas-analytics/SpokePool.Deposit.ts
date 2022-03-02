import { toBNWei, SignerWithAddress, Contract, ethers, seedWallet, toBN, BigNumber } from "../utils";
import { spokePoolFixture, enableRoutes, getDepositParams } from "../fixtures/SpokePool.Fixture";

require("dotenv").config();

let spokePool: Contract, weth: Contract, erc20: Contract;
let depositor: SignerWithAddress;

// Constants caller can tune to modify gas tests.
const DEPOSIT_COUNT = 10;
const DEPOSIT_AMOUNT = toBNWei("10");

function constructDepositParams(depositTokenAddress: string, quoteTime: BigNumber) {
  return getDepositParams(depositor.address, depositTokenAddress, DEPOSIT_AMOUNT, 1, toBN("0"), quoteTime);
}
describe("Gas Analytics: SpokePool Deposits", function () {
  before(async function () {
    if (!process.env.GAS_TEST_ENABLED) this.skip();
  });

  beforeEach(async function () {
    [depositor] = await ethers.getSigners();
    ({ spokePool, weth, erc20 } = await spokePoolFixture());

    // mint some fresh tokens and deposit ETH for weth for the depositor.
    const totalDepositAmount = DEPOSIT_AMOUNT.mul(DEPOSIT_COUNT);
    await seedWallet(depositor, [erc20], weth, totalDepositAmount);

    // Approve spokepool to spend tokens
    await erc20.connect(depositor).approve(spokePool.address, totalDepositAmount);
    await weth.connect(depositor).approve(spokePool.address, totalDepositAmount);

    // Whitelist origin token => destination chain ID routes:
    await enableRoutes(spokePool, [
      {
        originToken: erc20.address,
        destinationChainId: 1,
      },
      {
        originToken: weth.address,
        destinationChainId: 1,
      },
    ]);
  });

  describe(`ERC20 Deposits`, function () {
    it("1 Deposit", async function () {
      const currentSpokePoolTime = await spokePool.getCurrentTime();

      const txn = await spokePool
        .connect(depositor)
        .deposit(...constructDepositParams(erc20.address, currentSpokePoolTime));

      const receipt = await txn.wait();
      console.log(`deposit-gasUsed: ${receipt.gasUsed}`);
    });
    it(`${DEPOSIT_COUNT} deposits`, async function () {
      const currentSpokePoolTime = await spokePool.getCurrentTime();

      const txns = [];
      for (let i = 0; i < DEPOSIT_COUNT; i++) {
        txns.push(
          await spokePool.connect(depositor).deposit(...constructDepositParams(erc20.address, currentSpokePoolTime))
        );
      }

      // Compute average gas costs.
      const receipts = await Promise.all(txns.map((_txn) => _txn.wait()));
      const gasUsed = receipts.map((_receipt) => _receipt.gasUsed).reduce((x, y) => x.add(y));
      console.log(`(average) deposit-gasUsed: ${gasUsed.div(DEPOSIT_COUNT)}`);
    });

    it(`${DEPOSIT_COUNT} deposits using multicall`, async function () {
      const currentSpokePoolTime = await spokePool.getCurrentTime();

      const multicallData = Array(DEPOSIT_COUNT).fill(
        spokePool.interface.encodeFunctionData("deposit", constructDepositParams(erc20.address, currentSpokePoolTime))
      );

      const receipt = await (await spokePool.connect(depositor).multicall(multicallData)).wait();
      console.log(`(average) deposit-gasUsed: ${receipt.gasUsed.div(DEPOSIT_COUNT)}`);
    });
  });
  describe(`WETH Deposits`, function () {
    it("1 ETH Deposit", async function () {
      const currentSpokePoolTime = await spokePool.getCurrentTime();

      const txn = await spokePool
        .connect(depositor)
        .deposit(...constructDepositParams(weth.address, currentSpokePoolTime), { value: DEPOSIT_AMOUNT });

      const receipt = await txn.wait();
      console.log(`deposit-gasUsed: ${receipt.gasUsed}`);
    });
  });
});
