# NFTs Table
This table is for associating the ownership of NFTs with boid_ids. The table can also specify a future `locked_until_rounds` which can be used for NFT staking.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/nfts.ts)
\
Scope: `boid_id` asset owner
\
Index: `asset_id`
## Overview
```ts
class NFT extends Table {
  // the atomicassets asset_id
  asset_id:u64
  // the NFT can't be moved or burned until this round, default is 0
  locked_until_round:u16
  @primary
  get primary():u64 {
    return this.asset_id
  }
}
```
