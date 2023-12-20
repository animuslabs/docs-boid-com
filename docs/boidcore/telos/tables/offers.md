# Offers Table Documentation

## Table: `offers`

### Overview
The `offers` table represents opportunities for participants to exchange assets or fulfill conditions to gain rewards. Authorization to create offers is exclusively held by the contract authority.

Participants, identified by `boid_id`, can claim offers subject to meeting specific requirements. Once claimed, the offer enforces certain actions and grants corresponding rewards until its limits are reached or it expires.

#### Table Structure
```ts
@table("offers")
export class Offer extends Table {
  constructor(
    public offer_id:u64,
    public requirements:OfferRequirements,
    public actions:OfferAction,
    public rewards:OfferRewards,
    public limits:OfferLimits,
    public total_claimed:u32
  ) {
    super();
  }

  @primary
  get primary():u64 {
    return u64(this.offer_id);
  }
}
```

#### Scope
`boid`

#### Primary Index
`offer_id`

### Table Updates

### Fields

#### `offer_id:u64`
- Uniquely identifies each offer.
- Assigned automatically during offer creation.

#### `requirements:OfferRequirements`
- Criteria to be met by `boid_id` for offer eligibility.

#### `actions:OfferAction`
- Obligatory conditions to be effected upon offer activation.

#### `rewards:OfferRewards`
- Benefits distributed upon successful offer activation.

#### `limits:OfferLimits`
- Constraints defining offer availability and expiration.

#### `total_claimed:u32`
- Counter incrementing with each claim, reflecting offer utilization.

### Sub-tables / Classes

#### `OfferRequirements`
Defines the minimum criteria for participation in an offer.

```ts
@packer
export class OfferRequirements {
  team_id:u8[] = [];  // Participant must belong to one of these teams.
  min_power:u16 = 0;  // Minimum participant power level to be eligible.
  min_balance:u32 = 0;  // Minimum account balance requirement.
  min_stake:u32 = 0;  // Minimum total (self + delegated) stake requirement.
  min_cumulative_team_contribution:u32 = 0;  // Minimum contribution to the participant's team.
}
```

#### `OfferAction`
Specified actions to be taken by the `boid_id` upon offer acceptance.

```ts
@packer
export class OfferAction {
  delegated_stake:u16 = 0;  // Stake allocation to the 'boid' system.
  stake_locked_additional_rounds:u16 = 0;  // Additional rounds to lock the delegated stake.
  nft_actions:NftAction[] = [];  // Array of NFT-related actions.
  balance_payment:u32 = 0;  // Payment in BOID to the system account.
}
```

#### `NftAction`
Details NFT-specific checks and actions to be processed within an offer action.

```ts
@packer
export class NftAction {
  collection_name:Name = EMPTY_NAME;  // Target collection.
  schema_name:Name = EMPTY_NAME;  // Target schema.
  template_id:i32 = 0;  // Target template ID.
  match_immutable_attributes:AtomicAttribute[] = [];  // Must match NFT's immutable attributes.
  match_mutable_attributes:AtomicAttribute[] = [];  // Must match NFT's mutable attributes.
  burn:bool = false;  // If true, burns the NFT.
  lock_rounds:u16 = 0;  // Locking duration for the NFT.
}
```

#### `OfferRewards`
Benefits provided upon offer activation.

```ts
@packer
export class OfferRewards {
  nft_mints:NftMint[] = [];  // Array of NFTs to be minted as part of the reward.
  balance_deposit:u32 = 0;  // BOID deposit into the claimant's balance.
  delegated_stake:u16 = 0;  // Delegated stake granted to the claimant.
  stake_locked_additional_rounds:u16 = 0;  // Additional staking lock period.
  activate_booster_ids:u8[] = [];  // IDs of boosters to activate for the claimant.
}
```

#### `NftMint`
Metadata specification for NFTs to be minted as part of rewards.

```ts
@packer
export class NftMint {
  mint_template_id:i32 = 0;  // Target template ID for minting.
  mint_schema_name:Name = EMPTY_NAME;  // Schema name for minting.
  mint_collection_name:Name = EMPTY_NAME;  // Collection name for minting.
  immutable_data:AtomicAttribute[] = [];  // Set of immutable attributes for the minted NFT.
  mutable_data:AtomicAttribute[] = [];  // Set of mutable attributes for the minted NFT.
  quantity:u8 = 0;  // Quantity of NFTs to mint.
}
```

#### `OfferLimits`
Tracks the offer's claim bounds and temporal validity.

```ts
@packer
export class OfferLimits {
  offer_quantity_remaining:u32 = 0;  // Remaining quantity of the offer claimable.
  available_until_round:u16 = 0;  // Round after which the offer expires.
}
```

### Examples
A sample offer with an additional staking obligation for 100 rounds, rewarding 5000 liquid BOID. Available 100 times until round 65000.

```ts
const offer1 = {
  requirements: {
    team_id: [],
    min_power: 0,
    min_balance: 0,
    min_stake: 0,
    min_cumulative_team_contribution: 0
  },
  actions: {
    delegated_stake: 1,
    stake_locked_additional_rounds: 100,
    nft_actions: [],
    balance_payment: 0
  },
  rewards: {
    nft_mints: [],
    balance_deposit: 5000,
    delegated_stake: 0,
    stake_locked_additional_rounds: 0,
    activate_booster_ids: []
  },
  limits: {
    offer_quantity_remaining: 100,
    available_until_round: 65000
  }
}
```

**Note:** Renaming adjustments have been reflected from "pwrmods" to "boosters" and "powermod_ids" to "booster_ids" to stay coherent with source code terminology. Ensure that the latest schema definitions and field names from source code are consistently mirrored in the documentation.
