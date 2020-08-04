function getTilesUppercase() {
  return this.getTiles().map((tile) => {
    return {
      color: tile.color,
      textColor: tile.textColor,
      desc: tile.desc.toUpperCase(),
      onLand: tile.onLand,
    };
  });
}

function getTiles() {
  return [
    {
      color: COLORS.RED,
      textColor: COLORS.WHITE,
      desc: "START and FINISH",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a sip",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a shot!",
      onLand: (next) => next(),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Nobody drinks. Stay dry",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a sip and play again",
      onLand: () => game.readyRoll(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Jump back 3 spaces",
      onLand: () => game.moveBack(3),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Shortest player takes a shot",
      onLand: (next) => next(),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Back to start",
      onLand: () => game.moveBackTo(0),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take 3 sips with players to your left and right",
      onLand: () => game.drinkWithNeighbours(),
    },
    {
      color: COLORS.RED,
      textColor: COLORS.WHITE,
      desc: "BAR",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a sip",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Replace your pawn with a random player",
      onLand: () => game.swapWithRandomPlayer(),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Choose a sip buddy",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a shot!",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "The youngest player takes a sip",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Players to your left and right take a shot",
      onLand: () => game.neighboursDrink(),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Everybody takes a sip except for you",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Player closest to the start takes 2 sips",
      onLand: () => game.closestToStartDrink(),
    },
    {
      color: COLORS.RED,
      textColor: COLORS.WHITE,
      desc: "STRIP BAR",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a sip",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Take a shot and jump back 2 spaces",
      onLand: () => game.moveBack(2),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Rest stop. Nobody drinks",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Bottoms up",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Choose a 3 sip buddy",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Move back by the number you rolled",
      onLand: () => game.moveBackByNumberRolled(),
    },
    {
      color: COLORS.GREEN,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "The oldest player takes 2 sips",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Swap your pawn with the player to your left",
      onLand: () => game.swapWithPlayerToLeft(),
    },
    {
      color: COLORS.RED,
      textColor: COLORS.WHITE,
      desc: "BARTENDER",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Back to the strip bar",
      onLand: () => game.moveBackTo(22),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Everybody wearing jeans takes a sip",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Everybody takes a shot except you",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "The tallest person takes 2 shots",
      onLand: (next) => next(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Card",
      onLand: () => game.pickupCard(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Players closest to start and finish take a sip",
      onLand: () => game.closestToStartAndFinishDrink(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Swap your pawn with the player closest to start",
      onLand: () => game.swapWithPlayersClosestToStart(),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Jump back 5 spaces",
      onLand: () => game.moveBack(5),
    },
    {
      color: COLORS.ORANGE,
      textColor: COLORS.BROWN,
      desc: "Say cheers and bottoms up!",
      onLand: (next) => next(),
    },
  ];
}
