import { Renderer } from "./renderer.js";
import { FPS_WANTED} from "./constants.js";
import { Particle } from "./particle.js";

/*
TODO:
- Create new game, player and renderer.
- Start a game loop that makes the game step every stepIntervalMs milliseconds (see constants.js).
- Start a rendering loop on the renderer using requestAnimationFrame.
*/
const canvas = document.getElementById("canvas");
const particles = [];
const renderer = new Renderer(particles,canvas.getContext("2d"));
for(let i = 0; i < 2 ; i ++){
    particles.push(Particle.generateParticle());
}
console.log(particles);

//Game loop and rendr loop
const loop = () => {
    renderer.render();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop)
setInterval(() => {
    particles.forEach((p)=>{
        p.calculate_gravitational_force(particles);
    })
    particles.forEach((p)=>{
        p.update();

    })

}, 1000/FPS_WANTED)

console.log("Hello, world!");