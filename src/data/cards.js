function makeCard(desc, onPickup = (next) => next()) {
  return {
    desc: desc,
    onPickup: onPickup,
  };
}

// Some of these are fucked up but they're in the game

const CARDS = [
  makeCard(
    "Strip to your underwear and shout at a pedestrian on the street and then drink a shot."
  ),
  makeCard('Send "kisses" in a Facebook message to an ex and take a sip.'),
  makeCard("Take off 3 items of clothing for the duration of the game."),
  makeCard("Pick the worst dressed player and make them take a shot."),
  makeCard(
    "Can't speak for the next 2 rounds. For every word you say, take a sip."
  ),
];
