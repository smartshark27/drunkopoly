class Game extends Component {
  constructor(playerNames) {
    super();
    this.players = new Players(playerNames);
    this.pos = 0;
    this.turn = 0;
    this.cards = new Cards();

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
      this.moveForward(spaces);
    });
  }

  moveForward(spaces) {
    const player = this._getCurrentPlayer();
    console.log(`Moving ${player.getName()} forward ${spaces} spaces`);
    this.tiles.shiftRight(spaces, () => this.finishMove());
  }

  moveBackward(spaces) {
    const player = this._getCurrentPlayer();
    console.log(`Moving ${player.getName()} backward ${spaces} spaces`);
    this.tiles.shiftLeft(spaces, () => this.finishMove());
  }

  moveBackTo(pos) {
    const player = this._getCurrentPlayer();
    console.log(`Moving ${player.getName()} back to position ${pos}`);
    const spaces = this.pos - pos;
    this.tiles.shiftLeft(spaces, () => this.finishMove());
  }

  finishMove() {
    this.pos = this.tiles.getPosition();
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

  swapWithRandomPlayer() {
    const player = this._getCurrentPlayer();
    const otherPlayer = this._getRandomOtherPlayer();
    this._setMessage(
      `Swapping ${player.getName()} with ${otherPlayer.getName()}`
    );
    const otherPos = otherPlayer.getPosition();

    sleep(VIEW_TIME)
      .then(() => {
        otherPlayer.setPosition(this.pos);
        this._redrawTiles();
      })
      .then(() => sleep(VIEW_TIME))
      .then(() => {
        player.setPosition(otherPos);
        this._redrawTiles();
      })
      .then(() => sleep(VIEW_TIME))
      .then(() => this.nextTurn())
  }

  pickupCard() {
    const playerName = this._getCurrentPlayer().getName();
    this._setMessage(`${playerName} has drawn a card`);
    this._drawCard();
    this._drawScreenButton("game.hideCard()");
  }

  hideCard() {
    this._removeScreenButton();
    this._removeCard();
    this._drawScreenButton("game.doCardAction()");
  }

  doCardAction() {
    this._removeScreenButton();
    const onPickup = this.cards.getTop().onPickup;
    this.cards.nextCard();
    onPickup(() => this.nextTurn());
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

  _drawCard() {
    this.card = new Card(this.cards.getTop().desc);
    this.addElement(this.card);
  }

  _removeCard() {
    this.card.remove();
  }

  _setMessage(text) {
    console.log(text);
    this.message.setTextContent(text);
  }

  _getCurrentPlayer() {
    return this.players.get(this.turn);
  }

  _getRandomOtherPlayer() {
    const i = generateRandomNumberBetween(0, this.players.length - 1)
    if (i == this.turn) {
      return this._getRandomOtherPlayer();
    } else {
      return this.players.get(i)
    }
  }

  _redrawTiles() {
    this.tiles.remove();
    this._drawTiles();
  }
}