function makeTile(desc1, desc2 = "", onLand = next => next()) {
  return {
    desc1: desc1,
    desc2: desc2,
    onLand: onLand,
  };
}

const TILES = [
  makeTile("START", "FINISH"),
  makeTile("Take a sip"),
  makeTile("Take a shot!"),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Nobody drinks", "Stay dry"),
  makeTile("Take a sip and", "play again", () => game.readyRoll()),
  makeTile("Jump back 3 spaces", "", () => game.moveBackward(3)),
  makeTile("Shortest player", "takes a shot"),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Back to start", "", () => game.moveBackTo(0)),
  makeTile("Take 3 sips with the players", "to your left and right", () => game.drinkWithNeighbours()),
  makeTile("BAR"),
  makeTile("Take a sip"),
  makeTile("Replace your pawn", "with a random player", () => game.swapWithRandomPlayer()),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Choose a sip buddy"), // Buddy
  makeTile("Take a shot!"),
  makeTile("The youngest player", "takes a sip"),
  makeTile("Players to your left", "and right take a shot"), // Left and right
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Everybody takes a sip", "except for you"),
  makeTile("Player closest to the", "start takes 2 sips"), // Player closest to
  makeTile("STRIP BAR"),
  makeTile("Take a sip"),
  makeTile("Take a shot and jump", "back 2 spaces", () => game.moveBackward(2)),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Rest stop", "Nobody drinks"),
  makeTile("Bottoms up"),
  makeTile("Choose a 3 sip buddy"), // Buddy
  makeTile("Move back by the", "number you rolled"), // Backwards
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("The oldest player", "takes 2 sips"),
  makeTile("Swap your pawn with the", "player to your left"), // Swap, left
  makeTile("BARTENDER"),
  makeTile("Back to strip bar", "", () => game.moveBackTo(22)),
  makeTile("Everybody wearing", "jeans take a sip"),
  makeTile("Everybody takes a", "shot except you"),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("The tallest person", "takes 2 shots"),
  makeTile("Card", "", () => game.pickupCard()),
  makeTile("Players closest to start", "and finish take a sip"), // Player closest to
  makeTile("Swap your pawn with the", "player closest to start"), // Swap, closest to
  makeTile("Jump back 5 spaces", "", () => game.moveBackward(5)),
  makeTile("Say cheers and", "bottoms up!"),
];
