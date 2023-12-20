# Sponsor Table Documentation

This table is designed to track data related to sponsors in the Boid network. Sponsors are individuals or entities that invite new users to the network and can earn uprades for sponsored accounts.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/sponsors.ts)

Scope: `boid`
\
Index: `sponsor_boid_id`

## Overview

```ts
@table("sponsors")
class Sponsor extends Table {
  // Unique Boid ID for the sponsor
  sponsor_boid_id: Name
  // Balance of unused invitation codes
  invites_balance: u16
  // Count of unclaimed invite codes
  invite_codes_unclaimed: u16
  // Count of claimed invite codes
  invite_codes_claimed: u32
  // Number of upgrades triggered by the sponsor
  sponsored_upgrades: u32
  // Total earned from upgrades by the sponsor
  upgrades_total_earned: u32
}
```

Each sponsor has an associated `sponsor_boid_id` which is used as a primary index in the table. The `invites_balance` keeps track of how many invites a sponsor has left, encouraging them to invite more users. The `invite_codes_unclaimed` and `invite_codes_claimed` help track the status of invite codes, ensuring that sponsors follow up with potential invitees. Finally, `sponsored_upgrades` and `upgrades_total_earned` are counters for keeping track of the upgrades the sponsor has initiated, and the total amount earned from these upgrades respectively.

## Table Updates

- `sponsor_boid_id`: The unique identifier for the sponsor within the Boid network. This is the primary index.
- `invites_balance`: A count of the number of invites a sponsor can still issue.
- `invite_codes_unclaimed`: Tracks the number of invite codes that have been generated but not yet claimed.
- `invite_codes_claimed`: Records the total number of invite codes that have been claimed by new users.
- `sponsored_upgrades`: Accumulates the number of account upgrades sponsored by the user, signifying their contribution to the network's growth.
- `upgrades_total_earned`: Sums the earnings the sponsor has gained from the sponsored upgrades.

Actions that alter this table require contract authority and are typically called by other actions within the contract logic to maintain system integrity and ensure proper accounting of sponsor activities within the Boid network.
