# Stake Actions
Actions relating to BOID stake

## `stake`
Moves BOID tokens from balance to self_stake bucket

**Input Parameters**
```ts
// target boid account
boid_id:Name
// quantity of BOID to stake
quantity:u32
```
**Authentication**\
contract or `boid_id` auth required

**Validation**
- quantity must be less than or equal to current `account.balance`
- quantity must be greater than zero

**Table Updates**
- updates global table by reducing the `global.total_liquid_balance` and increasing `global.total_stake` by quantity
- updates user account by subtracting `account.balance` and increasing `account.stake.self_staked` by quantity

**Inline Actions**\
initiates a transfer of `quantity` of BOID from the system contract to `stake.boid`

## `stake.deleg`
Delegate stake by moving it from your self_staked bucket to the dedicated `stakes` table. Delegating enables you to specify another boid account that should receive the benefit of your stake while the owner account still retains ownership. Additionally delegating staked BOID unlocks the ability to lock tokens until some round in the future. This enables very long lockup periods for specific benefits as well as increased security(self delegation is allowed). Delegated stakes have a special limitation in that they must be specified in units of 10k BOID, this reduces RAM costs and helps to prevent spam.

**Input Parameters**
```ts
// the boid account that owns the stake
from_boid_id:Name
// the boid account to receive the delegation
to_boid_id:Name
// the quantity to stake in 10k BOID units
stake_quantity:u16
// the round in the future when the stake becomes unstakable
lock_until_round:u16
```
**Authentication**\
requires contract or `from_boid_id` auth

**Validation**
- `from_boid_id` must hold enough BOID in their `self_staked` bucket
- `lock_until_round` must be greater than the minimum delegated stake length defined in `config.stake.extra_stake_min_locked_rounds`

**Table Updates**
- `from_boid_id` boid account `stake.self_staked` is reduced by `quantity` * 10000
- `to_boid_id` boid account `stake.received_delegated_stake` is incremented by `quantity`

## `unstke.deleg`
Returns a delegated stake back to the `self_stake` bucket. Delegated stake can't be unstaked if it's still locked, but can remain staked as long as the owner desires.

**Input Parameters**
```ts
// The stake id from the stakes table
stake_id:u64
```
**Authentication**\
requires contract or `stake.from_boid_id` auth

**Validation**\
`stake.locked_until_round` must be in the past

**Table Updates**
- Updates the `account` row of `stake.from_boid_id` by adding the stake back to their `account.stake.self_staked` bucket
- Updates the `account` row of `stake.to_boid_id` by subtracting the stake from their `account.stake.received_delegated_stake` bucket
- removes the target delegated stake row from the `stakes` table

## `unstake.init`
Start the process of unstaking, which moves tokens from `self_staked` to `balance` after a delay. During the delay the tokens are still counted as staked.

**Input Parameters**
```ts
// target boid account
boid_id:Name
// the BOID quantity to start unstaking
quantity:u32
```
**Authentication**\
Requires contract auth or `boid_id`

**Validation**
- `quantity` must be equal or less than the `account.stake.self_stake`
- pending unstake must not already be in process
-

**Table Updates**\
add quantity and unlock round data to `account.stake.unstaking`


## `unstake.stop`
Cancels 'unstake' currently in progress

**Input Parameters**
```ts
// target boid account
boid_id:Name
```
**Authentication**\
requires contract or boid account auth

**Validation**\
must have an entry in `account.stake.unstaking` to remove

**Table Updates**\
makes `account.stake.unstaking` empty

## `unstake.end`
moves unstaking funds back into the liquid balance

**Input Parameters**
```ts
// target boid account
boid_id:Name
```
**Authentication**\
no authorization required

**Validation**
- account must have a pending unstake
- pending unstake must be past unlock round

**Table Updates**
- increment `account.balance` and decrement `account.stake.self_staked` by the unstake quantity
- remove the `account.stake.unstaking` data from the account row
- update the `global` table

**Inline Actions**\
trigger BOID token transfer from `stake.boid` to `boid`

<!-- ## `action.name`


**Input Parameters**
```ts

```
**Authentication**\


**Validation**


**Table Updates**\ -->
