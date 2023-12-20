# Account Actions

## `account.add`
This action adds new accounts to the system, requiring contract authority. It bypasses config suffix whitelist validation and is suitable for creating system accounts including the initial `boid` account.

### Input Parameters
```ts
boid_id: Name, // The boid_id to be created
owners: Name[], // Owners of the new boid account (native chain accounts)
sponsors: Name[], // Sponsors of the account
keys: PublicKey[] // Keys for key authentication on the account
```

### Authentication
Requires contract authority, usually called inline by other actions.

### Validation

- `boid_id` cannot be empty and must be unique.
- Number of `owners` cannot exceed `config.account.max_owners`.
- Only one `sponsor` can be specified.
- `owners` must be valid native chain accounts.
- `sponsors` must be valid existing boid accounts and the system account `boid` cannot be a sponsor.

### Table Updates
Inserts a new row into the `accounts` table with the provided `boid_id`, `owners`, `sponsors`, and `keys`.

---

## `owner.add`
Adds an owner to an existing boid account, allowing modification of the account's ownership.

### Input Parameters

```ts
boid_id: Name, // The target boid_id to add an owner to
owner: Name // The owner to be added, must be an existing chain account
```

### Authentication
Authenticated by an existing owner or requires contract authority if no current owners are set.

### Validation

- Added `owner` must be a valid native chain account.
- Total `owners` must not exceed `config.account.max_owners`.
- Newly added `owner` must not duplicate existing owners.

### Table Updates
Modifies a row in the `accounts` table, appending the new `owner`.

---

## `owner.rm`
Removes an owner from a boid account, allowing for updates in ownership structure.

### Input Parameters

```ts
boid_id: Name, // The boid account to modify
owner: Name // The owner to remove
```

### Authentication
Requires boid account authorization of an existing owner.

### Validation

- At least one owner must remain.
- Specified `owner` must exist in the account's current `owners` list.

### Table Updates
Modifies the `accounts` table, removing the specified `owner`.

---

## `account.buy`
Facilitates the creation of a new boid account by an existing account, which sponsors the creation fee.

### Input Parameters

```ts
payer_boid_id: Name, // The boid_id of the sponsoring account
new_account: AccountCreate // Details of the new account being created
```

### Authentication
Authenticated by the sponsoring (payer) boid account.

### Validation

- `boid_id` of the new account must be unique and meet whitelist criteria.
- Sponsor must have sufficient balance for account creation fee.
- Sponsor must not have a sponsor.
- New account must have at least one owner or key.

### Table Updates
Subtracts creation fee from the sponsor, stores the new account via `account.add`.

---

## `account.edit`
Enables users to update their metadata.

### Input Parameters

```ts
boid_id: Name, // The boid_id of the account being edited
meta: u8[] // Metadata in bytes, limited to 512 bytes
```

### Authentication
Authenticated by the boid account owner.

### Validation

- `meta` size must not exceed 512 bytes.

### Table Updates
Sets the `meta` field in the `AcctMeta` table for the boid account.

---

## `account.free`
Removes a sponsor from a boid account for independent operation.

### Input Parameters

```ts
boid_id: Name // The boid_id of the account from which the sponsor is being removed
```

### Authentication
Authenticated by the boid account owner.

### Validation

- Account must currently have a sponsor.
- Account must afford the sponsor removal fee.

### Table Updates
Removes sponsor from `sponsors` list, deducts fee from balance, and splits fee between system and sponsor accounts.

---

## `account.rm`
(Development only) Removes an account from the system.

### Input Parameters

```ts
boid_id: Name // The boid_id of the account to be removed
```

### Authentication
Requires contract authority.

### Table Updates
Removes the account from the `accounts` table.

---

## `account.mod`
(Development only) Modifies `received_delegated_stake` of an account for testing purposes.

### Input Parameters

```ts
boid_id: Name, // The boid_id of the account to modify
received_delegated_stake: u16 // The new value for received_delegated_stake
```

### Authentication
Requires contract authority.

### Table Updates
Updates `received_delegated_stake` in the `accounts` table for the account.

---

## `meta.clean`
(Development only) Cleans up account metadata for development needs.

### Authentication
Requires contract authority.

### Table Updates
Removes all entries from the `AcctMeta` table.
