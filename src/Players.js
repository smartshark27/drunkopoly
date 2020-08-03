class Players {
  constructor(names) {
    this.players = this._makePlayers(names);
    this.length = names.length;
    this.current = 0;
  }

  get(i) {
    return circularGet(this.players, i);
  }

  getCurrent() {
    return this.get(this.current);
  }

  getPlayerNamesAt(pos) {
    return this.players
      .filter((player) => player.getPosition() == pos)
      .map((player) => player.name);
  }

  getPlayerLeftOfCurrent() {
    return this.get(circularIndex(this.players, this.current + 1));
  }

  getPlayerRightOfCurrent() {
    return this.get(circularIndex(this.players, this.current - 1));
  }

  getRandomOtherPlayer() {
    const i = generateRandomNumberBetween(0, this.length - 1);
    if (i == this.current) {
      return this._getRandomOtherPlayer();
    } else {
      return this.players.get(i);
    }
  }

  nextTurn() {
    this.current = (this.current + 1) % this.length;
  }

  _makePlayers(names) {
    const players = [];
    for (const name of names) {
      players.push(new Player(name));
    }
    return players;
  }
}
