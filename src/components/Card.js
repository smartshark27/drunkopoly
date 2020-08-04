class Card extends Component {
  constructor(desc) {
    super();
    this.desc = desc;
    this._draw();
  }

  _draw() {
    this._drawCard();
    this._drawText();
  }

  _drawCard() {
    this.addElement(
      SVG.new("rect")
        .setAttribute("x", CARD_X)
        .setAttribute("y", CARD_Y)
        .setAttribute("width", CARD_WIDTH)
        .setAttribute("height", CARD_HEIGHT)
        .setAttribute("rx", CARD_CORNER_RADIUS)
        .setAttribute("ry", CARD_CORNER_RADIUS)
        .setAttribute("fill", COLORS.RED)
    );
  }

  _drawText() {
    const lines = splitTextIntoLines(this.desc, CARD_TEXT_MAX_CHAR_PER_LINE);
    for (var i = 0; i < lines.length; i++) {
      this._drawLine(CARD_Y + (i + 1) * CARD_PADDING, lines[i]);
    }
  }

  _drawLine(y, text) {
    this.addElement(
      SVG.new("text")
        .setAttribute("dominant-baseline", "hanging")
        .setAttribute("text-anchor", "start")
        .setAttribute("x", CARD_X + CARD_PADDING)
        .setAttribute("y", y)
        .setAttribute("style", FONTS.COMIC_SANS)
        .setAttribute("font-size", CARD_TEXT_SIZE)
        .setAttribute("fill", COLORS.WHITE)
        .setTextContent(text)
    );
  }
}
