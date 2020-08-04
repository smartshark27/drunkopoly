class Tile extends Component {
  constructor(x, pos, playerNames) {
    super();
    this.x = x;
    this.pos = pos;
    this.playerNames = playerNames;

    const data = this._getTile(pos);
    this.color = data.color;
    this.textColor = data.textColor;
    this.desc = data.desc;
    this.onLand = data.onLand;

    this._draw();
  }

  shift(displacement) {
    this.elements.forEach(element => {
      const [x,_] = element.getXY();
      element.setAttribute("x", x + displacement);
    })
  }

  getPosition() {
    return this.pos;
  }

  getOnLand() {
    return this.onLand;
  }

  _draw() {
    this._drawTile();
    this._drawDesc();
    this._drawPlayerNames();
  }

  _drawTile() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", this.x)
        .setAttribute("y", TILE_Y)
        .setAttribute("width", TILE_WIDTH)
        .setAttribute("height", TILE_HEIGHT)
        .setAttribute("rx", TILE_CORNER_RADIUS)
        .setAttribute("rx", TILE_CORNER_RADIUS)
        .setAttribute("fill", this.color)
    );
  }

  _drawDesc() {
    const lines = splitTextIntoLines(this.desc, TILE_DESC_MAX_CHAR_PER_LINE);
    for (var i = 0; i < lines.length; i++) {
      this._drawLine(TILE_DESC_TOP_Y + (i + 1) * TILE_DESC_PADDING, lines[i]);
    }
  }

  _drawLine(y, text) {
    this.addElement(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", this.x + TILE_WIDTH / 2)
        .setAttribute("y", y)
        .setAttribute("style", FONTS.LUCIDA_CONSOLE)
        .setAttribute("font-size", TILE_DESC_TEXT_SIZE)
        .setAttribute("fill", this.textColor)
        .setTextContent(text)
    );
  }

  _drawPlayerNames() {
    var y = TILE_PLAYER_NAME_TOP_Y;
    for (var i = 0; i < this.playerNames.length; i++) {
      y += TILE_PLAYER_NAME_SEPARATION;
      const name = this.playerNames[i];
      this._drawPlayerName(y, name);
    }
  }

  _drawPlayerName(y, name) {
    this.addElement(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("x", this.x + TILE_WIDTH / 2)
        .setAttribute("y", y)
        .setAttribute("style", FONTS.COMIC_SANS)
        .setAttribute("font-size", TILE_PLAYER_NAME_TEXT_SIZE)
        .setAttribute("fill", this.textColor)
        .setTextContent(name)
    );
  }

  _getTile(pos) {
    return TILES[pos];
  }
}
