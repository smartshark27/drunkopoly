class ScreenButton extends Component {
  constructor(handleClick = () => {}) {
    super();
    this.handleClick = handleClick;
    this.draw();
  }

  draw() {
    this.button = SVG.new("rect")
      .hide()
      .setAttribute("x", -BACKGROUND_WIDTH / 2)
      .setAttribute("y", -BACKGROUND_HEIGHT / 2)
      .setAttribute("width", BACKGROUND_WIDTH)
      .setAttribute("height", BACKGROUND_HEIGHT)
      .setAttribute("onclick", this.handleClick);
    this.addElement(this.button);
  }

  setOnClick(handleClick) {
    this.button.setAttribute("onclick", handleClick);
  }

  clearOnClick() {
    this.button.setAttribute("onclick", "");
  }
}
