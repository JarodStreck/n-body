import { CANVAS_HEIGHT,CANVAS_WIDTH, FPS_WANTED, GRAVITATIONAL_CONSTANT } from "./constants.js";
export class Particle {
    static id = 0;
    constructor(id,x, y,radius, vx, vy,mass,color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.mass = mass;
        this.color = color;
    }
    update(){
        const delta_time = 1000/FPS_WANTED;
        this.vx += this.ax * delta_time;
        this.vy += this.ay * delta_time;
        this.x += this.vx * delta_time;
        this.y += this.vy * delta_time;
        if(this.x <= 0 || this.x >= CANVAS_WIDTH){
            this.vx = - this.vx ;
        }
        if(this.y <= 0 || this.y >= CANVAS_HEIGHT){
            this.vy = -this.vy;
        }

        this.ax = 0;
        this.ay = 0;
    }
    calculate_gravitational_force(particles){
        for (const particle of particles) {
            if (this.id !== particle.id) {
              const dx = particle.x - this.x;
              const dy = particle.y - this.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
        
              // F = G * (m1 * m2) / r^2
              const force = (GRAVITATIONAL_CONSTANT * this.mass * particle.mass) / Math.max((distance * distance),500);
            
            
              this.ax += force * dx / distance;
              this.ay += force * dy / distance;
            }
        }
        this.ax /= this.mass;
        this.ay /= this.mass;
    }

    /**
     * Returns the array of coordinates of this shape (each coordinate being an array containing the x and y offsets
     * from the shape's origin), given its rotation.
     * @param {Number} rotation The rotation for which the coordinates are requested. If omitted, the shape's rotation is used.
     * @returns {Array} The coordinates of this shape, given its rotation.
     */
    
    static generateParticle(){
        const radius = 10;
        const x = Particle.randomNumber(0+ radius/2,CANVAS_WIDTH-radius/2);
        const y = Particle.randomNumber(0+ radius/2,CANVAS_HEIGHT-radius/2);
        const vx = Math.random() * 2 - 1;
        const vy = Math.random() * 2 - 1;
        const color = "purple";
        const mass = 1;
        return new Particle(this.id++,x,y,radius,vx,vy,mass,color)
    }
    static randomNumber(lower,upper){
        return Math.floor(Math.random()*(upper-lower) + lower);
    }
}