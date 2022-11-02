# NFT Actions
Actions related to NFTs

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/11-nft.ts)

## `nft.lock`
Locks an NFT until some future round

**Input Parameters**
```ts
// the target boid account
boid_id:Name
// the asset to lock
asset_id:u64
// the round in the future when the NFT is unlocked
locked_until_round:u16

```
**Authentication**\
contract authentication or nft owner boid account

**Validation**
- `locked_until_round` must be a round in the future
- can't lock an NFT which is already locked
- can't lock an NFT for more than 200 rounds in the future

**Table Updates**\
Updates the `locked_until_round` parameter on the row of the nft asset in the`nft` table under the scope of the `boid_id` owner.

> This action is mostly for when the user wants to activate an offer that requires staking NFTs. Additionally you could lock your NFTs in your account for security reasons.

## `nft.xfer`
For transfering NFTs between boid accounts. This is mostly for convenience for users that want to make basic transfers without withdrawing first.

**Input Parameters**
```ts
// the boid account that owns the NFT to transfer
from_boid_id:Name
// the boid account to receive the NFT
to_boid_id:Name
// a vector of atomicasset asset_ids
asset_ids:u64[]
```
**Authentication**\
Requires owner authentication of `from_boid_id`

**Validation**
- 30 NFTs limit on transfer
- `from_boid_id` must own the asset_ids
- `to_boid_id` `account.nft_balance` must not not exceed the `config.nft.boid_id_maximum_nfts`


**Table Updates**
- row(s) removed from `nft` table under `from_boid_id` scope
- row(s) added to `nft` table under `to_boid_id` scope
- `from_boid_id` `account.nft.balance` decremented for each NFT removed
- `to_boid_id` `account.nft.balance` incremented for each NFT added

## `nft.withdraw`
Withdraws an NFT held by a boid account from the `boid` system contract to their owner account.

**Input Parameters**
```ts
// the NFT owner boid account
boid_id:Name
// vector of atomicasset ids to transfer
asset_ids:u64[]
// the owner account to receive the NFTs
to:Name
```

**Authentication**
- owner authentication of the owner boid account
- chain authentication of the `to` account
> This means you can only withdraw to your own owner account\
> possibly we could remove the owner auth requirement

**Validation**
- `asset_ids` must be owned by `boid_id`

**Table Updates**
- row(s) removed from `nft` table under `boid_id` scope
- decrements `account.nft_balance` of the owner boid account for each NFT withdrawn

<!-- ## `action.name`

**Input Parameters**
```ts

```
**Authentication**\

**Validation**


**Table Updates**\ -->
