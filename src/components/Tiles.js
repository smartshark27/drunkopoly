class Tiles extends Component {
  constructor(pos, players) {
    super();
    this.pos = pos;
    this.players = players;
    this._draw();
  }

  shiftRight(spacesRemaining, next = () => {}) {
    if (spacesRemaining > 0) {
      this.pos = circularIndex(TILES, this.pos + 1);
      this._drawTileToLeft();
      var moved = 0;
      const interval = setInterval(() => {
        this.elements.forEach((tile) => {
          tile.shift(TILE_SPEED);
        });
        moved += TILE_SPEED;
        if (moved >= TILE_WIDTH + TILE_SEPARATION) {
          console.log("Moved a space forward");
          this._removeRightMostTile();
          clearInterval(interval);
          this.shiftRight(spacesRemaining - 1, next);
        }
      }, FRAME_DELAY);
    } else {
      console.log("Finished moving forward");
      next();
    }
  }

  shiftLeft(spacesRemaining, next = () => {}) {
    if (spacesRemaining > 0) {
      this.pos = circularIndex(TILES, this.pos - 1);
      this._drawTileToRight();
      var moved = 0;
      const interval = setInterval(() => {
        this.elements.forEach((tile) => {
          tile.shift(-TILE_SPEED);
        });
        moved += TILE_SPEED;
        if (moved >= TILE_WIDTH + TILE_SEPARATION) {
          console.log("Moved a space backward");
          this._removeLeftMostTile();
          clearInterval(interval);
          this.shiftLeft(spacesRemaining - 1, next);
        }
      }, FRAME_DELAY);
    } else {
      console.log("Finished moving backward");
      next();
    }
  }

  getPosition() {
    return this.pos;
  }

  getCurrent() {
    const i = Math.floor(this.elements.length / 2);
    return this.elements[i];
  }

  _draw() {
    for (var i = 0; i < 5; i++) {
      const x = TILE_LEFT_MOST_X + (i + 1) * (TILE_WIDTH + TILE_SEPARATION);
      const pos = circularIndex(TILES, this.pos + 2 - i);
      this._drawTile(x, pos);
    }
  }

  _drawTile(x, pos) {
    this.addElement(new Tile(x, pos, this.players.getPlayerNamesAt(pos)));
  }

  _drawTileToLeft() {
    const leftMostPos = this.elements[0].getPosition();
    const newLeftMostPos = circularIndex(TILES, leftMostPos + 1);
    this.elements.unshift(
      new Tile(
        TILE_LEFT_MOST_X,
        newLeftMostPos,
        this.players.getPlayerNamesAt(newLeftMostPos)
      )
    );
  }

  _drawTileToRight() {
    const rightMostPos = this.elements[this.elements.length - 1].getPosition();
    const newRightMostPos = circularIndex(TILES, rightMostPos - 1);
    this.addElement(
      new Tile(
        TILE_RIGHT_MOST_X,
        newRightMostPos,
        this.players.getPlayerNamesAt(newRightMostPos)
      )
    );
  }

  _removeLeftMostTile() {
    this.elements.shift().remove();
  }

  _removeRightMostTile() {
    this.elements.pop().remove();
  }
}
