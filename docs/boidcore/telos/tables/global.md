```markdown
# Global Table Update
The global table now maintains a concise set of values crucial for system-wide data such as chain-level replay protection and total power accounting. Updates to this table are performed by authorized actions that are designed to keep the data consistent and accurate.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/global.ts)
\
Scope: `boid`
\
Index: none (Singleton)

## Overview
```ts
import { EMPTY_NAME, Name, Table } from "proton-tsc"

@table("global", singleton)
export class Global extends Table {
  constructor(
    // unique identifier for transaction replay protection
    public chain_name: Name = EMPTY_NAME,
    // cumulative power across all accounts
    public total_power: u64 = 0,
    // round number when the last inflation adjustment occurred
    public last_inflation_adjust_round: u16 = 0
  ) {
    super()
  }
}
```

## Table Updates
- `chain_name` ([`Name`](https://github.com/eosio/proton-tsc/blob/master/src/name.ts)): Introduced as a unique identifier for the transaction to ensure replay protection across different chains.
- `total_power` (`u64`): Updated to represent the total Boid Power of all accounts collectively. Values affecting the total power trigger updates to this field.
- `last_inflation_adjust_round` (`u16`): Added to track the round number of the last auto inflation adjustment. This field is used to determine when to apply the next inflation-related changes.

**Note:** Fields such as `total_accounts`, `total_liquid_balance`, and `total_stake`, as well as placeholders for unimplemented actions like `last_rebalance_round` have been removed from the table. The `total_power` field now concentrates on tracking the power of Boid accounts only.

`requires contract authority`: These changes to the Global table require privileged access and are usually executed inline by contract actions to maintain system integrity and avoid unauthorized alterations.
```
