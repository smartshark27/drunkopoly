class Cards extends Component {
  constructor() {
    super();
    this.cards = shuffle(CARDS);
    this.top = 0;
  }

  getTop() {
    return this.cards[this.top];
  }

  // getTopIndex() {
  //   return this.top;
  // }

  // getTopDesc() {
  //   return this
  // }

  // getTopOnPickup() {
  //   return this.cards[this.top].onPickup;
  // }

  nextCard() {
    this.top = circularIndex(this.cards, this.top + 1);
  }
}
