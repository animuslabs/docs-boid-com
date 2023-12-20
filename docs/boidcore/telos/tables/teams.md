```markdown
# Teams Table (Updated)

Teams are collaborations of Boid users. Each team has its own properties and characteristics managed within this table. Creating a row in this table requires contract authority; this action is typically performed inline by other contract actions.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/teams.ts)

Scope: `boid`
Index: `team_id` (Primary Key)

## Overview

```ts
class Team extends Table {
  team_id: u16 // Unique identifier for the team, assigned automatically.
  balance: u32 // Liquid balance of the team, reserved for future uses such as spending within Boid ecosystem.
  stake: AccountStake // Staking data of the team, identical to the accounts table structure.
  owner: Name // Account that has control over the team, with authority to adjust settings.
  managers: Name[] // List of accounts appointed by the owner to help manage the team (functionality not currently implemented).
  min_pwr_tax_mult: u8 // Tax multiplier representing the percentage of members' earnings the team receives, divided by 200 (e.g., 10 corresponds to a 5% tax rate).
  owner_cut_mult: u8 // Multiplier for the percentage of the team's earnings allocated to the owner, divided by 200 (e.g., 1 corresponds to a 0.5% owner's cut).
  url_safe_name: string // URL-safe name for frontend linkage.
  power: u64 // Aggregate Boid power contributed by all team members.
  members: u32 // Count of team members.
  last_edit_round: u16 // The last round in which team details were modified, to limit the frequency of changes.
  meta: u8[] // Metadata, can be utilized for various features in future updates.

  @primary
  get primary(): u64 {
    return u64(this.team_id)
  }
}
```

## Table Updates

- `owner_cut_pct` field from the original documentation has been updated to `owner_cut_mult` in the documentation and the code to accurately reflect the current codebase.
- `info_json_ipfs` string field has been removed as it no longer exists in the codebase.
- `power` field type updated from `u32` to the correct type `u64` according to the current code.
- Added the `meta` field in both the documentation and code overview, which is used to store metadata, indicating potential future feature use.
- Clarified the explanation of some fields like `min_pwr_tax_mult` and `owner_cut_mult` to correctly describe their purposes and calculation methods.
- Adjusted code comments to offer more precise descriptions of each field, aligning with the updated codebase properties.
```
