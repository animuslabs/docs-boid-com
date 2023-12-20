# Auth Actions

This page covers all actions related to key-based authentication for a Boid account. Key-based authentication allows users to authorize actions without the need for a full wallet, using a private key stored on the frontend instead. The frontend signs actions, which are then sent to an API hosted by Boid validators. The API wraps the signed actions in an Antelope transaction and submits it to the blockchain. Key authentication cannot be used for sensitive actions such as withdrawals or transfers, to prevent security risks associated with storing keys in the browser. For these operations, a full Antelope wallet like Anchor is required.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/10-auth.ts)

## `auth`
The primary method to push signed actions onto the chain. The Boid validator node submits the client data, and the contract validates the signature, including a nonce to prevent transaction replays.

**Input Parameters**
```ts
boid_id: Name // the signing boid_id
actions: Action[] // the actions that were signed
sig: Signature // the signature of the actions
keyIndex: i32 // the index of the key in account's keys
expires_utc_sec: u32 // expiry time of the transaction in UTC
```

**Authentication**\
No specific chain account authentication required, handled internally.

**Validation**

- Signature must match the provided actions and key.
- Only one action is allowed per key authentication transaction.
- Action must be whitelisted (`config.auth.key_actions_whitelist`) and target the correct account.

**Table Updates**

- `auth` table: updated with the authenticated `boid_id`.
- `accounts` table: `account.auth.nonce` value is incremented by 1.

**Inline Actions**\
Signed actions are sent inline. An additional action `auth.init` is called.

## `auth.addkey`
Adds a PublicKey to a boid account for key authentication.

**Input Parameters**

```ts
boid_id: Name // target boid account
key: PublicKey // the PublicKey to add
```

**Authentication**\
Requires authentication of the target boid account (`requireBoidAuth`).

**Validation**

- Ensures that the number of keys does not exceed `config.auth.account_max_keys`.
- New key must be unique within the account's keys.

**Table Updates**

- `accounts` table: updated with the added key to `account.auth.keys`.

## `auth.rmkey`
Removes a PublicKey from a boid account's key set.

**Input Parameters**

```ts
boid_id: Name // target boid account
keyIndex: i32 // index of the PublicKey to delete
```

**Authentication**\
Requires authentication of the target boid account (`requireBoidAuth`).

**Validation**

- Provided key index must be within the valid range of `account.auth.keys`.

**Table Updates**

- `accounts` table: updated with the target key removed from `account.auth.keys`.

## `auth.init`
Initializes the `auth` table during contract deployment.

**Input Parameters**\
None

**Authentication**\
Requires contract authority (`requireAuth` the contract's own account).

**Validation**\
None

**Table Updates**

- `auth` table: set with default data for `newAuth.boid_id_auth`.


