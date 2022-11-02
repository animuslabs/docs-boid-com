# Functions
This page descibes some of the most commonly used contract internal functions
[Source](https://github.com/animuslabs/boid-system-ts/blob/master/assembly/actions/1-init.ts)

## `requireBoidAuth`
This function checks the account owners and the key authentication table to see if a specific boid account is authenticated to perform an action. Optionally the function can force owner-only authentication for critical actions.

## `updateStats`
Takes in some new data to be added to the stats table, checks if a row already exists for the current row and updates or creates a new row.

## `addAccountStake`
This action adds stake to an account and updates the accounts table with the new data
