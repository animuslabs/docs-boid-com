# NFT Actions
Documentation regarding actions related to NFT management, specifically for minting, locking, transferring, and withdrawing NFTs within the boid blockchain environment.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/11-nft.ts)

## `doMintAsset`
Mints atomicasset NFTs to a designated receiver boid account.

**Input Parameters**

```ts
// the receiver boid account
receiver: Account
// data for minted asset
data: MintAsset
// quantity of assets to mint
mint_quantity: u16
```

**Logic**
Executes the `mintasset` action on the atomicassets contract for the specified mint quantity.

## `nft.lock`
Locks an NFT within a boid account until a specified future round.

**Input Parameters**

```ts
// the boid account owner of the NFT
boid_id: Name
// the asset to be locked
asset_id: u64
// future round when the NFT unlocks
locked_until_round: u16
```

**Authentication**
Requires either contract authority or owner boid account authority.

**Validation**

- `locked_until_round` must be set to a future game round.
- NFT must not already be locked.
- NFTs cannot be locked for more than 200 future rounds.

**Table Updates**
Updates the `locked_until_round` field in the `nfts` table.

> Used to stake NFTs for offers or for safeguarding assets within an account.

## `nft.xfer`
Transfers NFTs between two boid accounts, provided they are unlocked.

**Input Parameters**

```ts
// originating boid account owning the NFTs
from_boid_id: Name
// destination boid account to receive the NFTs
to_boid_id: Name
// array of asset_ids to be transferred
asset_ids: u64[]
```

**Authentication**
Requires authentication of the owner boid account (`from_boid_id`).

**Validation**

- Transfer is limited to below the maximum NFTs set in configuration (30 NFTs by default).
- NFTs must be owned by `from_boid_id` and not locked.
- `to_boid_id`'s total NFTs must not exceed the maximum allowable value post-transfer.

**Table Updates**

- Removes NFT rows under `from_boid_id` scope in the `nfts` table.
- Adds NFT rows under `to_boid_id` scope in the `nfts` table.
- Updates NFT balances for both `from_boid_id` and `to_boid_id` accounting for the transferred assets.

## `nft.withdraw`
Enables the withdrawal of an NFT from a boid account to an EOSIO blockchain account, ensuring the asset is not locked.

**Input Parameters**

```ts
// boid account holding the NFT
boid_id: Name
// array of asset_ids to be withdrawn
asset_ids: u64[]
// blockchain account to receive the NFTs
to: Name
```

**Authentication**
Requires authenticated authority from the boid account owner.

**Validation**

- NFTs identified by `asset_ids` must be owned by boid account `boid_id`.

**Table Updates**

- Removes rows from the `nfts` table pertaining to the `boid_id` in question.
- Decreases the `nft_balance` of the boid account in `accounts` table for each NFT withdrawn.

## `nftReceiver`
Sets the receiver account for receiving minted NFTs.

**Authentication**
requires contract authority

**Table Updates**
Inserts or updates an `nftmints` table singleton record indicating the boid account allowed to receive new NFT mints.

## `logMint`
Picks up minting logs and allocates minted NFTs to the proper boid account per configuration settings.

**Authentication**
Requires contract authority, called as a notification from another action.

**Table Updates**
Reduces the `mint_quantity_remaining` in the `nftmints` singleton and adds NFT ownership entries in the `nfts` table for the receiver account.
