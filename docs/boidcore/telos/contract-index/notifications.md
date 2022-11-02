# Notifications
Notifications are special functions that are triggered when the system contract receives a message from an external contract

## `Transfer`
[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/3-deposit.ts)

When the contract receives a `transfer` action notification it first checks if the transfer is coming from the `token.boid` contract or the `atomicassets` contract and that the parameters are valid.


If the deposit is tokens from `token.boid` then it checks the memo to determine what kind of deposit to process. If the memo starts with "sponsor" the funds are directed to the deposit table. If the memo starts with "deposit" the funds are diverted to a boid account liquid balance. To determine what boid account should receive the BOID, it checks the memo for "boid_id=boidid". If the boid_id supplied is valid, then that boid account is credited for the deposit.

If the deposit is an NFT transfer from `atomicassets` then it makes sure the NFTs are issued by `nft.boid` and it reads the memo "boid_id=boidid" to determine which boid account should be credited with the NFTs. New rows are added to the `nfts` table.

## `logmint`
[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/11-nft.ts)

When the contract receives a `logmint` action notification it makes sure the mint is coming from the `atomicassets` contract and issued by `nft.boid`. Next it checks the `nftmint` table to see which boid account should be credited with the newly minted NFT. The nft is then added to the `nfts` table and the account nft_balance is incremented.
