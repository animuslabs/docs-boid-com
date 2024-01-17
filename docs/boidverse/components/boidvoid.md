# BoidVoid Game

## Concept
BoidVoid is a turn-based hex-field game where two or more teams compete to capture all tiles on a map. Each player controls their ship, destroying other teams’ ships and capturing other tiles. The game ends when its season ends.

## Season and games
The season occurs between two specific dates. No two seasons can run at the same time, and each season can have as many games as needed.

## Team composition
There’s no limit to the number of players per team, but each team should have a team leader and a vice-leader. Any other player is considered a trooper. Each player controls a spaceship, and leaders and vice-leaders can control the team’s mothership and swarms.

## Ships
Spaceships are controlled by players. Each spaceship has different characteristics based on the NFT template used. Currently, only one ship template is available. Spaceships can move around, attack other ships, capture tiles and build superstructures. 
Motherships are controlled by the team leader and the vice-leader. They are required to capture tiles. These ships cannot attack other ships, build superstructures or capture tiles.
Swarms are controlled by the team leader and the vice-leader. They can attack other ships but cannot build superstructures or capture tiles.
Spaceships can be either actively controlled by a player or set to automode. Automode ships move automatically to the closest swarm. If there’s no swarm available, the ship starts a new swarm.

## Non-Playable Characters
Non-Playable Characters are units on the map that behave automatically. They can move and attack other units.

## Point of Importance
Points of importance can be captured by players to provide additional bonuses to the players on it.

## Tile
A map is composed by several tiles on a 2D disposition. It’s shaped as a hexagon and contains information about bonuses and other map related elements such as ships, points of importance, captures. Both capture and movement cost are the most basic information a tile can have.

## Obstacle
Obstacles are allocated on tiles so that players cannot move to those tiles. 

## Action Points
Action points are used to move through the map. The action points are recharged once per turn based on the spaceship’s status, and bonuses from the tile, a point of importance and a superstructure.

## Captain and Vice-Captain
Captains and vice captains can move swarms and motherships around and perform actions. There’s no functional difference between one another.

## Turn
The turn is the main unit of time used for players to interact with the game. The turn can be set on the admin portal during the game creation process.

## Automode
Since most players are not expected to participate 24/7, they can activate automode. Ships on automode move to the closest swarm. If no swarm is available, the ship creates a new swarm.

## Boid Battery
The battery is associated to the amount of powered staked BOID the user has. Each turn, the battery is recharged by a certain amount set on the game. During the daily maintenance, the maximum Boid battery is updated.

## Automatic Actions
The game is turn-based, which means that certain actions can be triggered by cronjobs(processes running at set times). The following are considered automatic actions:
-	Season start – executed once per day. If a new season is registered on the admin application, it is automatically activated.
-	Season end – executed once per day. If a season ends at that day, it is automatically deactivated.
-	Daily maintenance – updated battery values based on the Boid API.
-	Turn start – starts a new registered turn for all available games.
-	Turn end – ends the current turn for all available games. This includes updating structure building and captures (and finishing the ones that fulfilled the requirements), moving ships on automode, decrease the number of turns required to respawn spaceships and motherships. 

## Player Actions
During a turn, each player has access to a set of actions. The current section mentions the term “modifier” extensively. These are:
- Moving – A player can move as many times as needed if they have enough action points. The tile’s base movement cost is defined by the game, and each element on the game changes the movement cost on a tile. The movement cost for a tile is as follows:  
```Movement Cost=(tile movement cost)+(tile movement cost modifier)+(point of importance movement cost modifier)+(spaceship movement cost modifier)+(superstructure movement cost modifier)```

**Example:** Spaceship on [1,2] is moving to [3,2]. The ship must move from [1,2] to [2,2] and then from [2,2] to [3,2]. The game’s base movement cost is 3. Each tile has a modifier of (±0) Tile [2,2] has a point of importance with a movement cost modifier of (+2) and tile [3,3] has a superstructure with a movement cost modifier of (-1). The spaceship has a movement cost modifier of (+1). The total movement cost of moving from [1,2] to [3,2] would be (3+0+2+1+0)+(3+0+0+1-1)=9.
- Capture – A spaceship can capture a tile if it is not on a swarm. Starting a capture locks all other actions. Much like the movement cost, the capture cost is set by the game. It is also influenced by the elements on a board. A tile that belongs to another team can also be captured but it will take twice the number of turns. Captures can only be executed if the mothership is not destroyed.
-	Build – A structure NFT can be burned to build a superstructure. The NFT determines the number of turns required to build the structure.
-	Spawn – The player can spawn their spaceship on a tile that belongs to their team. The team’s leader and the vice-leader can spawn the mothership.
-	Manage Boid Battery – The player can change the Boid battery’s value to increase the attack and decrease the defense or vice-versa.
-	Detonate – The player can destroy their own ship.
-	Attack – The player can use their ship (and leaders can use swarms as well) to attack other units. An attack consumes Boid battery.  
  
Each of the values used for combat are based on a set of properties in the previously mentioned elements:  
-	Unit’s NFT – Attack (UAB), Defense (UDB), Critical Chance (UCB), Critical Value (UCV), Range (URB), Health (UCH), and if it is a spaceship, the Current Boid Battery (CBB), Attack Ratio (SAR) and Defense Ratio (SDR).
-	Tile’s NFT – Attack (TAB), Defense (TDB), Critical Chance (TCC), Critical Value (TCV) and Range (TRB).
-	Point of importance NFT - Attack (POIAB), Defense (POIDB), Critical Chance (POICC), Critical Value (POICV) and Range (POIRB).
-	Superstructure NFT - Attack (SSAB), Defense (SSDB), Critical Chance (SSCC), Critical Value (SSCV) and Range (SSRB).  
  
Combat occurs through a set of well-defined steps:  
1. Determine the player’s unit range as URB if the unit is a spaceship, mothership, superstructure, or non-playable character, or Max(URB) if the unit is a swarm.
2. Determine the distance between the player’s unit and the target’s unit. If the distance is greater than the range, an exception is thrown.
3. Determine the player’s main attack as <MathDisplay content="CBB \times SAR/100" /> if the unit is a spaceship or <MathDisplay content="\sum ((CBB \times SAR)/100)" /> if it is a swarm.
4. Determine the player’s unit additional damage as <MathDisplay content="UAB" /> if the unit is a spaceship, superstructure or non-playable character, or <MathDisplay content="\sum x" /> if the unit is a swarm, where \( x \) are the ships, whose range is greater or equal to the distance between the units.
5. Determine the bonus attack as <MathDisplay content="(TAB + POIAB + SSAB) \%" />
6. Determine the unit’s critical chance as <MathDisplay content="x + TCC + POICC + SSCC" /> up to the limit defined by the game’s setting, where <MathDisplay content="x=UCC"/> if the unit is a spaceship, a superstructure, a mothership, or a non-playable character, or <MathDisplay content="x = \overline{UCC}" /> if the unit is a swarm.
7. Compare the result of the critical chance with a random number. If the random number is lesser than the chance, determine the critical damage as <MathDisplay content="x + TCV + POICV + SSCV" /> where <MathDisplay content="x = UCV" /> if the unit is a spaceship, a superstructure, a mothership or a non-playable character, or <MathDisplay content="x = \overline{UCV}" /> if the unit is a swarm.
8. Determine the target’s shields if the unit’s a spaceship <MathDisplay content="(CBB \times SDR)/100" />or for a swarm <MathDisplay content="\sum ((CBB \times SDR)/100)" />
9. Determine the target’s unit defense as <MathDisplay content="UAB"/> if the unit is a spaceship, superstructure or non-playable character, or <MathDisplay content="\sum UAB" /> if the unit is a swarm.
10. Determine the bonus defense as <MathDisplay content="(TDB + POIDB + SSDB) \%" />
11. Determine the damage dealt as <MathDisplay content="(main \, attack + additional \, attack) \times (1 + \frac{bonus \, attack}{100}) \times (1 + \frac{critical \, damage}{100})" />
12. Determine the total defense as <MathDisplay content="shields + (defense \times (1 + \frac{bonus \, defense}{100}))" />
13.	Repeat steps 1 to 12, skipping step 2, for the target unit.
14.	Update the player’s damage dealt.
15.	Determine the target’s damage taken. If the damage taken is greater than defense + current health, end.
16.	Check if the game allows counterattack. If it does not, end.
17.	Check if the distance between the units is greater than the target’s range. If it is, end.
18.	Update the target’s damage dealt.
19.	Determine the player’s damage taken.
20.	End.  

After the combat is executed, the units are obtained from the database and updated.
If the unit is a spaceship:
1.	Update main attack. If the unit is a spaceship, decrease their battery by <MathDisplay content="(CBB*SAR)/100. "/>
2.	Update shields. If the game has the “Deplete battery on defense” enabled, or the damage taken is greater than the shields, decrease the shields by <MathDisplay content="(CBB*SDR)/100"/> Otherwise, deduct the damage taken from the battery.
3.	If the damage taken is 0 (zero), end.
4.	Deduct the unit’s defense from the damage taken.
5.	If the damage taken is 0 (zero), end.
6.	Deduct the damage from the current health.
7.	End.  

If the unit is a mothership, superstructure or nonplayable character.
1.	Deduct the unit’s defense from the damage taken.
2.	If the damage taken is 0 (zero), end.
3.	Deduct the damage from the current health.
4.	End.  

If the unit is a swarm
1.	Order the unit list based on the damage distribution setting:
    1. If it is set to stronger first, order the units descending by <MathDisplay content="shields + (defense \times (1 + \frac{bonus \, defense}{100}))" />set the damage value to damage taken, and enable the damage decrease flag.
    2. If it is set to weak first, order the units ascending by <MathDisplay content="shields + (defense \times (1 + \frac{bonus \, defense}{100}))" />set the damage value to damage taken, and enable the damage decrease flag.
    3. If it is set to random, randomly order the unit list, set the damage value to damage taken, and enable the damage decrease flag.
    4. If the unit damage distribution setting is to spread, set the damage value to <MathDisplay content="damage / (\text{number of units in swarm})" /> and disable the damage decrease flag.
2.	Update each ship status.
    1. Set current damage dealt as 0.
    2. If the ship’s range is greater or equal to, update the main attack by decreasing their battery by <MathDisplay content="(CBB \times SAR)/100" />
    3. Update shields. If the game has the “Deplete battery on defense” enabled, or the damage is greater than the shields, decrease the shields by <MathDisplay content="(CBB \times SDR)/100" />Otherwise, increase the current damage dealt by the same amount.
    4. If the current damage dealt is greater than the damage value, end cycle.
    5. Deduct the ship’s defense.
    6. If the damage taken is 0 (zero), end.
    7. Deduct the damage from the current health.
    8. End.

- Create a Swarm – The player can create a new swarm that other ships can join.
- Join a Swarm – The player can join a swarm.
- Leave a Swarm – The player can leave a swarm. This will deduct all the player’s action points and move the ship to an adjacent tile to the swarm.

## Using NFTs
NFTs or Non-Fungible Tokens are used to describe elements on a game from a collectible item perspective. These tokens also provide additional stats to the game’s elements. Each NFT is composed by immutable data such as their id (a long value), their owner, a mint number, a collection, a schema, a template e a set of properties, such as the possibility of transferability or token burning.  
In both the schema and template, it is also possible to add certain characteristics, which are, in this case, a sprite to display on the game and status modifiers. The following are statuses that can be affected by modifiers:  
-	Attack (On spaceships, motherships and superstructures)
-	Defense (On spaceships, motherships and superstructures)
-	Health (On spaceships, motherships and superstructures)
-	Cost to Move (On spaceships and motherships)
-	Range (On spaceships, motherships and superstructures)
-	Respawn Rate (On spaceships and motherships)
-	Critical Chance (On spaceships)
-	Swarm Join Turns (On spaceships)
-	Build Rate (On superstructures)
-	Battery (On Spaceships)
-	Battery Recovery (On Spaceships)  
  
From this, besides collectibles like obstacles, non-playable characters and points of importance, two other NFT schemas could be proposed, with the first one being related to the type of spaceship, mothership and superstructure that the player has in the game and the second one being the boosts which the player could burn or stake to provide additional bonuses to their ships, swarms, superstructures and motherships for a certain period. In summary, the following could be potential NFTs:  
-	Boosts – Powerup your units temporarily.
-	Avatars – Cosmetic.
-	Spaceships – Change the aspect and features of spaceships.
-	Motherships – Change the aspect and features of motherships.
-	Collectibles – Keep them in an album.
- Superstructures – Stack them through burning or stake to level structures.
