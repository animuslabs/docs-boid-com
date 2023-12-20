# NFTs Table Documentation

## Table Definition

This table stores data related to the NFTs (Non-Fungible Tokens) within the system, including ownership and locking mechanisms for staking purposes.

[Source Code](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/nfts.ts)

Scope: `boid_id` - Asset owner's unique identifier.

Primary Index: `asset_id` - Unique asset identification number corresponding to the NFT.

## Table Structure

```ts
@table("nfts")
export class NFT extends Table {
  constructor(
    public asset_id: u64 = 0,           // AtomicAssets asset ID.
    public locked_until_round: u16 = 0   // Round until which the NFT is locked (0 if not locked).
  ) {
    super();
  }

  @primary
  get primary(): u64 {
    return this.asset_id;               // Primary key based on asset ID.
  }
}
```

- `asset_id: u64` - A 64-bit unsigned integer representing the unique ID of the NFT within the AtomicAssets standard.
- `locked_until_round: u16` - A 16-bit unsigned integer indicating the round number until which the NFT is locked. While an NFT is locked, it cannot be transferred or burned. A value of `0` means there is no current lock on the NFT.

## Actions and Usage

- This table does not contain explicit actions that directly modify its state. Interactions are typically done through other contract actions that have the authority to add, modify, or remove entries.
- The `locked_until_round` field is used to implement staking mechanisms, where an NFT is "locked" into a contract and cannot be transferred until a certain round or condition is met.
- The primary index, `asset_id`, ensures quick access and uniqueness for each NFT record.

## Table Updates

- Initialization and updates within this table require contract authority, usually called inline by other actions within the contract.
- The primary key, `asset_id`, is immutable once set, ensuring the integrity of each unique NFT within the table.

Maintaining consistent and up-to-date information regarding NFT ownership and lock status is crucial for the operation of the staking system and ensures proper tracking and handling of NFT assets.
