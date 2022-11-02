# Stats Table
The stats table is updated automatically by the contract during normal actions like power,minting,account creation. Rows in the stats table are based on rounds so over time new rows are added for each round with activity. In the future these stats rows can be used for automatic inflation adjustment, by looking at average values over time and calculating current inflation. These rows can also be used for quickly visualizing recent stats. There is an action that can be called to cleanup the table of old rows to prevent RAM waste.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/stakes.ts)
\
Scope: `boid`
\
Index: `round`
## Overview
```ts
export class Stats extends Table {
  // the round when the stats table was recorded, new rows added for each new round
  round:u16
  // total cumulative power added this round
  power_added:u32
  // total BOID minted this round
  boid_generated:u32
  // accounts created this round
  accounts_created:u32
  @primary
  get primary():u64 {
    return u64(this.round)
  }
}
```
