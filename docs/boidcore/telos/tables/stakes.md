# Stakes Table Documentation

The `stakes` table records the delegation transactions between two BOID accounts, tracking the details of each stake. It identifies the delegator and delegate, as well as the amount and duration of the stake.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/stakes.ts)

Scope: `boid`
\
Primary Index: `stake_id` (unique)
\
Secondary Index: `from_boid_id`

## Table Structure

The `Stake` class extends the `Table` class and is structured with the following fields:

```ts
@table("stakes")
export class Stake extends Table {
  constructor(
    public stake_id: u64 = 0,             // Unique identifier for each stake.
    public from_boid_id: Name = new Name(), // The delegator's account name (owner of the stake).
    public to_boid_id: Name = new Name(),   // The delegate's account name (recipient of the stake).
    public stake_quantity: u16 = 0,         // Delegated BOID amount in 10k units. 1 unit equals 10k BOID.
    public locked_until_round: u16 = 0      // The lock-up period end, after which unstaking is allowed.
  ) {
    super()
  }

  @primary
  get primary(): u64 {
    return this.stake_id // Primary key for the stake record.
  }

  @secondary
  get byFrom(): u64 {
    return this.from_boid_id.value // Secondary key indexed by delegator's account name.
  }

  set byFrom(value: u64) {
    this.from_boid_id.N = value // Setter to update the delegator's account name.
  }
}
```

## Usage

The stakes table is used within smart contracts to manage the delegation of BOID tokens between accounts. The stakes are quantified in fixed increments to optimize resource usage and mitigate potential abuse.

Fields such as `stake_id` and `from_boid_id` function as the primary and secondary indices, respectively, allowing for efficient querying of records based on the unique stake identifier or the delegator’s account name.

## Table Updates

- `stake_id`: The `stake_id` serves as the unique identifier and is the primary key of the `stakes` table. It is automatically assigned by the smart contract during the creation of a stake.

- `from_boid_id`: This field holds the Name of the delegating user's BOID account (the stake owner). It is indexed as the second key in the table for quick lookups by delegator account name.

- `to_boid_id`: The stake's recipient BOID account name is stored here.

- `stake_quantity`: Indicates the delegated amount in multitudes of 10,000 BOID units. The value is of type `u16`, meaning it holds up to 65,535 increments, each equivalent to 10k BOID.

- `locked_until_round`: This field marks the round number post which the delegation can be reversed or unstaked. It safeguards the commitment for the duration of the locked rounds.

## Implementation Details

- Requires contract authority, calling for inline actions or inter-contract communication.
- Secondary index `from_boid_id` aids in transactions where stakes need to be queried by the delegator, like aggregating all stakes made by a specific account.
- The `stakes` table is essential for monitoring and enforcing stake contracts within the BOID ecosystem, ensuring proper delegation and accounting of staked funds.

Remember that modifications to the smart contract logic may necessitate updates to this documentation to maintain its accuracy and relevance.
