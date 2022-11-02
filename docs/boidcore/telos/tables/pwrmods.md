# Pwrmods Table
The PowerMods table stores configuration data for all available PowerMods. Only the contract authority can add PowerMods. Powermods can be added to an account to add power each round and/or multiply added power.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/pwrmods.ts)
\
Scope: `boid`
\
Index: `mod_id`

## Overview
```ts
class PwrMod extends Table {
  // uniqe id of the pwrmod, set by the contract when pwrmods are registered
  mod_id:u8
  // multiplies incoming power, divided by 200
  pwr_multiplier: u8
  // adds power to the account each round, added during claim
  pwr_add_per_round: u16
  //  when the powermod is added to an account, it will expire after this many rounds
  expire_after_elapsed_rounds: u16
  // each time power.claim is called on an account with a powermod,
  // the mod aggregate capacity will decrease based on the quantity of power being decayed during that claim.
  // when this value reaches zero the mod will stop working
  aggregate_pwr_capacity:u32
  @primary
  get primary():u64 {
    return u64(this.mod_id)
  }
}
```


