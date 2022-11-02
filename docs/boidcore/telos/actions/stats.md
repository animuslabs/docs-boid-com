# Stats actions
Actions related to Stats. In the future there will be functions that read the stats table rows to adjust inflation rates.


## `stats.clean`
remove stats older than 100 rounds in the past. This is just for cleaning up old Stats table rows to recover RAM.

**Input Parameters**
none

**Authentication**\
no auth needed

**Validation**
none

**Table Updates**\
removes any old rows from the `stats` table
