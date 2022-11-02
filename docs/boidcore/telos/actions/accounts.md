# Account Actions
This page is dedicated to contract actions related to accounts.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/4-accounts.ts)

## `account.add`
For adding new accounts. This action requires the contract authority. Most users would use the `account.buy` action which triggers `account.add` inline. This action is used directly by the contract to create the initial system `boid` account and any other system contracts that don't have to be purchased. Accounts created directly with this action aren't validated by the config suffix whitelist.

**Input Parameters**
```ts
// the boid_id to be created
boid_id:Name
// the the owners (native chain accounts) of the new boid account
owners:Name[]
// the sponsors of the account
sponsors:Name[]
// the keys on the account for key authentication
keys:PublicKey[]
```
**Authentication**\
Requires contract authority

**Validation**
- `boid_id` isn't empty
- `boid_id` is unique
- the length of `owners` doesn't exceed `config.account.max_owners`
- the length of sponsors doesn't exceed `config.account.max_sponsors`
- for each name in `owners` ensure it's an existing chain account
- for each name in `sponsors` ensure it's an existing boid account
- system account `boid` can't be listed in `sponsors` vector

**Table Updates**\
A new row is added to the [`accounts`](../tables/accounts) table.

## `owner.add`
For adding an owner to an existing boid account.

**Input Parameters**
```ts
// the target boid_id to add an owner to
boid_id:Name
// the owner to be added, must be an existing chain account
owner:Name
```
**Authentication**\
An existing owner account on the boid account.

**Validation**
- Checks that the owner account being added is a native chain account.
- Checks that the number of owners on the account doesn't exceed the `config.account.max_owners`

**Table Updates**\
A row in the `accounts` table is modified with the new `owner` added to the `owners` vector

## `owner.rm`
Remove an owner from an existing boid account

**Input Parameters**
```ts
// the boid account to modify
boid_id:Name
// the owner to modify
owner:Name
```
**Authentication**\
An existing owner on the boid account

**Validation**
- Checks that there will still be at least one owner on the account (can't remove the last owner)
- Ensures that the provided `owner` exists for this boid account

**Table Updates**\
Updates the target row in the `accounts` table after removing the target `owner` from the row `owners` list.

## `account.buy`
This action is the primary method to create a new boid account. Boid accounts are always sponsored by an existing boid account and the sponsor pays the account creation fee. This can be facilitated by a UI that enables users to generate and share invite links. The `recover.boid` chain account is added to new accounts as a last resort recovery mechanism. Advanced users can opt to remove the recovery account when ready. Triggers an inline `account.add` action after perfoming validations.

**Input Parameters**
```ts
// the boid_id of the new boid account, must be unique and follow the suffix whitelist
boid_id:Name
// the native chain account(s) that controls this account
owners:Name[],
// the keys that control this account
keys:PublicKey[],
// the boid_id of the account that sponsored creation of this new account (and pays the fee)
sponsor:Name
```
**Authentication**\
Requires authentication of the sponsor account

**Validation**
- `boid_id` is of a minimum length (8)
- `boid_id` has a suffix on the `config.account.suffix_whitelist`
- sponsor boid account has at least `config.account.purchase_price` in their deposits row
- sponsor boid account has no sponsors (you can't sponsor an account if you have a sponsor)
- at least one key or owner account must be specified in the inputs

**Table Updates**
- `config.account.purchase_price` is subtracted from the sponsor account `deposits` row
- `account.add` action is triggered which creates the row in the `accounts` table

## `account.edit`
This action is for the user to update their social data. This is just for use in the UI and doesn't need to be validated by the contract.

**Input Parameters**
```ts
boid_id:Name
social_ipfs_json:string
```
**Authentication**\
the boid account

**Validation**\
not validated, any string is valid

**Table Updates**\
The target boid `accounts` row is updated with the input `social_ipfs_json`

## `account.free`
This action can be called to remove a sponsor from a boid account

**Input Parameters**
```ts
// the target boid account
boid_id:Name
```
**Authentication**\
the target boid account

**Validation**
- the target boid account must have a sponsor
- the target boid account must have at least `config.account.remove_sponsor_price` liquid BOID balance

**Table Updates**
- `config.account.remove_sponsor_price` is subtracted from the liquid balance of the target boid account and added to the liquid balance of the sponsor account
- the sponsor is removed from the target boid account row

<!-- ## `action.name`

**Input Parameters**
```ts

```
**Authentication**\

**Validation**


**Table Updates**\ -->

