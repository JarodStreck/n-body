import { gameRows, gameCols } from './constants.js';
import { Shape } from "./shape.js";
import { GameMap } from './gameMap.js';

export class Game extends Map {
    constructor(gameMap) {
        super();
        this.map = gameMap;
        this.isGameOver = false;
    }

    /**
     * Returns shape of given player, or undefined if no such player or shape.
     * @param {Number} id Id of the player whose shape is to be returned.
     */
    getShape(id) {
        return this.get(id).shape
    }

    /**
     * Executes the provided function on each shape in the game.
     * @param {Function} f The function to be executed. It takes a shape as unique parameters, and its return value is ignored.
     */
    forEachShape(f) {
        for(let [id,playerinfo] of this){
            f(playerinfo.shape);
        }
    }

    /**
     * Tries to drop the given player's shape, i.e. move it down until it touches something if necessary, and then fixing it onto the map.
     * @param {Number} playerId The id of the player whose shape should be dropped
     */
    dropShape(playerId) {
        this.map.dropShape(this.getShape(playerId));
        this.map.clearFullRows();
        this.addNewShape(playerId);
        /*
        TODO:
        - Drop the shape on the game map and clear any full rows
        - Add a new shape for that player, and for any other player whose shape is now blocked.
        */
    }

    /**
     * Advances the game by one step, i.e. moves all shapes down by one, drops any shape that was touching the ground, and replace it with a new one.
     */
    step() {
        if(this.isGameOver){
            return;
        }
        for(let [key,value] of this){
            let hit_ground = false;
            const shape = value.shape;
            const coords = shape.getCoordinates(shape.rotation);
            for(const coord of coords){
                console.log(this.map.getPlayerAt(shape.row + coord[1],shape.col + coord[0]));
                if(shape.row + coord[1] >= (gameRows -1) || this.map.getPlayerAt(shape.row + coord[1] + 1,shape.col + coord[0]) != -1){
                    hit_ground = true;
                }  
            }
            if(hit_ground){
                this.dropShape(key);
            }else{
                shape.row += 1;
            }

        }
        /*
        TODO:
        - If the game is over, ignore this phase.
        - Move each shape down by one. If it cannot, then that shape is touching the ground and should be force-dropped. Re-use code wheree possible.
        */
    }

    /**
     * Replace current shape of given player id (if any) with a new random shape.
     * @param {Number} id Id of the player whose shape should be replaced.
     */
    addNewShape(id) {
        let shapeCol = this.map.width / 2;
        let shapeRow = 0;
        const shape = new Shape(Shape.getRandomShapeType(),id,shapeCol,shapeRow,0);
        
        if(!this.map.testShape(shape)){
            this.gameOver();
        }else{
            this.get(id).shape = shape;
        }
        /*
        TODO
        - Add a shape of random type to the given player.
        - If that shape is overlapping something, then the game is over.
        */
    }

    /**
     * Resets the game upon game over.
     */
    gameOver() {
        this.isGameOver = true;
        // TODO: reset the map and all players.
    }
}