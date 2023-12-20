# Stake Actions

Instructions pertaining to the management of stakes including staking BOID tokens, unstaking, and handling stake delegation.

## `stake`
Transfers BOID tokens from a user's internal account balance to their staked balance.

**Input Parameters**
```ts
boid_id: Name, // Staker's BOID account name
quantity: u64   // Amount of BOID tokens to stake
```

**Authentication**
- The action must be authorized by the contract or the `boid_id` account.

**Validation**
- `quantity` should be greater than zero.

**Table Updates**
- Deducts `quantity` from `account.balance`
- Increment `account.stake.self_staked` by `quantity`

**Inline Actions**
- Transfers BOID tokens equivalent to `quantity` to `stake.boid` with a memo indicating staking.

## `stake.deleg`
Facilitates the delegation of a stake to another account, potentially with a stake lock until a specified round.

**Input Parameters**
```ts
from_boid_id: Name,     // Delegating account's BOID name
to_boid_id: Name,       // Recipient account's BOID name
stake_quantity: u64,    // Amount of BOID tokens to delegate
lock_until_round: u32   // Round number until which stake is locked
```

**Authentication**
- The action requires the authorization of the contract or the delegating `from_boid_id`.

**Validation**
- The `from_boid_id` must have sufficient BOID in `self_staked`.
- The `lock_until_round` must be set beyond the current round by at least the minimum lock duration configured.

**Table Updates**
- Adjusts `account.stake.self_staked` and `account.stake.received_delegated_stake` by the delegated amount.

## `unstke.deleg`
Returns delegated BOID tokens from the `stakes` table to the delegator's `self_stake`.

**Input Parameters**
```ts
stake_id: u64 // Unique ID for the delegated stake
```

**Authentication**
- Requires authorization from the contract or the `stake.from_boid_id`.

**Validation**
- Unstaking can only occur after the stake lock period has ended.

**Table Updates**
- Reinstates `account.stake.self_staked`
- Reduces `account.stake.received_delegated_stake`
- Removes the entry for the delegated stake.

## `unstake.init`
Begins the unstaking process, scheduling the transfer of tokens from `self_staked` to the user's balance.

**Input Parameters**
```ts
boid_id: Name, // Staker's BOID account name
quantity: u64   // Amount of BOID tokens to unstake
```

**Authentication**
- Authorized by the contract or the `boid_id`.

**Validation**
- `quantity` must not be more than the available `self_staked` amount.
- There should be no ongoing unstaking process for the account.

**Table Updates**
- Records an entry in `account.stake.unstaking` for the pending unstake.

## `unstake.stop`
Aborts an active unstaking operation.

**Input Parameters**
```ts
boid_id: Name // Staker's BOID account name
```

**Authentication**
- Authorized by the contract or the `boid_id`.

**Validation**
- An unstaking process should currently be in progress to be cancelled.

**Table Updates**
- Clears the `account.stake.unstaking` process.

## `unstake.end`
Concludes the unstaking process by transferring funds from `self_staked` to the user's available balance.

**Input Parameters**
```ts
boid_id: Name // Staker's BOID account name
```

**Authentication**
- No authentication is enforced by the code.

**Validation**
- An unstaking invoking is required that has passed its release round.

**Table Updates**
- Increases `account.balance`
- Decreases `account.stake.self_staked`
- Removes the pending unstaking entry `account.stake.unstaking`

**Inline Actions**
- Processes BOID token transfers from `stake.boid` to the requestor.

## `withdraw`
Withdraws BOID tokens from a BOID account to an external address on the Proton blockchain.

**Input Parameters**
```ts
boid_id: Name,   // Originating BOID account name
quantity: u64,   // Token amount to withdraw
to: ChainAccount // Destination Proton chain account
```

**Authentication**
- Action must be authorized by the owner of `boid_id`.

**Validation**
- `quantity` should not surpass the withdrawable account balance.

**Inline Actions**
- Directly transfers BOID tokens to the specified external account.

## `internalxfer`
Executes an internal transfer of BOID tokens from the sender to the recipient within the ecosystem.

**Input Parameters**
```ts
from_boid_id: Name, // Sending account's BOID name
to_boid_id: Name,   // Receiving account's BOID name
quantity: u64,      // Token quantity for the transfer
memo: string        // Memo text for the transfer
```

**Authentication**
- Required from the `from_boid_id` owner.

**Validation**
- `from_boid_id` must not match `to_boid_id`, and `quantity` has to be positive.

**Table Updates**
- Updates `from_boid_id` and `to_boid_id` balances as per the transfer amount.


