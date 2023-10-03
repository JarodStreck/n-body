import { cellPixelSize,shapeColors} from "./constants.js";
import { Game } from "./game.js";
import { Shape } from "./shape.js";
import { GameMap } from "./gameMap.js";

function cellToPixel(x) {
    return x * cellPixelSize;
}

export class Renderer {
    constructor(game, context) {
        this.game = game;
        this.context = context;
    }

    /**
     * Clears the context and draws all falling and dropped shapes.
     */
    render() {
       
        this.context.clearRect(0,0,cellToPixel(this.game.map.width),cellToPixel(this.game.map.height));
        const map = this.game.map.map;
        for(let [key,value] of this.game){
            const coords = value.shape.getCoordinates(value.shape.rotation);
           

            const x_start = cellToPixel(value.shape.col);
            const y_start = cellToPixel(value.shape.row);
            const size = cellToPixel(1);


            for(let i = 0 ; i < coords.length; i++){
                this.context.fillStyle = shapeColors[value.shape.shapeType];
                this.context.fillRect(x_start + coords[i][0] * size ,y_start + coords[i][1]*size,size,size)
            }
        
            //this.context.fillRect(x_pixel,y_pixel,cellToPixel(1),cellToPixel(1))
        }
        /*
        TODO:
        - Reset context
        - Draw all falling shapes
        - Draw all blocks stored in the game map, i.e. the dropped/grounded shapes.

        You may benefit from splitting this method into smaller ones.
        */
    }
}