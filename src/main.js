var game;
var TILES;

function handleLoad() {
  setViewbox(-(VIEWBOX_WIDTH / 2), -(VIEWBOX_HEIGHT / 2));

  console.log("Welcome to Drunkopoly");
  console.log(`Players: ${PLAYERS}`);

  TILES = getTiles();

  game = new Game(shuffle(PLAYERS));
}

function setViewbox(x, y, width = VIEWBOX_WIDTH, height = VIEWBOX_HEIGHT) {
  const canvas = document.getElementById("canvas");
  const viewBoxStr = `${x.toString()} ${y.toString()} ${width.toString()} ${height.toString()}`;
  canvas.setAttribute("viewBox", viewBoxStr);
}

function convertClientToViewboxPoint(x, y) {
  const canvas = document.getElementById("canvas");
  const clientPoint = canvas.createSVGPoint();
  clientPoint.x = event.clientX;
  clientPoint.y = event.clientY;
  const transform = canvas.getScreenCTM().inverse();
  const viewboxPoint = clientPoint.matrixTransform(transform);
  return [viewboxPoint.x, viewboxPoint.y];
}
