# Auth Table

The `Auth` table serves to store temporary authorization records when utilizing key authentication. It holds an entry for the `boid_id` that has been verified through the `auth` action. This action, when called with a valid signature and action set, updates the `Auth` table with the `boid_id` and executes the intended actions. The system maintains a state of temporary authorization - once the authorized actions are completed, the `boid_id` record reverts back to the system default, typically to the `boid` account for system-level operations. It is a quick-lived placeholder that ensures the `Auth` table normally displays the default value unless an authorization process is in progress.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/auth.ts)

Scope: `boid`
Index: None (singleton)

## Table Definition

```ts
@table("auth", singleton)
export class Auth extends Table {
  constructor(
    public boid_id_auth: Name = new Name()
  ) {
    super();
  }
}
```

## Table Updates

- `boid_id_auth`: Stores the currently authenticated `boid_id`. It's set during the execution of an `auth` action and is reset after completing the signed actions sequence. This field is a `Name` representing either the active authenticated account or the default system authority.

Please note that there have been changes from the previously documented `actions_num` property, which indicated the count of authenticated actions. In the current implementation, this property has been removed, simplifying the authorization tracking mechanism.

***
