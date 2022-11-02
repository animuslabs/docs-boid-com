# Accounts Table
Every Boid user needs a row in the accounts table. The accounts table reserves a unique boid_id, tracks power, staking, authentication, team and any other unique elements about a boid user. Many users could use Boid entirely using only their Boid Account + the built in key authentication without any need for a native chain account (however it's easy for them to attach a native account when ready).

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/accounts.ts)
\
Scope: `boid`
\
Index: `boid_id`


## Table Structure

```js
class Account extends Table {
  boid_id:Name
  owners:Name[]
  auth:AccountAuth
  sponsors:Name[]
  stake:AccountStake
  power:AccountPower
  team:AccountTeam
  social_ipfs_json:string
  balance:u32
  nft_balance:u16
  @primary
  get primary():u64{
    return this.boid_id.value
  }
}
```
## Breakdown
### `boid_id:Name`
System admin can define an arbitrary name but users must follow rules when buying an account such as using a whitelisted suffix. Ex: if .oid is a whitelisted suffix then users must specify acctname.oid when creating a boid account.
***
### `owners:Name[]`
The owners are native chain accounts that can authorize actions on behalf of this boid account. Owner accounts can only be added/removed by other Owners on the account.
***
### `sponsors:Name[]`
An array of boid_ids that sponsored the creation of the account. When the Boid Power is applied to the boid account some percent is shared with the sponsors. Usually the account just has one. When the account is upgraded the sponsor is removed.
***
### `auth:AccountAuth`
Stores data used for key based authentication for the boid account. Account keys can be used to authenticate most actions on the account.
```js
class AccountAuth {
  // Pubkeys that can be used to control this boid account.
  keys:PublicKey[]
  // Number incremented by the auth action when a pubkey is used. Necessary to prevent transaction replays.
  nonce:u32
}
```
***
### `stake:AccountStake`
Contains all data related to the stake associated with this account.
```js
class AccountStake {
  // Contains one entry when tokens are being unstaked, empty otherwise.
  unstaking:TokenUnstake[]
  // Whole BOID quality staked to the account, BOID
  // earned from power claiming is also added here.
  self_staked:u32
  // Stake delegated to this account (could be self delegated also) delegated
  // stakes are counted in incremenets of 10k so 1 delgated stake means 10k BOID.
  // this is to save RAM and help prevent spam
  received_delegated_stake:u16

}
```
TokenUnstake is created when calling `unstake.init` and then removed after calling `unstake.end`
```js
class TokenUnstake[] {
// After this round the unstake.end action can be called
// to reclaim the unstaking BOID back to the liquid balance
redeemable_after_round:u16
// the whole amount of BOID being unstaked
quantity:u32
}
```
***
### `power:AccountPower`
Stores all data relevant to the account Boid Power.
```ts
class AccountPower {
  // the last round power was claimed for this account
  last_claimed_round:u16
  // the current power rating of the account
  // updated during power.add and power.claim
  rating:u16
  // Power Mods installed on the account
  mods:AccountPowerMod[]
}
```
AccountPowerMod is added to an account when they activate a PowerMod.
```ts
class AccountPowerMod {
  // multiplies power received, divided by 200
  pwr_multiplier:u8
  // the amount of power this mod generates each round
  pwr_add_per_round:u16
  // the round when the mod will expire and no longer do anything
  expires_round:u16
  // when power is claimed with an active PowerMod the aggregate remaining is decremented.
  // the mod will no longer work when the value reaches zero
  aggregate_pwr_remaining:u32
}
```
***

### `team:AccountTeam`

Holds all data relevant to the Boid Account team membership
```ts
class AccountTeam {
  // user is on this team, from teams table
  team_id:u16
  // used to track when was the last time the team or tax_pct was changed
  last_edit_round:u16
  // percent of account earnings which are paid to the team, calculated by
  team_tax_pct:u8
  // cumulative amount the account has sent to their current team, resets on team change
  team_cumulative_contribution:u32
}
```
***
### `social_ipfs_json:string`
An IPFS hash pointing to a JSON document that contains arbitrary social media data about the user like profile information. This data is only used for the UI.
***
### `balance:u32`
The BOID balance of the account, whole number only. When user stakes the BOID is moved from `balance` to `account.stake.self_staked`
***
### `nft_balance:u16`
The number of NFTs the account is holding. Used to track and limit RAM abuse from accounts spamming too many NFT deposits.
***
## Examples

This account has 878 BOID self staked, no keys registered, has contributed 22 to their team(0). The account last called `power.claim` on round 1.

```ts
    {
      "boid_id": "john",
      "owners": [
        "imjohnatboid"
      ],
      "auth": {
        "keys": [],
        "nonce": 0
      },
      "sponsors": [],
      "stake": {
        "unstaking": [],
        "self_staked": 878,
        "received_delegated_stake": 0
      },
      "power": {
        "last_claimed_round": 1,
        "rating": 0,
        "mods": []
      },
      "team": {
        "team_id": 0,
        "last_edit_round": 0,
        "team_tax_pct": 0,
        "team_cumulative_contribution": 22
      },
      "social_ipfs_json": "",
      "balance": 0,
      "nft_balance": 0
    },
```
