# Team Actions

Team-related actions allow users to create, change, and manage teams within the scope of the Boid platform. Teams can accumulate staked BOID and potentially access exclusive offers or perks. Future enhancements may include additional team management features and interactions with Boid Universe applications.

## `team.change`
Allows a user to change teams.

**Input Parameters**

```ts
boid_id: Name           // Target boid account.
new_team_id: u8         // ID of the team to switch to.
new_pwr_tax_mult: u8    // New power tax multiplier during team change.
```

**Authentication**
Requires contract authority, usually called inline by other actions.

**Validation**

- The user cannot switch to their current team.
- `power.claim` must be called in the same round before changing teams.
- Changing teams or editing the tax multiplier cannot occur too frequently, as governed by `config.team.change_min_rounds`.
- The new power tax multiplier must be greater than or equal to the team's minimum requirement.

**Table Updates**

- `teams` table: increment `members` and `power` for the new team, decrement for the old team.
- `accounts` table: update team-related details of the account.

## `team.taxrate`
Enables a user to set their team tax rate.

**Input Parameters**

```ts
boid_id: Name        // Target boid account.
new_pwr_tax_mult: u8 // New tax rate multiplier to pay the team.
```

**Authentication**
Requires contract authority or authorization from the boid account.

**Validation**

- New rate cannot be the same as the old rate.
- Team or tax rate changes are restricted by `config.team.change_min_rounds`.

**Table Updates**

- `accounts` table: update `team_tax_mult` of the account with the new value.

## `team.create`
Creates a new team.

**Input Parameters**

```ts
owner: Name             // Boid account that will own the team.
min_pwr_tax_mult: u8    // Minimum team power tax multiplier.
owner_cut_mult: u8      // Owner's cut multiplier of the team tax.
url_safe_name: string   // URL-safe name for the team.
info_json_ipfs: string  // IPFS hash for JSON metadata about the team.
```

**Authentication**
Requires contract authority.

**Validation**

- Accounts with sponsors are prohibited from team ownership.
- `min_pwr_tax_mult` and `owner_cut_mult` must not exceed the maximum allowed value.

**Table Updates**

- `teams` table: add a new row for the newly created team.

## `team.edit`
Permits the team owner to modify team details.

**Input Parameters**

```ts
team_id: u8             // ID of the team being edited.
owner: Name             // New team owner, or self to remain as the owner.
managers: Name[]        // Team managers (future use).
min_pwr_tax_mult: u8    // Minimum power tax rate multiplier for the team.
owner_cut_mult: u8      // Owner's profit cut multiplier.
url_safe_name: string   // URL-safe name of the team.
meta: u8[]              // Array of metadata bytes.
```

**Authentication**
Requires contract authority or authorization from the boid account owner.

**Validation**

- Managers specified must be valid boid accounts without duplication.
- Editing team details are restricted by `config.team.edit_team_min_rounds`.
- `min_pwr_tax_mult` and `owner_cut_mult` must not exceed the maximum allowed value.
- Metadata array `meta` size should not exceed 2048 bytes.

**Table Updates**

- `teams` table: updated with new details for the specified team.

---

## Additional Actions (DEBUG)

### `team.setpwr`
**Development-Only**: Sets the power for a team.

### `team.setmem`
**Development-Only**: Adjusts the number of members for a team.
