# Deposit Actions
Actions relating to deposits of assets, including token and NFT deposits, invite purchases, and account creation fees.

## `sendInviteBuy`
Issues an action to purchase invites with BOID tokens.

**Input Parameters**

```ts
// Boid ID making the purchase
boid_id: Name
// Number of invites to buy
quantity: u16
```

**Authentication**\
Requires contract authority, usually called inline by other actions.

## `addAccountNfts`
Adds NFTs to an account's NFT balance.

**Input Parameters**

```ts
// Account receiving NFTs
to_account: Account
// Array of asset IDs to add
asset_ids: u64[]
// Optional: Config table, default is fetched with getConfig()
config: Config
// Optional: Update table flag, default is true
update_table: boolean
```

**Authentication**\
Requires contract authority for updating the NFTs and account balance.

**Validation**

- The new NFT balance cannot exceed the maximum set in config.

**Table Updates**

- `nfts` table is updated with new entries
- `accounts` table is updated if `update_table` is true

## `addSponsorInvites`
Adds sponsor invites to a Boid ID's balance.

**Input Parameters**

```ts
// Boid ID of the sponsor
boid_id: Name
// Quantity of invites to add
inviteQuantity: u16
```

**Authentication**\
Requires contract authority.

**Validation**

- The total invites balance must not wrap around on addition.

**Table Updates**

- `sponsors` table is updated with the new invites balance or a new entry is created.

## `handleSponsorDeposit`
Processes a deposit for purchasing sponsor invites.

**Input Parameters**

```ts
// Asset quantity deposited
quantity: Asset
// Memo specifying the Boid ID for sponsorship
memo: string
```

**Authentication**\
Contract authority required, checks for exact deposit amount for invite quantity purchased.

**Validation**

- Whole quantities only.
- Deposit increments must match the invite price.
- Checks for valid Boid ID in memo.

**Table Updates**

- `accounts` table updated with new balance.
- Sponsors granted additional invites based on deposit.

## `handleAccountDeposit`
Handles a generic deposit into a Boid account's balance.

**Input Parameters**

```ts
// Asset quantity deposited
quantity: Asset
// Memo specifying the Boid ID
memo: string
```

**Authentication**\
Contract authority required.

**Validation**

- Whole quantities only.
- Checks for valid Boid ID in memo.

**Table Updates**

- `accounts` table updated with new balance.

## `handleCreateAccountDeposit`
Processes a deposit to cover the cost of account creation.

**Input Parameters**

```ts
// Asset quantity deposited
quantity: Asset
// Memo specifying the owner and Boid ID for account creation
memo: string
```

**Authentication**\
Requires contract authority and checks for the exact deposit amount matching creation cost.

**Validation**

- Whole quantities only.
- Checks for valid owner account in memo.

**Table Updates**

- Creates a new account upon sufficient deposit.

## `handleNFTDeposit`
Processes deposit of an NFT into an account's balance.

**Input Parameters**

```ts
// TransferNfts action data
params: TransferNfts
```

**Authentication**\
Contract acting as NFT receiver.

**Validation**

- Collection must be whitelisted.
- NFT must exist in the atomicassets table.

**Table Updates**

- `nfts` table updated with new NFTs.
- `accounts` table updated with new NFT balance.

## `ondeposit`
Handler for incoming deposits.

**Authentication**\
Validates incoming deposits by checking token symbol, sender, and amount.

**Validation**

- Determines deposit type from memo (sponsor, deposit, create_account).
- Invokes corresponding handler based on deposit type.
