# Accounts Table

The `accounts` table acts as a central registry for every user participating within the Boid ecosystem. It keeps track of user identities (`boid_id`), authentication (`auth`), staking information (`stake`), Boid Power (`power`), team memberships (`team`), and balances (`balance` and `nft_balance`). Users can engage with the Boid platform primarily through their Boid accounts, as it facilitates the entire user experience from staking to power management.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/accounts.ts)

Scope: `boid`
Index: `boid_id`

## Table Structure

```ts
class Account extends Table {
  boid_id: Name
  owners: Name[]
  auth: AccountAuth
  sponsors: Name[]
  stake: AccountStake
  power: AccountPower
  team: AccountTeam
  balance: u32
  nft_balance: u16

  @primary
  get primary(): u64 {
    return this.boid_id.value
  }
}
```

## Breakdown

### `boid_id: Name`
A unique identifier for the Boid account. System administrators may set arbitrary names, while users must adhere to specific naming conventions, such as a whitelisted suffix (e.g., `.oid`).

### `owners: Name[]`
Native chain accounts capable of authorizing actions on behalf of the Boid account. Modifications to this property are strictly regulated and can only be performed by current owners.

### `auth: AccountAuth`
Contains public keys and a nonce for key-based control of the Boid account.

```ts
class AccountAuth {
  keys: PublicKey[] // Public keys for account management.
  nonce: u8 // Incremented on key use to prevent transaction replays.
}
```

### `sponsors: Name[]`
Boid account IDs that sponsored the account creation, receiving a portion of applied Boid Power. Sponsorship is typically singular and is removed when the account is upgraded.

### `stake: AccountStake`
Encapsulates all staking-related data for the account.

```ts
class AccountStake {
  unstaking: TokenUnstake[]
  self_staked: u32
  received_delegated_stake: u16
}
```

`TokenUnstake` represents BOID tokens in the process of unstaking, cleared post-unstake completion.

```ts
class TokenUnstake {
  redeemable_after_round: u16
  quantity: u32
}
```

### `power: AccountPower`
Stores information pertinent to the Boid Power of the account, comprising of a power rating, historical data, and boosters which enhance power generation/accumulation.

```ts
class AccountPower {
  last_claimed_round: u16
  rating: u32
  history: u16[]
  mods: AccountBooster[]
}
```

Boosters (`AccountBooster`) provide account power enhancements upon activation.

```ts
class AccountBooster {
  pwr_multiplier: u8
  pwr_add_per_round: u16
  expires_round: u16
  aggregate_pwr_remaining: u32
}
```

### `team: AccountTeam`
Details the account's team affiliation and related contributions.

```ts
class AccountTeam {
  team_id: u8
  last_edit_round: u16
  team_tax_mult: u8
  team_cumulative_contribution: u32
}
```

### `balance: u32`
Reflects the current liquid BOID balance of the account.

### `nft_balance: u16`
Number of NFTs held by the account; this count assists in preventing RAM abuse.

## Examples

Example of a minimalistic account entry:

```ts
{
  "boid_id": "john",
  "owners": ["imjohnatboid"],
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
  "balance": 0,
  "nft_balance": 0
}
```
