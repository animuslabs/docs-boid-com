# BoidVoid Testnet tutorial
## Getting started
When starting, select the login option and enter the username and password provided by the game administration.
 ![login](https://user-images.githubusercontent.com/77274330/127521882-e77f6e07-1d29-4647-847a-fb78b4e408a8.png)
Then, start the game by pressing Start and selecting the game you want to join.
 ![games](https://user-images.githubusercontent.com/77274330/127522083-53678c2c-9daa-4f6c-a5a5-ad76d284f31c.png)

Then, after waiting for the game to load, you should be able to see the game Map.
 ![map](https://user-images.githubusercontent.com/77274330/127522197-dd5551e0-46ae-4efb-9f8d-c9949d14c46e.png)

The top bar has the button to open the User Menu on the right, then the player's health, boid battery value, the player's team mothership's health, available action points, turn number and how long untill the end of the turn.
**Action Points:** these are essencial to move through the map, every tile has a certain Movement cost, in action points. The total cost of a movement will be the sum of the movement cost of each tile in the path. Every turn more action points will be added.
Near the end of the turn all actions will be blocked.
In every turn, only one action (other than moving) can be taken.
If a ship suffers damage and health is deducted, if the health value reaches zero, the ship will be destroyed.
Just under the top bar, the controllable units are displayed.
 
If the unit is **Respawning**, no actions can be taken (with this unit) other than respawning, once the **Can now Respawn** message shows up.
![cannowrespawn](https://user-images.githubusercontent.com/77274330/127522468-312c6cc0-f980-4cbf-a636-5ba4f688dfad.png)
If the player is a leader or vice-leader, they can also **Switch** to other ships available, like the mothership or possibly a swarm.
From the controllable units, a ship can also be **detonated**, effectively destroying the ship, or ships if they are in a swarm.
Whenever a tile is pressed, the **Side Panel** opens.

![sidepanel](https://user-images.githubusercontent.com/77274330/127522614-22c0a9d8-f423-4fe7-a449-7a3149005eb7.png)
![sidepanel2](https://user-images.githubusercontent.com/77274330/127522630-164bc222-987c-46e7-813f-00894248028e.png)

  
The side panel has information regarding the tile that was chosen, such as capture and movement cost, total movement cost for a certain path, if the tile is captured, capturing or free. It also shows the tile bonus for attack, defense and action points recovery.
In the More tab, the elements, such as ships, superstructures or non-player characters are shown. As well as possible actions than can be taken.

## Actions
Spaceships, Motherships and Swarms can all **Move** in the map. They will only be able to move if the total movement cost is lower or equal to the action points available to that ship.
![move](https://user-images.githubusercontent.com/77274330/127522944-dad3f378-8c4a-463a-ba0f-b52e37b71f96.png)

It's not possible to move to tiles where there are other ships, obstacles, superstructures, or any other element, other than Points of Importance.
It's not possible to have a path go through tiles where there are obstacles or any ships from a different team.
 

A player can **Capture** any tile where they are on. 

![capture](https://user-images.githubusercontent.com/77274330/127524052-6cfa1921-a26d-48e5-8203-ab2551453baa.png)

Captured tiles appear with the outside color of the team that has captured them. The capture cost is in turns spent there. While a player is capturing a tile they cannot leave the capturing tile, or else all progress will be lost. Capturing a tile that belongs to a different team will normally take longer than capturing a free tile. One of the main goals of the game is to capture the biggest amount of tiles, and have the biggest map territory.

A player with a spaceship adjacent, or within a certain range, to a ship from a different team can **Attack** that ship. Both spaceships and swarms can attack. The targets of the attack can be spaceships, motherships, swarms, superstructures, npcs, as long as the target is not from the players team.

 ![attack](https://user-images.githubusercontent.com/77274330/127524274-3f6fd47d-6af3-47b1-bca7-234ef91fb163.png)

When a ship attacks another, they can give and receive damage. The attack value will be based on the boid battery value, the chosen ratio and bonuses applied. After the combat, the boid battery expended in the attack will be deducted, as well as deducted the damage taken from the ships health.
 
![attackresult](https://user-images.githubusercontent.com/77274330/127524359-6895aba1-d881-4b5a-9653-ab63fc059d3b.png)

In a tile already captured by the players team, the player can **Build** a superstructure. This will also have a building cost, in turns spent there. If the player leaves the tile before the built is completed, all progress will be lost.



A player will also have the option to **Create, Join or Leave** a swarm. To create a swarm, the player has to select the tile where their spaceship is in the map, then choose a name for the swarm and create it.

![swarm](https://user-images.githubusercontent.com/77274330/127524841-e78b1193-6b64-4b5b-b830-5e614b108d38.png)


To join a swarm the player must to a tile adjencent to the tile where the swarm is, and press join swarm. After that point the only option, if the player is not a leader or a vice-leader, is to leave the swarm.
To leave the swarm, the player must select the tile where they wish to go, and press leave swarm.
If the player is a leader or a vice-leader, they can choose to switch to one of the teams swarms, and controll it, even if their spaceship isn´t in the swarm.
 

Still in the side panel, there is access to the details panel, where the player can get detailed information about the selected tile.

![details](https://user-images.githubusercontent.com/77274330/127524914-feca98af-7280-455b-8dee-1cbaeb973fa6.png)

 
## Profile
To keep track of the players data, the **Profile Menu** can be accessed, from the top bar.
 
 ![profile](https://user-images.githubusercontent.com/77274330/127524952-02de00b3-b24e-46ee-a1c2-7cfa0443246b.png)

The boid battery ratio can be adjusted in the Boid Battery tab.
![boidbattery](https://user-images.githubusercontent.com/77274330/127633480-500eeef4-c7d5-4762-ac44-5ebbe9fab641.png)


The team tab has information about each of the player's team members.

![team](https://user-images.githubusercontent.com/77274330/127633511-f84935c9-2ca3-4f08-9c20-294b34854f59.png)
The user can also see the game's logs and the acquired badges.





