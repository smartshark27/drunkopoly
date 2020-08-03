class Game extends Component {
  constructor(playerNames) {
    super();
    this.players = new Players(playerNames);
    this.pos = 0;
    this.turn = 0;
    this._draw();

    sleep(VIEW_TIME).then(() => this._drawScreenButton("game.readyRoll()"));
  }

  readyRoll() {
    this._removeScreenButton();
    this._setMessage(`${this._getCurrentPlayer().getName()}, tap to roll`);
    this._drawDice();
    this._drawScreenButton("game.roll()");
  }

  roll() {
    this._removeScreenButton();
    this.dice.roll(() => this.finishRoll());
  }

  finishRoll() {
    const spaces = this.dice.getRolledNum();
    const player = this._getCurrentPlayer();
    this._setMessage(`${player.getName()} rolled ${spaces}`);
    sleep(VIEW_TIME).then(() => {
      this.dice.remove();
      this.move(this._getCurrentPlayer(), spaces);
    });
  }

  move(player, spaces) {
    console.log(`Moving ${player.getName()} forward ${spaces} spaces`);
    this.tiles.shiftRight(spaces, () => this.finishMove());
  }

  finishMove() {
    this.pos = this.tiles.getPos();
    const player = this._getCurrentPlayer();
    player.setPosition(this.pos);
    console.log(`${player.getName()} has landed at position ${this.pos}`);
    this._redrawTiles();
    this._drawScreenButton("game.doTileAction()");
  }

  doTileAction() {
    this._removeScreenButton();
    console.log("Doing tile action");
    const onLand = this.tiles.getCurrent().getOnLand();
    onLand(() => this.nextTurn());
  }

  nextTurn() {
    this.turn = (this.turn + 1) % this.players.length;
    this.pos = this._getCurrentPlayer().getPosition();
    this._redrawTiles();
    this.readyRoll();
  }

  _draw() {
    this._drawBackground();
    this._drawTitle();
    this._drawMessage();
    this._drawTiles();
  }

  _drawBackground() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", -BACKGROUND_WIDTH / 2)
        .setAttribute("y", -BACKGROUND_HEIGHT / 2)
        .setAttribute("width", BACKGROUND_WIDTH)
        .setAttribute("height", BACKGROUND_HEIGHT)
        .setAttribute("fill", COLORS.NAVY)
    );
  }

  _drawTitle() {
    this.addElement(
      SVG.new("text")
        .setAttribute("dominant-baseline", "middle")
        .setAttribute("text-anchor", "middle")
        .setAttribute("y", TITLE_Y)
        .setAttribute("style", FONTS.LUCIDA_CONSOLE)
        .setAttribute("font-size", TITLE_TEXT_SIZE)
        .setAttribute("fill", COLORS.ORANGE)
        .setTextContent(TITLE_TEXT)
    );
  }

  _drawMessage() {
    this.message = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("y", MESSAGE_Y)
      .setAttribute("style", FONTS.LUCIDA_CONSOLE)
      .setAttribute("font-size", MESSAGE_TEXT_SIZE)
      .setAttribute("fill", COLORS.WHITE)
      .setTextContent(MESSAGE_INIT_TEXT);
    this.addElement(this.message);
  }

  _drawTiles() {
    this.tiles = new Tiles(this.pos, this.players);
    this.addElement(this.tiles);
  }

  _drawScreenButton(onClick) {
    this.screenButton = new ScreenButton(onClick);
    this.addElement(this.screenButton);
  }

  _removeScreenButton() {
    this.screenButton.remove();
  }

  _drawDice() {
    this.dice = new Dice();
    this.addElement(this.dice);
  }

  _setMessage(text) {
    console.log(text);
    this.message.setTextContent(text);
  }

  _getCurrentPlayer() {
    return this.players.get(this.turn);
  }

  _redrawTiles() {
    this.tiles.remove();
    this._drawTiles();
  }
}
