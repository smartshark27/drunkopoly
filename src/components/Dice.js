class Dice extends Component {
  constructor() {
    super();
    this.total = 0;
    this._draw();
  }

  roll(next) {
    console.log("Rolling dice");
    this._rollDie(this.leftDots, DIE_LEFT_ROLL_TIME);
    this._rollDie(this.rightDots, DIE_RIGHT_ROLL_TIME, next);
  }

  getRolledNum() {
    return this.total;
  }

  _draw() {
    this._drawDie(-DICE_SEPARATION / 2 - DIE_SIZE);
    this._drawDie(DICE_SEPARATION / 2);
    this.leftDots = this._drawDots(-DICE_SEPARATION / 2 - DIE_SIZE);
    this.rightDots = this._drawDots(DICE_SEPARATION / 2);
  }

  _drawDie(x) {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", x + SHADOW_DISTANCE)
        .setAttribute("y", -DIE_SIZE / 2 - DIE_Y_OFFSET + SHADOW_DISTANCE)
        .setAttribute("rx", DIE_CORNER_RADIUS)
        .setAttribute("ry", DIE_CORNER_RADIUS)
        .setAttribute("width", DIE_SIZE)
        .setAttribute("height", DIE_SIZE)
        .setAttribute("fill", COLORS.BLACK)
        .setAttribute("opacity", SHADOW_OPACITY)
    );
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", x)
        .setAttribute("y", -DIE_SIZE / 2 - DIE_Y_OFFSET)
        .setAttribute("rx", DIE_CORNER_RADIUS)
        .setAttribute("ry", DIE_CORNER_RADIUS)
        .setAttribute("width", DIE_SIZE)
        .setAttribute("height", DIE_SIZE)
        .setAttribute("fill", COLORS.WHITE)
    );
  }

  _drawDots(dieLeftX) {
    const topY = -DIE_SIZE / 2 - DIE_Y_OFFSET + DIE_SIZE / 6;
    const leftX = dieLeftX + DIE_SIZE / 6;
    const dots = [];
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        const dot = SVG.new("circle")
          .setAttribute("cx", leftX + (x * DIE_SIZE) / 3)
          .setAttribute("cy", topY + (y * DIE_SIZE) / 3)
          .setAttribute("r", DIE_DOT_RADIUS)
          .setAttribute("fill", COLORS.BLACK)
          .hide();
        dots.push(dot);
        this.addElement(dot);
      }
    }
    return dots;
  }

  _rollDie(dots, time, next = () => {}) {
    var num = 0;
    const interval = setInterval(() => {
      num = generateRandomNumberBetween(1, DIE_NUMBERS);
      this._setDots(dots, num);
    }, FRAME_DELAY);
    sleep(time).then(() => {
      clearInterval(interval);
      this.total += num;
      next();
    });
  }

  _setDots(dots, num) {
    const patterns = {
      0: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 1, 0, 0, 0, 0],
      2: [1, 0, 0, 0, 0, 0, 0, 0, 1],
      3: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      4: [1, 0, 1, 0, 0, 0, 1, 0, 1],
      5: [1, 0, 1, 0, 1, 0, 1, 0, 1],
      6: [1, 1, 1, 0, 0, 0, 1, 1, 1],
    };
    const pattern = patterns[num];
    for (var i = 0; i < pattern.length; i++) {
      dots[i].setAttribute("opacity", pattern[i]);
    }
  }
}
