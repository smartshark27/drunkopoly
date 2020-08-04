class Game extends Component {
  constructor(playerNames) {
    super();
    this.players = new Players(playerNames);
    this.pos = 0;
    this.cards = new Cards();

    this._draw();

    sleep(VIEW_TIME).then(() => this._drawScreenButton("game.readyRoll()"));
  }

  readyRoll() {
    this._removeScreenButton();
    this._setMessage(`${this.players.getCurrent().getName()}, tap to roll`);
    this._drawDice();
    this._drawScreenButton("game.roll()");
  }

  roll() {
    this._removeScreenButton();
    this.dice.roll(() => this.finishRoll());
  }

  finishRoll() {
    this.numberRolled = this.dice.getRolledNum();
    const player = this.players.getCurrent();
    this._setMessage(`${player.getName()} rolled ${this.numberRolled}`);
    sleep(VIEW_TIME).then(() => {
      this.dice.remove();
      this.moveForward(this.numberRolled);
    });
  }

  moveForward(spaces) {
    const player = this.players.getCurrent();
    console.log(`Moving ${player.getName()} forward ${spaces} spaces`);
    this.tiles.shiftRight(spaces, () => this.finishMove());
  }

  moveBack(spaces) {
    const player = this.players.getCurrent();
    console.log(`Moving ${player.getName()} back ${spaces} spaces`);
    this.tiles.shiftLeft(spaces, () => this.finishMove());
  }

  moveBackTo(pos) {
    const player = this.players.getCurrent();
    console.log(`Moving ${player.getName()} back to position ${pos}`);
    const spaces = this.pos - pos;
    this.tiles.shiftLeft(spaces, () => this.finishMove());
  }

  moveBackByNumberRolled() {
    this.moveBack(this.numberRolled);
  }

  finishMove() {
    this.pos = this.tiles.getPosition();
    const player = this.players.getCurrent();
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
    const otherPlayer = this.players.getRandomOtherPlayer();
    this._swapWithOtherPlayers([otherPlayer]);
  }

  swapWithPlayerToLeft() {
    const leftPlayer = this.players.getPlayerLeftOfCurrent();
    this._swapWithOtherPlayers([leftPlayer]);
  }

  swapWithPlayersClosestToStart() {
    const startPlayer = this.players.getPlayersClosestToStart();
    this._swapWithOtherPlayers(startPlayer);
  }

  drinkWithNeighbours() {
    const playerName = this.players.getCurrent().getName();
    const leftPlayerName = this.players.getPlayerLeftOfCurrent().getName();
    const rightPlayerName = this.players.getPlayerRightOfCurrent().getName();
    this._setMessage(
      `${playerName}, ${leftPlayerName} & ${rightPlayerName} drink`
    );
    this._drawScreenButton("game.nextTurn()");
  }

  neighboursDrink() {
    const leftPlayerName = this.players.getPlayerLeftOfCurrent().getName();
    const rightPlayerName = this.players.getPlayerRightOfCurrent().getName();
    this._setMessage(`${leftPlayerName} & ${rightPlayerName} drink`);
    this._drawScreenButton("game.nextTurn()");
  }

  closestToStartDrink() {
    const closest = this.players
      .getPlayersClosestToStart()
      .map((player) => player.name);
    this._setMessage(`${closest.join(", ")}, drink`);
    this._drawScreenButton("game.nextTurn()");
  }

  closestToStartAndFinishDrink() {
    const closestToStart = this.players.getPlayersClosestToStart();
    const closestToFinish = this.players.getPlayersClosestToFinish();
    const players = closestToStart
      .concat(closestToFinish)
      .map((player) => player.name);
    this._setMessage(`${players.join(", ")}, drink`);
    this._drawScreenButton("game.nextTurn()");
  }

  pickupCard() {
    const playerName = this.players.getCurrent().getName();
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
    this._removeScreenButton();
    this.players.nextTurn();
    this.pos = this.players.getCurrent().getPosition();
    this._redrawTiles();
    this.readyRoll();
  }

  gameOver() {
    this._redrawTiles();
    sleep(VIEW_TIME)
      .then(() => {
        const winner = this.players.getCurrent().getName();
        this._setMessage(`${winner} has won! Tap to play again`);
      })
      .then(() => this._drawScreenButton("restart()"));
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
        .setAttribute("style", FONTS.PATRICK_HAND)
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
      .setAttribute("style", FONTS.SNIGLET)
      .setAttribute("font-size", MESSAGE_TEXT_SIZE)
      .setAttribute("fill", COLORS.WHITE)
      .setTextContent(MESSAGE_INIT_TEXT);
    this.addElement(this.message);
  }

  _drawTiles() {
    this.tiles = new Tiles(this.pos, this.players);
    this.addElement(this.tiles);
  }

  _redrawTiles() {
    this.tiles.remove();
    this._drawTiles();
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
    this.card = new Card(this.cards.getTop());
    this.addElement(this.card);
  }

  _removeCard() {
    this.card.remove();
  }

  _setMessage(text) {
    console.log(text);
    this.message.setTextContent(text);
  }

  _swapWithOtherPlayers(otherPlayers) {
    const current = this.players.getCurrent();
    const otherPlayerNames = otherPlayers.map((player) => player.getName());
    this._setMessage(
      `Swapping ${current.getName()} with ${otherPlayerNames.join(", ")}`
    );
    const otherPos = otherPlayers[0].getPosition();
    sleep(VIEW_TIME)
      .then(() => {
        otherPlayers.forEach((player) => {
          player.setPosition(this.pos);
        });
        this._redrawTiles();
      })
      .then(() => sleep(VIEW_TIME))
      .then(() => {
        current.setPosition(otherPos);
        this._redrawTiles();
      })
      .then(() => sleep(VIEW_TIME))
      .then(() => this.nextTurn());
  }
}
