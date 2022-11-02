# Config Actions
This page covers all actions related to global config. The specifics of the config are covered on the [Config Table](../tables/config) page.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/2-config.ts)

## `config.set`
Overwrites the current config with a new one

**Input Parameters**
```ts
// the full config row
config:Config
```
**Authentication**\
contract authority

**Validation**
not validated (TODO)

**Table Updates**\
set the `config` table with new data

## `config.clear`

**Input Parameters**\
none

**Authentication**\
contract authority

**Validation**
none

**Table Updates**\
makes the `config` table empty

<!-- ## `action.name`

**Input Parameters**
```ts

```
**Authentication**\

**Validation**


**Table Updates**\ -->
