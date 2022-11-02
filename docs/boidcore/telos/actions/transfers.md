# Transfer actions
Actions related to token transfers

## `withdraw`
Withdraw BOID tokens from a liquid balance to a native account

**Input Parameters**
```ts
// target boid account
boid_id:Name
// whole quantity of BOID to withdraw
quantity:u32
// native account to receive tokens
to:Name
```
**Authentication**\
requires owner authority of boid account

**Validation**
- quantity must be equal or less than the `account.balance`

**Table Updates**
- `account.balance` is decremented
- `global.total_liquid_balance` is decremented

**Inline Actions**
triggers BOID transfer from `boid` to the `to` account

## `internalxfer`
for sending BOID between boid account liquid balances

**Input Parameters**
```ts
// BOID owner
from_boid_id:Name
// receiver
to_boid_id:Name
// whole quantity of BOID
quantity:u32
// arbitrary string message
memo:string
```
**Authentication**\
requires contract or `from_boid_id` owner auth

**Validation**
- quantity must be greater than zero
- quantity must be less than or equal to `from_boid_id` balance

**Table Updates**
- `from_boid_id` account balance is decremented
- `to_boid_id` account balance is incremented
