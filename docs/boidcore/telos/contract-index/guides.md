# Guides

## Create Boid Account
To create a boid account a sponsor needs to call `account.buy` to pay for an account. UI will be provided to make this easy.

## Fund Boid Account
To add liquid BOID to your account you can send (whole quantities) of BOID to the `boid` system contract with the memo formatted like "deposit boid_id=yourboididhere"

## Stake Boid
After depositing liquid BOID, you can call `stake` to move those funds to your self_staked balance.

## Unstake Boid
To unstake Boid first call `unstake.init` then you will need to wait the number of rounds specified in `config.stake.unstake_rounds` and then call `unstake.end`. If you want to change the amount of unstake or change your mind during the unstake period, you can call `unstake.stop` to remove the pending unstake and then call `unstake.init` again with new values.
