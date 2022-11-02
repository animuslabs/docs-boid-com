# Offers Actions
Actions related to offers. Offers allow the system to enable users to exchange resouces and earn rewards.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/12-offers.ts)

## `offer.add`
For the contract auth to add offers to the system.

**Input Parameters**
```ts
requirements:OfferRequirements
actions:OfferAction
rewards:OfferRewards
limits:OfferLimits
```
> The action input data types are described on the [Offers Table](../tables/offers) page.

**Authentication**\
requires contract authority

**Validation**
- can't set nft_action burn true and lock_rounds above zero
- rewards pwrmod_id must be valid
- `limits.available_until_round` must be a round in the future
- `limits.offer_quantity_remaining` must be above zero

**Table Updates**\
Adds a new entry to the `offers` table.

## `offer.claim`
Enables a boid account to take advantage of an available offer.

**Input Parameters**
```ts
// the boid account claiming the offer
boid_id:Name
// the offer_id from the offers table
offer_id:u64
// if the target offer requires an NFT action(s) include the asset_id(s) here
required_nft_action_ids:u64[]
```
**Authentication**\
the authority of `boid_id`

**Validation**
```ts
  validateOffer(account:Account, req:OfferRequirements, limits:OfferLimits):void {
    // makes sure the offer has claimins remaining
    check(limits.offer_quantity_remaining > 0, "no offers remaining for this offer_id")
    // make sure the offer hasn't expired based on time
    check(limits.available_until_round > this.currentRound(), "offer has expired")
    // check account for minimum balance requirement
    check(req.min_balance <= account.balance, "minimum balance requirement not met to claim this offer")
    // check account team contribution minimum requirement
    check(req.min_cumulative_team_contribution <= account.team.team_cumulative_contribution, "team_cumulative_contribution is below the minimum requirement to claim this offer")
    // check account power minimum
    check(req.min_power <= account.power.rating, "account power is below min_power requirement")
    // check account stake requirement
    check(req.min_stake <= account.stake.self_staked + (u32(account.stake.received_delegated_stake) * u32(1e4)), "account total stake is below the offer min_stake requirement")
    // check team membership if necessary
    if (req.team_id.length > 0) check(req.team_id.includes(account.team.team_id), "account team is not eligible for this offer")
  }
```
> if offer requires NFT/BOID burn, stake, deposit, validates that the account has the ability to do so

**Table Updates**
- depends on the offer being claimed
- decrements the `offer.limits.offer_quantity_remaining`
- increments the `offer.total_claimed`
> To see the potential table changes review the [Offers Table](../tables/offers) page.

**Inline Actions**\
Based on the details of the offer it could trigger `stake`, `internalxfer`, NFT burn, `pwrmod.add`.

<!-- ## `action.name`


**Input Parameters**
```ts

```
**Authentication**\


**Validation**


**Table Updates**\ -->
