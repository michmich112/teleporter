/**
 * wrapper to cleanly inject the code and pass the gameSpace context to the developer
 */
function wrapper(fn) {
  const tmp = gameSpace.__proto__.keyE
  gameSpace.__proto__.keyE=function(){fn(this)}
  document.body.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}))
  gameSpace.__proto__.keyE = tmp
}

/**
 * teleports the user to the designated location
 */
function teleport(x, y, space) {
  wrapper((gameSpace) => {
    if(!space) space = gameSpace.mapId || undefined; // set space to current space if undefined
    gameSpace.teleport(x,y,space)
  })
}

/**
 * teleport to your desk
 * Note: you must have first set your desk position with the `setDesk()` function
 */
function desk() {
  const desk = window.localStorage.getItem("desk")
  if(!desk){
    console.error("Desk not set use the setDesk() function")
    return
  }
  const {x, y, mapId}= JSON.parse(desk);
  teleport(x, y, mapId)
}

/**
 * Get the current possiton as an object of the form
 * {
 *  x: int,
 *  y: int,
 *  mapId: string
 * }
 */
function position() {
  let position
  wrapper((gameSpace) => {
    const {x,y} = gameSpace.gameState[gameSpace.id]
    position = {x, y, mapId: gameSpace.mapId}
  })
  return position
}

/**
 * Get the current map
 */
function getMap() {
  let map
  wrapper((gameSpace) => {
    map = gameSpace.mapId
  })
  return map
}

/* returns the maps available
 * returns the map ids and their dimensions
 * {
 *   <mapName>:{
 *      id: <mapId>
 *      sizeX: <X size>
 *      sizeY: <Y size>
 *   }
 * }
 */
function getMaps() {
  let maps
  wrapper((gameSpace) => {
    maps = gameSpace.maps
  })
  maps = Object.values(maps)
      .map(m=>({id:m.id, sizeX: m.dimensions[0], sizeY: m.dimensions[1]}))
      .reduce((acc,cur)=>({...acc,[cur.id]:cur}),{})
  return maps
}

/**
 * lists the maps available 
 * lists the map ids, their dimensions
 */
function listMaps() {
  console.table(getMaps())
}

/* returns an array of players online
 * [
 *   {
 *      id: <player id>
 *      name: <player name>
 *      map: <player current map name>
 *      x: <position X>
 *      y: <position Y>
 *   }
 * ]
 */
function getPlayers() {
  let players = []
  wrapper((gameSpace) => {
    players = Object.keys(gameSpace.gameState)
      .map(id => {
        const p = gameSpace.gameState[id]
        return {
          id,
          name: p.name,
          map: p.map,
          x: p.x,
          y: p.y,
        }
      })
  })
  return players
}

/**
 * teleports the user to the players name or id if it exists
 */
function teleportToPlayer(name) {
  const players = getPlayers()
  const selectedPlayer = players.find(p => p.id === name) || players.find(p => p.name === name)
  if (!selectedPlayer) console.error(`Cannot find player ${name}`)
  teleport(selectedPlayer.x, selectedPlayer.y, selectedPlayer.map)
}

/**
 * teleports the user to the map's spawn location if it exists
 */
function teleportToSpawn(mapId) {
  let maps = []
  wrapper((gameSpace) => {
    maps = gameSpace.maps
    const selectedMap = maps[mapId]
    if (!selectedMap) {
      console.error(`Cannot find map with id ${mapId}`)
      return
    }
    const spawns = selectedMap.spawns
    teleport(spawns[0].x, spawns[0].y, mapId)
  })
}

/**
 * lists online players in console
 */
function listPlayers() {
  console.table(getPlayers())
}

/**
 * Set your desk location to your current position
 */ 
function setDesk() {
  const pos = position()
  window.localStorage.setItem("desk", JSON.stringify(pos))
}

/**
 * teleports the user to the first toilet found in the current room
 * NOTE: You must save your custom toilet object with the word Toilet in it
 */
function shit() {
  let toilets;
  wrapper((gameSpace) => {
    toilets = gameSpace.maps[gameSpace.mapId].objects.filter(o => (o._name || '').includes("Toilet"));
  })
  if (toilets.length < 1) {
    console.error("No toilets found on the current map.");
  }
  teleport(toilets[0].x, toilets[0].y)
}
