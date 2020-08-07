var game;
var TILES;
var CARDS;

function start() {
  setViewbox(-(VIEWBOX_WIDTH / 2), -(VIEWBOX_HEIGHT / 2));

  const players = getPlayers();

  console.log("Welcome to Drunkopoly");
  console.log(`Players: ${players}`);

  TILES = getTilesUppercase();
  CARDS = getCards();

  game = new Game(players);
}

function setViewbox(x, y, width = VIEWBOX_WIDTH, height = VIEWBOX_HEIGHT) {
  const canvas = document.getElementById("canvas");
  const viewBoxStr = `${x.toString()} ${y.toString()} ${width.toString()} ${height.toString()}`;
  canvas.setAttribute("viewBox", viewBoxStr);
}

function getPlayers() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryStringPlayers = urlParams.get("players");
  return queryStringPlayers ? shuffle(queryStringPlayers.split(",")) : INSTRUCTIONS;
}

function restart() {
  game.remove();
  start();
}
