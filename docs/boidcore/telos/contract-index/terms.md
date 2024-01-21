# Boid Terminology

## Boid Power
Boid Power is a metric used to determine an accounts (or cumulatively a team's) contribution to Boid. Users can generate Boid Power by contributing to various distributed computing protocols, providing liquidity to PowerPools, and other mechanisms in the future like NFTs that generate Boid Power. When an account receives Boid Power the power accumulates in their account over time. Boid Power also decays over time, when the rate of decay and generation reach an equilibrium, an account is said to be "fully powered". When an account stops earning Boid Power the account power will decay down to zero.

The math to calculate decay looks like this:
```ts
  decayPower(power:u16, rounds:u16):u16 {
    // global config
    const config = this.configT.get()
    // total power decayed due to the multiplier
    const totalMult = u16(power * (config.power.round_decay_mult * rounds))
    // total power decayed due to the constant rate
    const totalStatic = rounds * config.power.round_decay_constant
    // total power decayed over this many elapsed rounds
    return totalMult + totalStatic
  }
```
When an account with a sponsor earns Boid Power a percent of the power is shared with the sponsor, the amount is determined by the `config` table. Boid Power can  be claimed by an account which calculates the amount of decay since the last claim and generates BOID based on the quantity.


## BOID tokens
BOID are EOSIO based tokens issued on EOS and bridged to other chains. It's the native currency in Boid and is used in every boid application in some way.

## BOID stake
Staking BOID tokens means locking them up within the Boid platform. When you stake your BOID tokens, you're essentially depositing them into the system, similar to putting money in a savings account, except here, it's for specific purposes within the Boid ecosystem. There are different ways to stake. You can stake to yourself or to another user or a team.

## BOID delegated Stake
This is the amount of BOID tokens that others have staked, but they've chosen to support you with their stake. It's like allies in a game pooling their resources with you, but they still own their resources.

## BOID powered stake
When staked by an account with Boid Power, BOID tokens can be 'Powered' with Boid Power to generate additional BOID rewards. There is a limit to the amount of stake an account can power called the `Max Powered Stake`, the MPS for an account is determined by the Boid Power rating.  
In more detail:  
We take the account's: Boid power rating, BOID self staked value, BOID delegated stake value. From the main BoidCore config: powered stake multiplier. Then we calculate:
1. <MathDisplay content="\text{user's power + powered stake multiplier = max powered stake}%" />
2. <MathDisplay content="\text{user's self stake + user's delegated stake ≤ max powered stake}%" />

## PowerMods
A PowerMod can multiply and/or add power to an account over time. Available PowerMods can be registerd by the system and Offers can apply PowerMods in exchange for various activity or rewards. Accounts can have multiple PowerMods applied at once and the PowerMods may expire due to usage or time.
