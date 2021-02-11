function teleport(x,y, space) {
  const tmp = gameSpace.__proto__.keyE
  gameSpace.__proto__.keyE=function(){(space || undefined) && this.teleport(x,y,space)}
  document.body.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}))
  gameSpace.__proto__.keyE = tmp
}
