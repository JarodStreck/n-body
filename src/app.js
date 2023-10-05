import { Renderer } from "./renderer.js";
import { Game } from "./game.js";
import { PlayerInfo } from "./playerInfo.js";
import { GameMap } from "./gameMap.js";
import { gameCols, gameRows, stepIntervalMs } from "./constants.js";
import { Shape } from "./shape.js";

/*
TODO:
- Create new game, player and renderer.
- Start a game loop that makes the game step every stepIntervalMs milliseconds (see constants.js).
- Start a rendering loop on the renderer using requestAnimationFrame.
*/
const canvas = document.getElementById("canvas");

const map = new GameMap(gameCols, gameRows);
const game = new Game(map);
//const player = new PlayerInfo(0, undefined);
const renderer = new Renderer(game, canvas.getContext("2d"));

// const testMap = new GameMap(5, 5);
// testMap.map = [
//     [-1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1],
//     [-1, 2, -1, -1, -1],
//     [-1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1]];
// const shape = new Shape(0, 1, 2, 2,0);
// console.log(testMap.testShape(shape));
// testMap.groundShape(shape);
// console.log(testMap);
let shape1 = new Shape(0, 1, 5, 3, 0);
let shape2 = new Shape(0, 2, 5, 1, 0);
const player1 = new PlayerInfo(1, shape1);
const player2 = new PlayerInfo(2, shape2);

game.set(1, player1);
game.set(2, player2)
//game.addNewShape(0);
console.log(game);
console.log(map);
console.log(renderer);
renderer.render();

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