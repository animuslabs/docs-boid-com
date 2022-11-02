# PowerMod Actions
Actions relating to PowerMods

## `pwrmod.new`
For the system to register a new PowerMod

**Input Parameters**
```ts
// the PowerMod row to add
mod:PwrMod
```
> For PwrMod definition see the [PwrMod Table](../tables/pwrmods.md)


**Authentication**\
requires contract authority


**Validation**
- `mod.mod_id` must not already exist
- `mod.expire_after_elapsed_rounds` must be above zero

**Table Updates**\
Adds `mod` to the `pwrmods` table

## `pwrmod.add`
For adding a PowerMod to an account. Reads the parameters from the `pwrmod` table for a specific mod and copies that data into the target boid account `accounts` row.

**Input Parameters**
```ts
// the target boid account
boid_id:Name
// the unique mod_id from the pwrmod table
mod_id:u8
```
**Authentication**\
requires contract auth

**Validation**
- if the account has a sponsor, limit powermods to 1
- otherwise ensure `config.account.max_pwrmods` has not been reached for this boid account
- ensure power has been claimed first

> The reason power must be claimed before a mod can be applied is to prevent the mod from being applied to previous rounds before it was applied

**Table Updates**\
target boid account row in `accounts` table is updated with new PowerMod pushed to the `account.power.mods` vector

## `pwrmod.rm`
PowerMods can be removed from an account. Usually this would be done after the Pwrmod has expired or when the user wants to replace it with a better mod. Expired Powermods can be removed by any account (for cleanup) but unexpired requires authentication

**Input Parameters**
```ts
// the target boid account
boid_id:Name
// the index of the pwrmod to remove
pwrmod_index:i32
```
**Authentication**\
Requires the contract or account auth if the mod hasn't expired.

**Validation**\
`pwrmod_index` must be valid

**Table Updates**
removes the pwrmod from `account.power.mods` and updates the row in the `accounts` table


<!-- ## `action.name`


**Input Parameters**
```ts

```
**Authentication**\


**Validation**


**Table Updates**\ -->
