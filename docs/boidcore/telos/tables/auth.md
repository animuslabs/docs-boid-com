# Auth Table
The Auth table is a simple table to save temporary information about accounts using key authentication. When the `auth` action is called and a valid signature + actions are provided the action updates the `auth` table with the name of the authenticated boid_id and triggers the signed actions. When another account isn't authenticated the default value is `boid` for system contract auth. The table is only modified temporarily during a sequence of actions which revert the change as a last step so when looking at the table normally it should always have the default value.

[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/tables/auth.ts)
\
Scope: `boid`
\
Index: none (singleton)

## Overview
```ts
@table("auth", singleton)
class Auth extends Table {
  // The authenticated boid_id
  boid_id_auth:Name
  // the number of authenticated actions
  // after this many actions have been processed the value is returned to the default
  actions_num:u8 = 0
}
```
***
