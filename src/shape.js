import { shapeTypes } from "./constants.js";

export class Shape {
    /**
     * @returns {Number} A random shape type
     */
    static getRandomShapeType() {
       return Math.round(Math.random() * (shapeTypes.length - 1));
    }

    constructor(type, playerId, col, row, rotation) {
        this.shapeType = type;
        this.rotation = rotation;
        this.playerId = playerId;
        this.col = col;
        this.row = row;
    }

    /**
     * Returns the array of coordinates of this shape (each coordinate being an array containing the x and y offsets
     * from the shape's origin), given its rotation.
     * @param {Number} rotation The rotation for which the coordinates are requested. If omitted, the shape's rotation is used.
     * @returns {Array} The coordinates of this shape, given its rotation.
     */
    getCoordinates(rotation = this.rotation) {
        let modulo = 0 ;

        if(this.shapeType == 1){
            modulo = 2;
        }else{
            modulo = 4;
        }
        return shapeTypes[this.shapeType][rotation % modulo];
    }
}