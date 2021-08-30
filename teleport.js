/**
 * wrapper to cleanly inject the code and pass the gameSpace context to the developer
 */
function wrapper(fn) {
  const tmp = gameSpace.__proto__.keyE
  gameSpace.__proto__.keyE = function() { fn(this) }
  document.body.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'e' }))
  gameSpace.__proto__.keyE = tmp
}

/**
 * teleports n time around the map
 * @param n: number : number of time to teleport around the map
 * @param delay: number: (optional) number of ms between each teleport (defaults to 690)
 */
function breakAnkles(n, delay) {
  let dim // dimensions of the current map
  wrapper(gameSpace => {
    [x, y] = gameSpace.maps[gameSpace.mapId].dimensions
    dim = { x, y }
  })
  for (let i = 0; i < n; i++) {
    setTimeout(() => teleport(Math.round(Math.random() * dim.x), Math.round(Math.random() * dim.y)), (delay ?? 690) * i)
  }
}

/**
 * teleports the user to the designated location
 */
function teleport(x, y, space) {
  wrapper((gameSpace) => {
    if (!space) space = gameSpace.mapId || undefined; // set space to current space if undefined
    gameSpace.teleport(x, y, space)
  })
}

/**
 * teleport to your desk
 * Note: you must have first set your desk position with the `setDesk()` function
 */
function desk() {
  const desk = window.localStorage.getItem("desk")
  if (!desk) {
    console.error("Desk not set use the setDesk() function")
    return
  }
  const { x, y, mapId } = JSON.parse(desk);
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
    const { x, y } = gameSpace.gameState[gameSpace.id]
    position = { x, y, mapId: gameSpace.mapId }
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
    .map(m => ({ id: m.id, sizeX: m.dimensions[0], sizeY: m.dimensions[1] }))
    .reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
  return maps
}

/**
 * lists the maps available 
 * lists the map ids, their dimensions
 */
function listMaps() {
  console.table(getMaps())
}

/**
 * get your player information
 */
function getPlayer() {
  let player
  wrapper((gameSpace) => {
    const p = gameSpace.gameState[gameSpace.id]
    player = {
      id: gameSpace.id,
      name: p.name,
      emojiStatus: p.emojiStatus,
      map: p.map,
      x: p.x,
      y: p.y,
    }
  })
  return player
}

/* returns an array of players online
 * [
 *   {
 *      id: <player id>
 *      name: <player name>
 *      emojiStatus: <players emojiStatus if available
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
          emojiStatus: p.emojiStatus,
          map: p.map,
          x: p.x,
          y: p.y,
        }
      })
  })
  return players
}

/*
 * get maps containing an item with a certain name.
 */
function getMapsWithItemName(itemName) {
  let mapsWithItemName = [];
  wrapper((gameSpace) => {
    const mapKeys = Object.keys(gameSpace.maps);
    mapsWithItemName = mapKeys
      .filter(
        key =>
          gameSpace.maps[key].objects.filter(o =>
            (o._name || "").includes(itemName)
          ).length > 0
      )
      .map(key => gameSpace.maps[key]);
  })
  return mapsWithItemName;
}

/*
 * activates ghost mode until g is pressed.
 */
function ghost() {
  document.body.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'g' }))
}

/**
 * teleports the user to the players name or id if it exists
 */
function teleportToPlayer(name) {
  const selectedPlayer = findPlayer(name)
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
 * teleports the user to a toilet of their choice
 * NOTE: You must save your custom toilet object with the word Toilet in it
 */
function shit() {
  const mapsWithShitters = getMapsWithItemName("Toilet");
  const mapIdsWithIndexes = mapsWithShitters.map((m, idx) => `${idx}: ${m.id}`);
  const selectedMapIdOrIndex = prompt(
    `In which room would you like to go to the bathroom? Enter index or name. \nAvailable rooms:\n${mapIdsWithIndexes.join(
      "\n"
    )}`
  );

  // get map
  const selectedMap =
    mapsWithShitters[selectedMapIdOrIndex] ||
    mapsWithShitters[
    mapsWithShitters.findIndex(m => m.id === selectedMapIdOrIndex)
    ];
  if (!selectedMap) {
    console.error("Your input is invalid.");
    return;
  }

  // get toilets
  const shitters = selectedMap.objects.filter(o =>
    (o._name || "").includes("Toilet")
  );
  if (shitters.length < 1) {
    console.error("Map doesn't have a bathroom.");
  }

  // get non-occupied toilets
  const currentPlayersInMap = getPlayers().filter(
    p => p.map === selectedMap.id
  );
  shitters.forEach((s, shitterIndex) => {
    const playerTakingAShit = currentPlayersInMap.filter(
      p => p.x === s.x && p.y === s.y
    )[0];
    shitters[shitterIndex].occupied = playerTakingAShit;
  });
  let availableShitterIndexes = [];
  for (let i = 0; i < shitters.length; i++) {
    if (!shitters[i].occupied) {
      availableShitterIndexes.push(i + 1);
    }
  }
  const selectedShitterIndex = prompt(
    `Which seat would you like to take?\nAvailable seats: ${availableShitterIndexes.join(
      ", "
    )}`
  );
  if (!shitters[selectedShitterIndex - 1]) {
    alert("Toilet isn't valid.");
  } else {
    teleport(
      shitters[selectedShitterIndex - 1].x,
      shitters[selectedShitterIndex - 1].y,
      selectedMap.id
    );
  }
}

/*
 * teleports the user to an available seat at a bar of their choice.
 */
function shot() {
  const mapsWithBarStools = getMapsWithItemName("bar-stool");
  const mapIdsWithIndexes = mapsWithBarStools.map(
    (m, idx) => `${idx}: ${m.id}`
  );
  const selectedMapIdOrIndex = prompt(
    `Which bar would you like to go to? Enter index or name. \nAvailable bars:\n${mapIdsWithIndexes.join(
      "\n"
    )}`
  );

  // get map
  const selectedMap =
    mapsWithBarStools[selectedMapIdOrIndex] ||
    mapsWithBarStools[
    mapsWithBarStools.findIndex(m => m.id === selectedMapIdOrIndex)
    ];
  if (!selectedMap) {
    console.error("Your input is invalid.");
    return;
  }

  // get bar stools
  const barStools = selectedMap.objects.filter(o =>
    (o._name || "").includes("bar-stool")
  );
  if (barStools.length < 1) {
    console.error("Map doesn't have a bar.");
    return;
  }

  // get non-occupied bar stools
  const currentPlayersAtBar = getPlayers().filter(
    p => p.map === selectedMap.id
  );
  barStools.forEach((s, seatIndex) => {
    const playerAtSeat = currentPlayersAtBar.filter(
      p => p.x === s.x && p.y === s.y
    )[0];
    barStools[seatIndex].occupied = playerAtSeat;
  });
  let availableBarStoolsIndexes = [];
  for (let i = 0; i < barStools.length; i++) {
    if (!barStools[i].occupied) {
      availableBarStoolsIndexes.push(i + 1);
    }
  }
  const selectedStoolIndex = prompt(
    `Which seat would you like to take?\nAvailable seats: ${availableBarStoolsIndexes.join(
      ", "
    )}`
  );
  if (!barStools[selectedStoolIndex - 1]) {
    alert("Seat isn't valid.");
  } else {
    teleport(
      barStools[selectedStoolIndex - 1].x,
      barStools[selectedStoolIndex - 1].y,
      selectedMap.id
    );
  }
}

/*
 * teleports you to a random dnd tile in the same room.
 */
function dnd() {
  const DND_TILE_NAME = "dnd-tile";
  let dndTiles;
  let currentMapId;

  wrapper(gameSpace => {
    dndTiles = gameSpace.maps[gameSpace.mapId].objects.filter(o =>
      (o._name || "").includes(DND_TILE_NAME)
    );
    currentMapId = gameSpace.mapId;
  });
  if (dndTiles.length < 1) {
    console.error("No DND tiles found on current map.");
    return;
  }
  const currentPlayersInRoom = getPlayers().filter(p => p.map === currentMapId);
  dndTiles.forEach((t, tileIndex) => {
    const playerOnTile = currentPlayersInRoom.filter(
      p => p.x === t.x && p.y === t.y
    )[0];
    dndTiles[tileIndex].occupied = playerOnTile;
  });
  const availableDNDTiles = dndTiles.filter(t => !t.occupied);
  const randomDNDTile =
    availableDNDTiles[Math.floor(Math.random() * availableDNDTiles.length + 1)];
  teleport(randomDNDTile.x, randomDNDTile.y, currentMapId);
  ghost();
}

/**
 * Find a specific user
 */
function findPlayer(filter) {
  const players = getPlayers()
  const selectedPlayer = players.find(p => {
    normalize = (w) => w.toLowerCase().replace(' ', '');
    return [p.id, p.name, `${p.name} ${p.emojiStatus}`].map(normalize).includes(normalize(filter));
  })
  if (!selectedPlayer) console.error(`Cannot find player ${filter}`)
  return selectedPlayer
}

/**
 * Ring a user 
 */
function ring(name) {
  const player = findPlayer(name)
  wrapper((gameSpace) => {
    gameSpace.ringUser(player.id)
  })
}

/**
 * Make some one come to you.
 * Still needs to cancel the move of the player that is calling joinMe.
 */
function joinMe(name) {
  const player = findPlayer(name)
  wrapper((gameSpace) => {
    gameSpace.whisper(player.id)

    // need to cancel your player move.
  })
}

/*
 * update jukebox song
 * requires object with jukebox (case-sensitive) as a name
 */
function changeSong(
  songURL,
  playStartHours,
  playStartMinutes,
  playStartSeconds
) {
  const JUKEBOX_NAME = "jukebox";
  let jukebox;
  let songToPlay;
  let timeToStartPlayingInSeconds;

  wrapper(gameSpace => {
    jukebox = gameSpace.maps[gameSpace.mapId].objects.filter(o =>
      (o._name || "").includes(JUKEBOX_NAME)
    )[0];
  });

  if (!jukebox || jukebox.length === 0) {
    console.error("There are no public jukeboxes in this map!")
    return;
  }

  if (!songURL) {
    songToPlay = jukebox.properties.video;
  } else {
    songToPlay = songURL;
  }

  if (!playStartHours || !playStartMinutes || !playStartSeconds) {
    timeToStartPlayingInSeconds = new Date().getTime() / 1000; // now
  } else {
    const timeToStartPlaying = new Date();
    timeToStartPlaying.setHours(
      playStartHours,
      playStartMinutes,
      playStartSeconds
    );
    timeToStartPlayingInSeconds = timeToStartPlaying.getTime() / 1000;
  }

  jukebox.properties.video = songToPlay;
  jukebox.properties.startTime._seconds = timeToStartPlayingInSeconds;
  jukebox.objectStartTime._seconds = timeToStartPlayingInSeconds;
}
