import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";

function cellToPixel(x) {
    return x * cellPixelSize;
}

export class Renderer {
    constructor(particles, context) {
        this.particles = particles;
        this.context = context;
    }

    /**
     * Clears the context and draws all falling and dropped shapes.
     */
    render() {
      this.context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      this.particles.forEach(p => {
        this.context.beginPath();
        this.context.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        this.context.fillStyle = p.color;
        this.context.fill();
      });
    }
}