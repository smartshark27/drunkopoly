const PLAYERS = [
  "Tom",
  "Thandi",
  "Ben",
  "Kirsten",
  "Mike",
  "Phoebe",
  "Radikha",
  "Kanishka",
  "Juan",
  "Sar",
];

const FPS = 60;
const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 200;
const VIEW_TIME = 1000;

const BACKGROUND_WIDTH = 500;
const BACKGROUND_HEIGHT = 700;

const TITLE_Y = -75;
const TITLE_TEXT = "DRUNKOPOLY";
const TITLE_TEXT_SIZE = 12;

const MESSAGE_Y = -55;
const MESSAGE_TEXT_SIZE = 5;
const MESSAGE_INIT_TEXT = "Welcome and good luck";

const TILE_WIDTH = 80;
const TILE_HEIGHT = 130;
const TILE_CORNER_RADIUS = 3;
const TILE_SEPARATION = 5;
const TILE_SPEED = 2;
const TILE_PLAYER_NAME_SEPARATION = 8;
const TILE_PLAYER_NAME_TEXT_SIZE = 5;

const DESC_1_Y = 65;
const DESC_2_Y = 75;
const DESC_TEXT_SIZE = 7;

const DIE_NUMBERS = 6;
const DIE_SIZE = 30;
const DIE_CORNER_RADIUS = 3;
const DIE_NUM_SIZE = 20;
const DIE_LEFT_ROLL_TIME = 1000;
const DIE_RIGHT_ROLL_TIME = 2000;
const DICE_SEPARATION = 5;

const CARD_WIDTH = 95;
const CARD_HEIGHT = 65;
const CARD_CORNER_RADIUS = 3;
const CARD_PADDING = 8;
const CARD_TEXT_SIZE = 5;
const CARD_TEXT_MAX_CHAR_PER_LINE = 25;

//-----------------------------------------------------------------------------
// Derived
//-----------------------------------------------------------------------------

// General
const FRAME_DELAY = Math.floor(1000 / FPS);
const VIEWBOX_LEFT = -(VIEWBOX_WIDTH / 2);
const VIEWBOX_RIGHT = VIEWBOX_WIDTH / 2;
const VIEWBOX_TOP = -(VIEWBOX_HEIGHT / 2);
const VIEWBOX_BOTTOM = VIEWBOX_HEIGHT / 2;

const TILE_LEFT_MOST_X = -3.5 * TILE_WIDTH - 3 * TILE_SEPARATION;
const TILE_RIGHT_MOST_X = 2.5 * TILE_WIDTH + 3 * TILE_SEPARATION;
const TILE_Y = -40;

const CARD_X = -CARD_WIDTH / 2;
const CARD_Y = -CARD_HEIGHT / 2;