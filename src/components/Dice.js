class Dice extends Component {
  constructor() {
    super();
    this._draw();
  }

  roll(next) {
    console.log("Rolling dice");
    this._rollDie(this.leftDie, DIE_LEFT_ROLL_TIME);
    this._rollDie(this.rightDie, DIE_RIGHT_ROLL_TIME, next);
  }

  getRolledNum() {
    return Number(this.leftDie.getTextContent()) + Number(this.rightDie.getTextContent());
  }

  _draw() {
    this.leftDie = this._drawDie(-DICE_SEPARATION / 2 - DIE_SIZE);
    this.rightDie = this._drawDie(DICE_SEPARATION / 2);
  }

  _drawDie(x) {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", x)
        .setAttribute("y", -DIE_SIZE / 2)
        .setAttribute("rx", DIE_CORNER_RADIUS)
        .setAttribute("ry", DIE_CORNER_RADIUS)
        .setAttribute("width", DIE_SIZE)
        .setAttribute("height", DIE_SIZE)
        .setAttribute("fill", COLORS.WHITE)
    );
    const dieNum = SVG.new("text")
      .setAttribute("dominant-baseline", "middle")
      .setAttribute("text-anchor", "middle")
      .setAttribute("x", x + DIE_SIZE / 2)
      .setAttribute("style", FONTS.COMIC_SANS)
      .setAttribute("font-size", DIE_NUM_SIZE)
      .setAttribute("fill", COLORS.BLACK);
    this.addElement(dieNum);
    return dieNum;
  }

  _rollDie(die, time, next = () => {}) {
    const interval = setInterval(() => {
      const num = generateRandomNumberBetween(1, DIE_NUMBERS);
      this._setDieNum(die, num);
    }, FRAME_DELAY);
    sleep(time).then(() => {
      clearInterval(interval);
      next();
    });
  }

  _setDieNum(die, num) {
    die.setTextContent(num);
  }
}
