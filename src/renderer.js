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
        const size = cellToPixel(1);
        //Reset context
        this.context.clearRect(0,0,cellToPixel(this.game.map.width),cellToPixel(this.game.map.height));
        //Draw falling shapes
        this.game.forEachShape((shape)=>{
            const coords = shape.getCoordinates(shape.rotation);
            const x_start = cellToPixel(shape.col);
            const y_start = cellToPixel(shape.row);
            
            for(const coord of coords){
                this.context.fillStyle = shapeColors[shape.playerId];
                this.context.fillRect(x_start + coord[0] * size ,y_start + coord[1]*size,size,size)
            }
        })
        //Draw shape on the map
        const game_map = this.game.map;
        for(let row = 0 ; row < game_map.height; row++){
            for(let col = 0 ; col < game_map.width; col++){
                if(game_map.getPlayerAt(row,col) != -1){
                    const x_start = cellToPixel(col);
                    const y_start = cellToPixel(row);
                   
                    this.context.fillStyle = shapeColors[game_map.getPlayerAt(row,col)];
                    this.context.fillRect(x_start,y_start, size,size)
                }
            }
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