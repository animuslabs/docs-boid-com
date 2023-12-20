# Boosters Table
The Boosters table stores the configuration of all available booster items. Boosters are used to enhance the generation of power in various ways and can only be added by a contract authority. They typically provide a power multiplier or add power each round and have a limited duration.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/boosters.ts)
\
Scope: `boid`
\
Index: `booster_id`

## Overview
```ts
@table("boosters")
export class Booster extends Table {
  constructor(
    public booster_id: u8 = 0, // Unique ID of the booster, assigned by the contract upon registration.
    public pwr_multiplier: u8 = 0, // Multiplies incoming power, the actual multiplier value is based on implementation details, e.g., divided by a specific factor.
    public pwr_add_per_round: u16 = 0, // Adds a set amount of power to the account each round, applied when power is claimed.
    public expire_after_elapsed_rounds: u16 = 0, // The booster will expire after this many rounds, ceasing to provide benefits.
    public aggregate_pwr_capacity: u32 = 0 // Acts as a depletion pool that reduces with each claim based on the decay of power. Once depleted, the booster becomes inactive.
  ) {
    super()
  }

  @primary
  get primary(): u64 {
    return u64(this.booster_id)
  }
}
```

## Table Updates
1. `mod_id` -> `booster_id`: Reflects the renamed ID field to identify a booster.
2. `pwr_multiplier`: Remains the same, may need an updated description based on the current implementation for how the multiplier is applied.
3. `pwr_add_per_round`: No changes, still represents the amount of power added to an account every round.
4. `expire_after_elapsed_rounds`: Consistent with the old documentation, defines the lifespan of a booster in terms of rounds.
5. `aggregate_pwr_capacity`: Same as before, indicates the total capacity of a booster, which depletes over time.

## Action Permissions
- Adding, modifying, or removing boosters requires contract authority, typically done through inline actions within other contract functions.

Please note that if the actual power multiplier effect has changed (e.g., different base or division factor), this should be reflected in the updated documentation details. Additionally, any new implementation details, constraints, or functionality changes observed in the source code should be included in the documentation.
