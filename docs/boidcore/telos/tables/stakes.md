# Stakes Table
This table holds delegated stakes. Delegated stakes are always from one boid account to another (self delegated stake is also possible). Delegated stakes are always in 10k BOID increments to save RAM and help prevent abuse.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/stakes.ts)
\
Scope: `boid`
\
Index: `stake_id`
\
Index2: `from_boid_id`
## Overview
```ts
class Stake extends Table {
  // unique identifier, set automatically by the contract
  stake_id:u64
  // the delegator that owns the staked tokens
  from_boid_id:Name
  // the delegate that receives the delegated stake
  to_boid_id:Name
  // the quantity of BOID staked in 10k incremenets (1 = 10k BOID)
  stake_quantity:u16 = 0,
  // the round after which the tokens could be unstaked
  locked_until_round:u16 = 0
}
```
