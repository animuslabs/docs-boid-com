# Global Table
The global table tracks the total quantities of values like boid power and staked/liquid balances. Actions that modify this data have logic to update this table to ensure it's always synchronized.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/global.ts)
\
Scope: `boid`
\
Index: none (Singleton)

## Overview
```ts
class Global extends Table {
  // total number of registered boid accounts
  total_accounts:u64
  // total Boid Power of all accounts
  total_power:u64
  // total liquid balance of all accounts
  total_liquid_balance:u64
  // total stake of all accounts
  total_stake:u64
  // last time the rebalance action was called (NOT IMPLEMENTED)
  last_rebalance_round:u16
  // last time the auto inflation adjustment was called (NOT IMPLEMENTED)
  last_inflation_adjust_round:u16
}
```
