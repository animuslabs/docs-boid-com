# NFTMint Table
This is a temporary table that is only used during inline transactions. The purpose of this table is to temporarily store the reciver of a new NFT mint so that the `nft.boid account` can mint new NFTs directly to the `boid` system contract and the system contract knows which internal `boid_id` the new mint belongs to and can register the new NFT in the `nfts` table for that user.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/nftmint.ts)
\
Scope: `boid`
\
Index: non (Singleton)

## Overview
```ts
class NFTMint extends Table {
  // the boid_id that will be credited with the minted NFT
  // the NFT is added to the nfts table under the account ownership
  mint_receiver_boid_id: Name
  // the quantity of mints for the boid_id to receive
  mint_quantity_remaining:u16
}
```
