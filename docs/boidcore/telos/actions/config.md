# Config Actions

This section outlines the actions associated with the system's global configuration. For specifics on the configuration structure, please refer to the [Config Table](../tables/config.md) page.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/2-config.ts)

## `config.set`

Updates the current configuration to a new one provided by the caller.

**Input Parameters**

```ts
// The full Config object structure
config: Config
```

**Authentication**

- Requires contract authority, typically invoked by other authorized actions.

**Validation**
Checks are performed to ensure that:

- `max_premium_prefix` is greater than or equal to 1.
- `sponsor_tax_mult` is a value between 0 and 1, inclusive.
- `powered_stake_mult` is non-negative.
- `round_power_mult` is non-negative.
- `round_powered_stake_mult` is non-negative.

**Table Updates**

- Updates the `config` table with new configuration data provided.

## `config.clear`

Clears the configuration table entirely.

**Input Parameters**

- None.

**Authentication**

- Requires contract authority.

**Validation**

- None.

**Table Updates**

- Clears the `config` table, effectively removing all configurations.

## `global.set`

Sets the global data with provided values.

**Input Parameters**

```ts
// The complete Global object structure
globalData: Global
```

**Authentication**

- Requires contract authority.

**Validation**

- None noted, but it may involve ensuring that the provided global data is valid according to application logic.

**Table Updates**

- Persists the provided global data into the `global` table.

## `global.clear`

Removes all entries from the global table.

**Input Parameters**

- None.

**Authentication**

- Requires contract authority.

**Validation**

- None.

**Table Updates**

- Empties the `global` table by removing all of its records.

## `global.chain`

Updates the chain name in the global table.

**Input Parameters**

```ts
// The new chain name
chain_name: Name
```

**Authentication**

- Requires contract authority.

**Validation**

- Ensures the chain name provided is a valid `Name` type.

**Table Updates**

- Updates the `chain_name` field in the `global` table with the new value.

