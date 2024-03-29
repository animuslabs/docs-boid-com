# Power Actions

Comprehensive documentation for `PowerActions` smart contract related to Boid Power management in the Proton blockchain. This contract handles the operations of power addition, sponsorship, history updates, and power claims.

## `logpwrclaim`

Logs the details of a power claim transaction, including changes in power rating and mint actions.

**Input Parameters**

```ts
boid_id: Name                           // Target Boid account
power: PowerClaimLog                    // Data related to Power changes
mint: MintLog                           // Data related to tokens minted
```

**Authentication**
requires contract authority, usually called inline by other actions

**Table Updates**
None directly; this is a log action.

## `logpwradd`

Logs information when power is added to an account, detailing the source of the power, whether it was multiplied by boosters, and if any power was diverted to a sponsor.

**Input Parameters**

```ts
boid_id: Name                           // Target Boid account
received: u16                           // The original amount of power received
generated_from_mult_booster: u16        // Power added from multiplier boosters
diverted_to_sponsor: u16                // Power diverted to sponsor
power_received: u16                     // Amount of power the account actually earned
orign: Name                             // The origin of power, to differentiate between normal addition and sponsorship
```

**Authentication**
requires contract authority, usually called inline by other actions

**Table Updates**
None directly; this is a log action.

## `power.add`

Adds power to a Boid account, subject to various multipliers and taxes. Sponsors can receive a share of the power, and history is updated.

**Input Parameters**

```ts
boid_id: Name                           // Target Boid account
power: u16                              // Quantity of power to add
```

**Authentication**
requires contract authority

**Validation**

- Target `boid_id` must not be the system account
- Added `power` must be positive and within acceptable range
- Track and enforce caps on maximum Boid power and team power constraints

**Table Updates**

- Updates power rating for Boid account: `Account.power.rating`
- Applies power to the sponsor (if applicable)
- Updates team power: `Team.power`
- Updates global total power: `Global.total_power`

**Remarks**

- Power added is enhanced by any boosters (`AccountBooster`) associated with the account
- The internal method `sendLogPwrAdd` is invoked to fire off a `logpwradd` action for logging

## `power.claim`

Updates Boid Power on an account and mints BOID tokens based on updated power levels. Tokens may be distributed to the account's team and leader. Power generated by boosters is also considered.

**Input Parameters**

```ts
boid_id: Name                           // Target Boid account
```

**Authentication**
does not require authentication, any account can initiate a claim

**Validation**

- Can only claim once per round
- Target `boid_id` must not be the system account

**Table Updates**

- Updates account data, including power and stake: `Account`
- Updates team power: `Team`
- Updates global data: `Global`
- Minted tokens due to overstake are attributed to the system account

**Remarks**

- Triggers a `transfer` action from `mint.boid` to `stake.boid` for token movements
- The `logpwrclaim` inline action is called to record claim details

**Inline Actions**
The `power.claim` action results in inline actions that facilitate token transfers and logging:

1. `token.boid` - Transfer action to move minted tokens.
2. `logpwrclaim` - Logging action that records the power claim details.

