# Teleporter
A gather.town teleporter extension which gives the possibility to users to use a `teleport(x, y, space)` command in the console.

## Installation
Copy or clone the repo, then open chrome and go to [chrome://extensions/](chrome://extensions/) which will bring you to the extension manager page.
On the extension manager, go to the upper left corner to `Load Unpacked`, click on it, then select the repo on your local system.
Toggle the extension on and you are ready to go.

## Usage
In the console the following functions are available to you:

| function | description |
| -------- | ----------- |
| teleport | teleports your avatar in a selected space |
| getMap   | get the current map |
| getMaps  | returns all the maps for your environment |
| listMaps | prints all the mpas |

### Details

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

#### listMaps
Lists all the maps and their dimensions to the console
```
/**
 * Lists all the maps and their dimensions to the console
 */
getMaps()
```
