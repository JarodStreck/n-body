import { Renderer } from "./renderer.js";
import { Game } from "./game.js";
import { PlayerInfo } from "./playerInfo.js";
import { GameMap } from "./gameMap.js";
import { gameCols, gameRows, stepIntervalMs } from "./constants.js";

/*
TODO:
- Create new game, player and renderer.
- Start a game loop that makes the game step every stepIntervalMs milliseconds (see constants.js).
- Start a rendering loop on the renderer using requestAnimationFrame.
*/
const canvas = document.getElementById("canvas");

const map = new GameMap(gameCols, gameRows);
const game = new Game(map);
const player = new PlayerInfo(0, undefined);
const renderer = new Renderer(game, canvas.getContext("2d"));

game.set(0, player);
game.addNewShape(0);

renderer.render();
console.log(game);
console.log(map);
console.log(renderer);
//Game loop and rendr loop
const loop = () => {
    renderer.render();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop)
setInterval(() => {
    game.step();
}, stepIntervalMs)

console.log("Hello, world!");