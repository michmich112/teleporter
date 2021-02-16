# Teleporter

A gather.town teleporter extension which gives the possibility to users to use special commands in the console.

## Installation

Copy or clone the repo, then open chrome and go to [chrome://extensions/](chrome://extensions/) which will bring you to the extension manager page.
On the extension manager, go to the upper left corner to `Load Unpacked`, click on it, then select the repo on your local system.
Toggle the extension on and you are ready to go.

## Usage

In the console the following functions are available to you:

| function         | description                                                |
| ---------------- | ---------------------------------------------------------- |
| desk             | teleport to your desk position                            |
| getMap           | get the current map                                        |
| getMaps          | returns all the maps for your environment                  |
| getPlayers       | teleports your avatar in a selected space                  |
| listMaps         | prints all the mpas                                        |
| listPlayers      | teleports your avatar in a selected space                  |
| position         | get the current position                                   |
| setDesk          | save current position as desk position                    |
| shit             | go to a toilet on the current map                          |
| teleport         | teleports your avatar in a selected space                  |
| teleportToPlayer | teleports your avatar in a selected space                  |
| teleportToSpawn  | teleports your avatar to a selected space's spawn location |

### Details

#### desk
Teleport to your desks position
Note: must have set your desk's position beforehand using the `setDesk()` function.
```
/**
 * teleport to your desk's position
 */
desk()
```

#### getMap

```
/**
 * returns the current map id
 */
getMap()
```

#### getMaps

```
/**
 * returns all the maps and their x and y dimensions
 */
 getMaps()
```

returns:

```
{
  "<mapId>": {
    id: "<mapId>",
    sizeX: <sizeX>,
    sizeY: <sizeY>,
  }
}
```

#### getPlayers

```
/**
 * returns an array of players online
 */
 getPlayers()
```

returns:

```
[
  {
    id: <player id>
    name: <player name>
    map: <player current map name>
    x: <position X>
    y: <position Y>
  }
]
```

#### listMaps

Lists all the maps and their dimensions to the console

```
/**
 * Lists all the maps and their dimensions to the console
 */
getMaps()
```

#### listPlayers

Lists online players to the console

```
/**
 * Lists online players to the console
 */
listPlayers()
```

#### position

Get the current position

```
/**
 * Get the current poisition and map Id
 */
position()
```

#### setDesk
Set your current position as your desks position.
Note: you only need to set it once as it persists on local storage
```
/**
 * Set your current position as your desks position
 */
setDesk()
```

#### shit

Go to the first toilet found on the current map.
Displays an error message if no toilets are found.
Note: the name of your custom toilet object must includet the word `Toilet` (case sensitive)
```
/**
 * teleports you to the first toilet found
 */
shit()
```

#### Teleport

```
/**
 * teleports you to anywhere in gather
 * @param x {int}         : x position to teleport to on the space
 * @param y {int}         : y position to teleport to on the space
 * @param space {string}  : (optional) space to teleport to,
 *                          if omitted teleport to the desired coordinates in the current space
 */
teleport(x, y, space)
```

Note: You can only teleport yourself

#### Teleport to player

```
/**
 * teleports you to an online player
 * @param name {string}         : the name or the id of the player you want to teleport to
 */
teleportToPlayer(name)
```

Note: The player must be online

#### Teleport to map's spawn location

```
/**
 * teleports you to a map's spawn location
 * @param mapId {string}         : the id of the map you want to teleport to
 */
teleportToSpawn(mapId)
```

Note: The map ID must be valid
