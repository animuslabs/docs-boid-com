# Deposits Table
This table is responsible for holding sponsorship deposits. Users can deposit funds into this bucket for sponsoring new accounts. Users can't withdraw so this encourages people to use their invites and enables you to gift invites to other accounts.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/deposits.ts)
\
Scope: `boid`
\
Index: `boid_id`
## Overview
```ts
class Deposits extends Table {
  // the boid_id that acts as a sponsor
  // account creation cost is paid when they sponsor a new account
  boid_id:Name
  // quantity of BOID (whole numbers only)
  boid_quantity:u32
}
```
