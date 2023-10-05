import { Renderer } from "./renderer.js";
import { FPS_WANTED,NB_PARTICLES,CANVAS_HEIGHT,CANVAS_WIDTH} from "./constants.js";
import { Particle } from "./particle.js";

/*
TODO:
- Create new game, player and renderer.
- Start a game loop that makes the game step every stepIntervalMs milliseconds (see constants.js).
- Start a rendering loop on the renderer using requestAnimationFrame.
*/
const particles = [];
const canvas = document.getElementById("canvas");
const renderer = new Renderer(particles,canvas.getContext("2d"));

const frameInterval = 1/ FPS_WANTED;

for(let i = 0; i < NB_PARTICLES ; i ++){
    particles.push(Particle.generateParticle());
}
//particles.push(new Particle(3030,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,50,0,0,50,"red"));
//Game loop and rendr loop
let lastFrameTime = 0;

const loop = (timestamp) => {
    const dt = (timestamp - lastFrameTime) / 1000;
    if(dt >= frameInterval){
        
        lastFrameTime = timestamp;

        particles.forEach((p)=>{
            p.calculate_gravitational_force(particles);
        })

        particles.forEach((p)=>{
            p.update(dt/frameInterval);
    
        })
        renderer.render();

    }
    
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop)


console.log("Hello, world!");