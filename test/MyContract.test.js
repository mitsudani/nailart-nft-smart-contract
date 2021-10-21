const truffleAssert = require("truffle-assertions");
const assert = require("assert");

const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
  let myContract;
  const ownerAddress = accounts[0];
  const aliceAddress = accounts[1];
  const bobAddress = accounts[2];

  // build up and tear down a new Migration before each test
  beforeEach(async () => {
    myContract = await MyContract.new();
  });

  it("should fail if B is greater than A", async () => {
    await truffleAssert.fails(
      myContract.myFunction(1, 2, {
        from: aliceAddress,
      }),
      truffleAssert.ErrorType.REVERT,
      "A should be greater than B"
    );
  });

  it("should sum properly", async () => {
    const result = await myContract.myFunction(2, 1, {
      from: aliceAddress,
    });

    assert.strictEqual(result.toNumber(), 3);
  });

  it("should store the value as expected", async () => {
    await truffleAssert.passes(
      myContract.setValue(42, {
        from: aliceAddress,
      })
    );

    const result = await myContract.getValue({
      from: aliceAddress,
    });

    assert.strictEqual(result.toNumber(), 42);
  });
});
