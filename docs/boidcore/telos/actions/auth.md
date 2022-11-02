
# Auth Actions
This page covers all actions related to key authentication. Key based authentication means that users don't need a wallet to authorize actions for their boid account. A private key can be stored in the frontend which signs actions the user wishes to perform. The actions are signed with the stored key and the signed message is sent to a special API server hosted by Boid validators. The API server can then place the signed message inside a full EOSIO transaction and push the transaction to chain (the validator will handle chain resouces needed). Storing keys in the browser isn't always safe so for this reason the contract doesn't allow key authentication to be used for withdrawing funds or sending funds to other Boid users or modifying owner accounts. To transfer tokens the user will need to sign a transaction using their full EOSIO wallet like Anchor as a linked owner account.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/10-auth.ts)

## `auth`
This is the primary method for signed actions to be pushed. The Boid validator node will take the data from the client and push it onto the chain. The contract then validates the signature. The signature also include a nonce, which prevents transaction replays(the signed actions are no-longer valid after being transacted since the nonce has been incremented).

**Input Parameters**
```ts
// the signing boid_id
boid_id:Name
// the actions that were signed
actions:Action[]
// the signature of the actions signed with the account key
sig:Signature
// the index of the key on the boid account, for boid accounts that have multiple keys registered
keyIndex:i32
```

**Authentication**\
Does not require any specific chain account authentication since the action authentication is all handled internally (any account can push signed actions).

**Validation**
- the provided signature matches the actions and key provided
- the number of included actions is less than 4
- validate each action
  - is whitelisted for key authentication (checking: `config.auth.key_actions_whitelist`)
  - is for the `boid` system contract

**Table Updates**
- the `auth` table is updated with the authenticated `boid_id` and the number of actions that were signed
- the `accounts` table row for the boid account `account.auth.nonce` is incremented by 1

**Inline Actions**\
The signed actions are sent inline

> The inline actions triggered will each independently check the auth table to validate the authenticated contract and decrement the `auth.actions_num` until it reaches zero. The last action called will reset the `auth` table at this point.


## `auth.addkey`
This is basic action for adding a PublicKey to an account.

**Input Parameters**
```ts
// target boid account
boid_id:Name
// the PublicKey to be added
key:PublicKey
```
**Authentication**\
the target boid account

**Validation**\
the length of `account.auth.keys` is less than `config.auth.account_max_keys`

**Table Updates**\
the boid account row in the `accounts` table is updated with the new key added to the `acount.auth.keys` vector.

## `auth.rmkey`
This is basic action for removing a PublicKey to an account.

**Input Parameters**
```ts
// target boid account
boid_id:Name
// the the index of the PublicKey to delete
keyIndex:i32
```
**Authentication**\
the target boid account

**Validation**\
the key index provided must be valid

**Table Updates**\
the boid account row in the `accounts` table is updated with the target key removed from the `acount.auth.keys` vector.


## `auth.init`
This action is called once during contract initialization to setup the auth table.

**Input Parameters**\
none

**Authentication**\
requires contract authority

**Validation**\
none

**Table Updates**\
The `auth` table is set with default data

<!-- ## `action.name`

**Input Parameters**
```ts

```
**Authentication**\

**Validation**


**Table Updates**\ -->
