# Config Table
The config table stores all the global configuration data. The table can only be updated by the contract authority.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/config.ts)
\
Scope: `boid`
\
Index: none (Singleton)

## Overview
```ts
class Config extends Table {
    account:ConfigAccount
    power:ConfigPower
    mint:ConfigMint
    team:ConfigTeam
    stake:ConfigStake
    time:ConfigTime
    auth:ConfigAuth
    nft:ConfigNft
    auto:ConfigAutoAdjust
    paused:boolean
    allow_deposits:boolean
    allow_withdrawals:boolean
}
```

## Breakdown

### `account:ConfigAccount`
All parameters relating to Boid Accounts
```ts
class ConfigAccount {
  // the cost to purchase an account (paid by a sponsor)
  purchase_price:u32
  // max number of owners that can be registered on an account
  max_owners:u8
  // max number of sponsors an account can hold
  max_sponsors:u8
  // max number of PowerMods an account can hold
  max_pwrmods:u8
  // When creating an account the new boid_id must have a suffix on this whitelist
  suffix_whitelist:string[]
  // The cost to "upgrade" an account which removes the sponsor from the account and may unlock other things
  remove_sponsor_price:u32
}
```
***

### `power:ConfigPower`
All parameters relating to Boid Power
```ts
class ConfigPower {
  // a static constant amount of power that decays each round. Subtracted from an account power during `power.claim`
  round_decay_constant:u16
  // The multiplier on the amount of power that decays for an account during `power.claim`
  // ex: an account with 100 power would lose 10 power after one round
  round_decay_mult:f32
  // multiplier on power that is diverted to an account sponsor when an invited account earns power
  // ex: 0.1 means 10% of power would be diverted to the sponsor
  sponsor_tax_mult:f32
  // multiplied by power to determined an account `max_powered_stake`
  powered_stake_mult:f32
  // exponent used when calculating `max_powered_stake` to make MPS easier or harder to reach depending on your power level
  powered_stake_pwr:f32
  // When claiming the maximum amount of rounds that can be counted.
  // ex: if max is 10 and you claim after 15 rounds you only get paid/decayed for 10 rounds.
  // This is to help prevent edge cases where an account goes for a long period of time without being claimed
  claim_maximum_elapsed_rounds:u16
}
```
example: [usage of powered_stake_pwr](https://github.com/animuslabs/boid-system-ts/blob/7156312416e9a55ca557e018bc7b0dca32bde53f/assembly/actions/5-power.ts#L128)
***
### `mint:ConfigMint`
Parameters relating to mint/inflation
```ts
class ConfigMint {
  // inflation from powered stake
  // poweredStakePayout = config.mint.round_powered_stake_mult * poweredStake * elapsedRounds
  round_powered_stake_mult:f32
  // determines inflation from boid power
  // boidPowerPayout = config.mint.round_power_mult * decayedPower * elapsedRounds
  round_power_mult:f32
}
```
***
### `team:ConfigTeam`
Parameters relating to team mechanics
```ts
class ConfigTeam {
  // minimum rounds an account must wait before changing teams
  change_min_rounds:u16
  //minimum rounds a team owner must wait before chaning teams
  edit_team_min_rounds:u16
  // maximum that team tax and owner cut can be adjusted (up or down) with each edit
  team_edit_max_pct_change:u16
  // BOID required to create a team
  buy_team_cost:u32
  // BOID stake required to create a team
  owner_stake_required:u32
  // owner must have some BOID stake locked for this amount of time
  owner_future_stake_lock_rounds_required:u16
}
```
***
### `stake:ConfigStake`
Parameters relating to staking
```ts
class ConfigStake {
  // how many rounds the user must wait before staked BOID can become liquid
  // ex: if unstake_rounds is 4 and the user calls unstake.init they can call unstake.end after 4 rounds to receive liquid BOID
  unstake_rounds:u8
  // extra_stake (aka delegated stake) when it is delegated must be locked (at least) a certain number of rounds in the future
  // after this future round, the delegated stake can be cancelled and returned the the owners normal self_staked bucket
  extra_stake_min_locked_rounds:u8
}
```
***

### `time:ConfigTime`
Parameters relating to time and rounds. These values should not ever be changed once the contract is live.
```ts
class ConfigTime {
  // round 0 starts at this time, should be the time when the contract is deployed on mainnet and should never be changed
  rounds_start:TimePoint
  // how many seconds each round should be. There is a maximum of 65000 rounds possible
  // before an overflow, so rounds should be at least 4 hours long.
  // all boid power and accounting is done in intervals of rounds so this value should never be changed after set on mainnet.
  round_length_sec:u32
}
```
***

### `auth:ConfigAuth`
Parameters related to key authentication
```ts
export class ConfigAuth {
  // actions must be whitelisted in order for key authentication to be used on that action
  key_actions_whitelist:Name[]
  // NOT IMPLEMENTED: in the future we might limit the stake/balance of accounts that don't have an owner account attached (key only accts)
  key_account_max_stake:u32
  // NOT IMPLEMENTED: in the future we might limit the stake/balance of accounts that don't have an owner account attached (key only accts)
  key_account_max_balance:u32
  // max number of keys that can be registered for authentication on a boid account
  account_max_keys:u8
  // NOT IMPLEMENTED: The idea is that workers that pass along actions for key accounts
  // could optionally bill the account to prevent spam.
  worker_max_bill_per_action:u32
}
```
***
### `nft:ConfigNft`
Parameters related to NFTs
```ts
class ConfigNft {
  // the max number of NFTS a boid_id can hold.
  // the reason for this is to prevent RAM abuse.
  boid_id_maximum_nfts:u16
}
```
***
### `auto:ConfigAutoAdjust`
Parameters related to auto inflation adjustments (not yet implemented)
```ts
class ConfigAutoAdjust {
  // for the auto adjust to change inflation based on stats data
  target_inflation_per_round:u32
  // max the round_power_mult may be adjusted each adjustment action
  power_mult_max_adjust:f32
  // max pct the round_powered_stake_mult may be adjusted each adjustment action
  powered_stake_mult_max_adjust:f32
  // how often can the adjust action be called to update inflation
  adjustment_interval_rounds:u16
}
```
***
### `paused:boolean`
Pauses the entire contract so all actions will fail unless authenticated by the contract auth
***
### `allow_deposits:boolean`
Used to disable deposits, this could be used during beta testing to prevent abuse.
***
### `allow_withdrawals:boolean`
Used to disable withdrawals, this could be used during beta testing to prevent abuse.

## Examples
This is an example config used during testing.
```ts
const config = {
  paused: false,
  account: {
    purchase_price: 1000,
    max_owners: 4,
    max_sponsors: 1,
    max_pwrmods: 4,
    suffix_whitelist: ["oid"],
    remove_sponsor_price: 100000
  },
  power: {
    round_decay_constant: 10,
    round_decay_mult: 0.05,
    sponsor_tax_mult: 0.1,
    powered_stake_mult: 1,
    powered_stake_pwr: 0.95, claim_maximum_elapsed_rounds: 10
  },
  mint: {
    round_powered_stake_mult: 0.3,
    round_power_mult: 0.09
  },
  team: {
    change_min_rounds: 42,
    edit_team_min_rounds: 48,
    team_edit_max_pct_change: 1,
    buy_team_cost: 5e6,
    owner_stake_required: 2e7,
    owner_future_stake_lock_rounds_required: 80
  },
  stake: {
    unstake_rounds: 24,
    extra_stake_min_locked_rounds: 12
  },
  time: {
    rounds_start: TimePoint.fromMilliseconds(28800000),
    round_length_sec: 28800
  },
  auth: {
    key_actions_whitelist: ["unstake.init", "unstake.end", "power.claim", "team.change", "stake", "account.edit"],
    key_account_max_stake: 500000,
    key_account_max_balance: 500000,
    account_max_keys: 6,
    worker_max_bill_per_action: 100
  },
  nft: { boid_id_maximum_nfts: 6 },
  auto: {
    target_inflation_per_round: 10000,
    power_mult_max_adjust: 1,
    powered_stake_mult_max_adjust: 1,
    adjustment_interval_rounds: 1
  },
  allow_deposits: true,
  allow_withdrawals: true
}
```

