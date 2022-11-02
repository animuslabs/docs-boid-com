# Teams Table
Teams (aka clubs) are registered in this table. Registering a row requires the contract authority. While the team can hold a balance and stake there isn't currently a way for it to be spent or unstaked. In the future the team balance can be used in Boid colony or to buy things that benefit the team like team exclusive offers and NFTs.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/teams.ts)
\
Scope: `boid`
\
Index: `team_id`

## Overview
```ts
class Team extends Table {
    // automatically generated unique id for each team
    team_id:u16
    // the team liquid balance
    balance:u32
    // team staking data, same as accounts table
    stake:AccountStake
    // the boid_id that controls the team, can adjust various settings
    owner:Name
    // the managers are boid_ids that can be appointed by the owner to manage the team (NOT IMPLEMENTED)
    managers:Name[]
    // this is the percent of the team members earnings that the team earns (tax rate), divided by 200 ( 10 = 0.05)
    min_pwr_tax_mult:u8
    // this is the percent of the team earnings that go to the team owner, divided by 200 ( 1 = 0.005)
    owner_cut_pct:u8
    // url safe name, this value is used in the frontend for a unique link to the team
    url_safe_name:string
    // IPFS String pointing to JSON data about team details and social media
    info_json_ipfs:string
    // total boid power of all team members
    power:u32
    // number of members
    members:u32
    // the last round the team was edited. This is to help prevent the team details from being editing too often.
    last_edit_round:u16
  @primary
  get primary():u64 {
    return u64(this.team_id)
  }
}
```
