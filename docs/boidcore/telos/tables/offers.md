# Offers Table
The Offers table enables exchange of things for other things. Offers can only be registered by the contract authority but any boid_id can take advantage of an offer as long as they fit the offer requirements.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/offers.ts)
\
Scope: `boid`
\
Index: `offer_id`
## Overview
```ts
export class Offer extends Table {
 offer_id:u64
 requirements:OfferRequirements
 actions:OfferAction
 rewards:OfferRewards
 limits:OfferLimits
 total_claimed:u32
  @primary
  get primary():u64 {
    return u64(this.offer_id)
  }
}
```

## Breakdown
### `offer_id:u64`
The Offer_id is just an identifier, the contract automatically assigns an offer_id when they are added.
***
### `requirements:OfferRequirements`
The minimum requirements that the boid_id must meet in order to utilize the offer
```ts
class OfferRequirements {
  // the boid_id must be on one of the teams in the list
  // if the list is empty then members of any team can use the offer
  team_id:u16[]
  // the minimum boid power the user must have to activate the offer
  min_power:u16
  // the minimum balance the boid_id must hold
  min_balance:u32
  // the minimum stake (self_stake + delegated)
  min_stake:u32
  // the minimum contribution to their current team they must have (tracked in account.team)
  min_cumulative_team_contribution:u32
}
```
***
### `actions:OfferAction`
These are actions the boid_id must perform when activating the offer
```ts
export class OfferAction {
  // activating the offer will trigger the account to create
  // a delegated stake to the main `boid` system account
  delegated_stake:u16
  // How many rounds should the delegated stake be locked ( stacks on top of the minimum lock rounds)
  stake_locked_additional_rounds:u16
  // nft actions to perform like staking or burning a specific NFT
  nft_actions:NftAction[]
  // liquid BOID to be paid, payments go to the system account
  balance_payment:u32
}
```
The NFT action object is used to check to make sure the NFT matches the requirements and then perform some action
```ts
class NftAction {
  // The atomicassets collection_name
  collection_name:Name
  // the atomicassets schema_name
  schema_name:Name
  // the atomicassets template_id
  template_id:i32
  // atomicassets attributes which must match the avatar immutable_attributes
  match_immutable_attributes:AtomicAttribute[]
  // atomicassets attributes which must match the avatar mutable_attributes
  match_mutable_attributes:AtomicAttribute[]
  // the target NFT should be burned
  burn:bool = false
  // the target NFT should be locked for this many rounds
  lock_rounds:u16
}
```
***
### `rewards:OfferRewards`
When activated the offer will provide some rewards
```ts
class OfferRewards {
  // a list of metadata of NFTs to mint
  nft_mints:NftMint[]
  // deposit BOID into the acitvating accounts liquid balance
  // the BOID is paid from the boid system account
  balance_deposit:u32
  // stake is delegated to the activating account from the boid system account
  delegated_stake:u16
  // additional rounds to lock the delegated stake over the minimum
  stake_locked_additional_rounds:u16
  // powermod_ids to apply to the activating account
  activate_powermod_ids:u8[]
}
```
AtomicAsets metadata about the NFT to be minted
```ts
class NftMint {
  mint_template_id:i32
  mint_schema_name:Name
  mint_collection_name:Name
  immutable_data:AtomicAttribute[]
  mutable_data:AtomicAttribute[]
  quantity:u8
}
```
### `limits:OfferLimits`
This tracks the limits of the offer
```ts
class OfferLimits {
  // quantiy of the offer remaining, decrements 1 each time it is claimed
  // when it reaches 0 then the offer is no longer available
  offer_quantity_remaining:u32
  // round in the future when the offer will expire
  // On this round the offer is no longer available
  available_until_round:u16
}
```
### `total_claimed:u32`
Incremenets 1 each time the offer is claimed

## Examples
This offer requires 1 (10,000 BOID) delegated stake to be locked for an additional 100 rounds. In exchange the account received 5000 liquid BOID. There is only 100 offers available.
```ts
const offer1 = {
  requirements: { team_id: [], min_power: 0, min_balance: 0, min_stake: 0, min_cumulative_team_contribution: 0 },
  actions: { delegated_stake: 1, stake_locked_additional_rounds: 100, nft_actions: [], balance_payment: 0 },
  rewards: { nft_mints: [], balance_deposit: 5000, delegated_stake: 0, stake_locked_additional_rounds: 0, activate_powermod_ids: [] },
  limits: { offer_quantity_remaining: 100, available_until_round: 65000 }
}
```
