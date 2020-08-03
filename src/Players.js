class Players {
  constructor(names) {
    this.players = this._makePlayers(names);
    this.length = names.length;
  }

  get(i) {
    return this.players[i];
  }

  getPlayerNamesAt(pos) {
    return this.players
      .filter((player) => player.getPosition() == pos)
      .map((player) => player.name);
  }

  _makePlayers(names) {
    const players = [];
    for (const name of names) {
      players.push(new Player(name));
    }
    return players;
  }
}
