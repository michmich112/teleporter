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
function teleport(x, y, sace) {
  wrapper((gameSpace) => {
    if(!space) space = gameSpace.mapId || undefined; // set space to current space if undefined
    gameSpace.teleport(x,y,space)
  })
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
