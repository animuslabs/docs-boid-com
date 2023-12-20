# Config Table

This documentation outlines the `Config` table used by the Boid smart contract. It is essential for holding the contract's operational parameters. The table is singleton, meaning only one exists within the scope and is crucial for adjusting contract behavior and policies.

## Table Definition

- **Class**: `Config`
- **Scope**: `boid`
- **Index**: None (Singleton)
- **Resides in**: `tables/config.ts` on GitHub

## Structs and Classes

### ConfigAccount

Manages account-related settings, including sponsorship and premium accounts.

- `invite_price`: Cost to purchase an invite.
- `premium_purchase_price`: Cost to purchase a premium account.
- `max_premium_prefix`: Maximum length of premium name prefix.
- `max_owners`: Maximum number of account owners.
- `max_boosters`: Maximum number of power-boosting mods.
- `suffix_whitelist`: Whitelisted suffixes for account names.
- `remove_sponsor_price`: Cost to remove a sponsor.
- `sponsor_max_invite_codes`: Maximum invitational codes per sponsor.
- `invite_code_expire_rounds`: Invite code expiration in rounds.

### ConfigPower

Defines Boid Power's behavior and contribution to system calculations.

- `sponsor_tax_mult`: Multiplier for sponsor tax.
- `powered_stake_mult`: Multiplier for stake power.
- `claim_maximum_elapsed_rounds`: Maximum elapsed rounds for claiming.
- `soft_max_pwr_add`: Soft cap on power addition.
- `history_slots_length`: Power history slots length.

### ConfigMint

Inflation parameters linked to Boid Power and staking.

- `round_powered_stake_mult`: Inflation multiplier based on powered stake.
- `round_power_mult`: Inflation multiplier based on Boid Power.

### ConfigTeam

Regulates team-specific settings within the Boid ecosystem.

- `change_min_rounds`: Minimum rounds delay for team change.
- `edit_team_min_rounds`: Minimum rounds delay for team editing.
- `team_edit_max_pct_change`: Max percent change allowed when editing teams.
- `buy_team_cost`: Cost to establish a new team.
- `owner_stake_required`: Required stake for team ownership.
- `owner_future_stake_lock_rounds_required`: Future locked round requirement.

### ConfigStake

Parameters concerning BOID token staking mechanics.

- `unstake_rounds`: Number of rounds to wait for unstaking.
- `extra_stake_min_locked_rounds`: Minimum locked rounds for extra staking.

### ConfigTime

Time-based settings regarding round timings, starting from epoch.

- `rounds_start_sec_since_epoch`: Starting second since epoch for rounds.
- `round_length_sec`: The length of a round in seconds.

### ConfigAuth

Security configurations focusing on key-based authentications.

- `key_actions_whitelist`: Whitelist actions for key authentication usage.
- `account_max_keys`: Max number of keys per account for authentication.
- Includes placeholders for stake/balance limits on 'key' accounts.

### ConfigNft

Configurations for NFT interactions, including collection restrictions.

- `boid_id_maximum_nfts`: Max allowed NFTs per Boid ID.
- `whitelist_collections`: Whitelisted NFT collections.

### PowerClaimLog

A log entry capturing the state change after claiming power.

- `before`: Power rating before claiming.
- `after`: Power rating after claiming.
- `from_boosters`: Power received from boosters.
- `elapsed_rounds`: Elapsed rounds since the last claim.

### MintLog

Records the minting results and allocations after power claims.

- `power_mint`: Token amount minted from power.
- `powered_stake_mint`: Token amount minted from powered stake.
- `account_earned`: Earnings attributed to the account.
- `team_cut`: Portion allocated to the team.
- `team_owner_earned`: Earnings allocated to the team owner.
- `overstake_mint`: Tokens minted from overstakest.
- `total`: The total number of tokens minted.

### General Flags

- `paused`: When enabled, all non-authority actions are halted.
- `allow_deposits`: Toggles the ability for accounts to make deposits.
- `allow_withdrawals`: Toggles the ability for accounts to make withdrawals.

### Recovery Account

- `recoveryAccount`: The account used for key recovery, safeguarded by the DAO and trusted third parties.

## Table Updates

- Updated the documentation to encompass recent changes in variable names and newly introduced parameters.
- The `ConfigAutoAdjust` class remains excluded and not implemented.
- `recoveryAccount` added for upcoming key recovery features.

## Modifying the Table

Modifications to the `Config` table require contract authority and are generally conducted through privileged contract actions.
