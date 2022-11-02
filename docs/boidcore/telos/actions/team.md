# Team Actions
Actions related to teams. Some functionality of teams isn't implemented yet. In the future users should be able to purchase a team and customize it how they like. Additionally teams can accumulate staked BOID but can't yet unstake or spend it. In the future teams could spend tokens to purchase team exclusive offers as well as interact with Boid Universe apps. Managers don't yet have any functions but the idea is that they would have some limited permissions and trusted by the team owner for day to day management and interacting with Boid Universe etc.

## `team.change`
allows a user to change teams

**Input Parameters**
```ts
// target boid account
boid_id:Name
// team to switch to ( from teams table )
new_team_id:u16
// set new tax pct during team change
new_pwr_tax_pct:u8
```
**Authentication**\
requires contract or boid account auth

**Validation**
- Can't switch to the team you are already on
- must call `power.claim` in the same round before changing teams
- can't change teams/edit tax rate too frequently, limited by `config.team.change_min_rounds`
- `new_pwr_tax_pct` must be equal or greater than the team minimum

**Table Updates**
- `team.members` and `team.power` incremented for new team
- `team.members` and `team.power` decremented for old team
- `account.team` updated to new values

## `team.taxrate`
user can set their team tax rate

**Input Parameters**
```ts
// target boid account
boid_id:Name
// new tax rate to pay the team
new_pwr_tax_mult:u8
```
**Authentication**\
requires contract or boid account auth

**Validation**
- can't set new rate to the same as the old rate
- can't change teams/edit tax rate too frequently, limited by `config.team.change_min_rounds`

**Table Updates**\
updates `account.team.pwr_tax_mult` to new value

## `team.create`
to create a new team

**Input Parameters**
```ts
// boid_id that owns the team
owner:Name
// minimum tax rate of the team
min_pwr_tax_mult:u8
// the cut of the team tax that goes to the owner
owner_cut_mult:u8
// url safe name of the team
url_safe_name:string
// additional team metadata in ipfs JSON
info_json_ipfs:string
```
**Authentication**\
requires contract auth

**Validation**
- accounts with sponsors can't be a team owner

**Table Updates**\
adds new row to the `teams` table

## `team.edit`
allows the team owner to edit their team

**Input Parameters**
```ts
// new team owner (or specify self to remain owner)
owner:Name
// new team managers (Not implemented)
managers:Name[]
// team tax rate
min_pwr_tax_mult:u8
// the cut of the team profit that goes to the owner
owner_cut_pct:u8
// url safe name of the team, for links
url_safe_name:string
// IFPS hash to JSON data about team, just for UI usage
info_json_ipfs:string
```
**Authentication**\
requires contract or boid account owner auth

**Validation**
- managers must be valid boid accounts
- can't edit team too quickly, determined by `config.team.edit_team_min_rounds`

**Table Updates**\
updates row in `teams` table with new data


<!-- ## `action.name`


**Input Parameters**
```ts

```
**Authentication**\


**Validation**


**Table Updates**\ -->
