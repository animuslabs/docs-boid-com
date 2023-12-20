# Booster Actions

## `booster.new`
Register a new Booster to be available for use.

**Input Parameters**

```ts
// Booster object to be added
booster: Booster
```

> For the Booster definition, see the [Booster Table](../tables/boosters.md).

**Authentication**\
Requires contract authority.

**Validation**

- Ensure `booster.booster_id` is unique.
- Ensure `booster.expire_after_elapsed_rounds` is positive.
- `booster.pwr_multiplier` must not exceed 200.

**Table Updates**\
Stores the new `booster` in the `boosters` table.

## `booster.add`
Attach a Booster to a user's account. It retrieves the Booster data from the `boosters` table and adds that data into the targeted account's record in the `accounts` table.

**Input Parameters**

```ts
// Target Boid account to receive the Booster
boid_id: Name
// ID of the Booster as referenced in the Boosters table
booster_id: u8
```

**Authentication**\
Requires contract authority, usually called inline by other actions.

**Validation**

- Sponsored accounts may only have a single Booster.
- Non-sponsored accounts cannot exceed `config.account.max_boosters`.
- Power must have been claimed in the current round unless the power rating history is zero.

**Table Updates**\
Updates the targeted `boid_id` account in the `accounts` table, adding the Booster to `account.power.mods`.

## `booster.rm`
Remove Boosters from an account, typically after they expire or when a user wants to swap them. Expired Boosters can be removed by anyone for cleanup, but active ones require appropriate authorization.

**Input Parameters**

```ts
// Boid account to have Boosters removed
boid_id: Name
// Indices of the Boosters to remove within `account.power.mods`
booster_index: i32[]
```

**Authentication**\
Account authority required if targeting unexpired Boosters. Expired boosters can be removed without authentication.

**Validation**

- Each element of `booster_index` must be a valid index in `account.power.mods`.

**Table Updates**\
Updates the affected `boid_id` account in the `accounts` table by removing the specified Boosters from `account.power.mods`.
