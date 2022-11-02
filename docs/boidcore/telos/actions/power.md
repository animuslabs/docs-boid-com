# Power Actions
Actions related to Boid Power

## `power.add`
Adds power to a boid account. This action requires contract authority and usually will be called by other system level boid contracts operated by oracles reporting the computing generated power and other data sources like PowerPools.

**Input Parameters**
```ts
// target boid account
boid_id:Name
// quantity of power to add
power:u16
```
**Authentication**\
requires system authority

**Validation**
- can't exceed the maximum boid power u16 max (65,000)
- Team Max power can't be exceeded
- System account `boid` can't receive power

**Table Updates**
- adds power to the boid account row `account.power.rating`
- adds power to any sponsor on the account
- adds power to the team row `team.power`
- adds power to the globals row `globals.total_power`
- adds power to the `stats` table `stat.power_added`

> The power added is also multiplied by any powermods on the account that multiply power

**Inline Actions**\
Triggers `logpwradd` which just logs out the results of how power was distributed
```ts
// the original amount of power received
received:u16
// power added from multiplier pwrmods
from_mult_mods:u16
// power diverted to sponsor
diverted_to_sponsor:u16
// amount of power the account actually earned
power_increased:u16
// the origin of power, it's just to tell the difference between normal power add and power from sponsorship
origin:Name
```

## `power.claim`
Claiming decays the current Boid Power of an account and generates BOID tokens based on decayed power and powered stake and unpowered stake. If the account is on a team that has a team tax, some tokens are distributed to the team and possibly team leader in this action. PowerMods that generate power are also taken into acount during this action.

**Input Parameters**
```ts
// target boid account
boid_id:Name
```
**Authentication**\
does not require authentication, any account can call claim on behalf of any boid account

**Validation**
- can only claim once per round
- account must have positive power (after adding power generating power mods)
- system account `boid` can't claim power

**Table Updates**
- `boid_id` `accounts` row power and self_stake are updated
- `team` power updated
- `global` table update
- `stats` table updated
- if unpowered stake BOID minted, update the system stake with minted funds

**Inline Actions**
- `token.boid` `transfer` action triggered to move newly minted tokens from `mint.boid` to `stake.boid`
- `logpwrclaim` action triggered to log out details of the claim
```ts
// data related to Power
power:PowerClaimLog
// data related to tokens minted
mint:MintLog
```
```ts
class PowerClaimLog {
  // power before the claim
  before:u16
  // power after the claim
  after:u16
  // power added by mods
  from_mods:u16
}
```
```ts
class MintLog {
  // minted tokens received by the claimed account
  account:u32
  // minted tokens received by the account team
  team:u32 = 0
  // minted tokens received by the team owner
  team_owner:u32 = 0
  // minted tokens due to overstake (unpowered stake) sent to system contract
  overstake:u32 = 0
  // total minted from this claim
  total:u32 = 0
}
```



<!-- ## `action.name`


**Input Parameters**
```ts

```
**Authentication**\


**Validation**


**Table Updates**\ -->
