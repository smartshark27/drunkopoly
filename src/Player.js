class Player {
  constructor(name) {
    this.name = name;
    this.pos = 0;
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.pos;
  }

  setPosition(pos) {
    this.pos = pos;
  }
}
