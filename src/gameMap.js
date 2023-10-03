export class GameMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        /** 2D array storing for each position the id of the player whose block is there, or -1 otherwise. */
        this.map = [];
        for(let i = 0 ; i < height;i++){
            this.map[i] = Array(width).fill(-1);
        }
    }

    /**
     * Drops the given shape, i.e. moves it down until it touches something, and then grounds it.
     * @param {Shape} shape The shape to be dropped.
     */
    dropShape(shape) {
      this.groundShape(shape); 
    }

    /**
     * Grounds the given shape, i.e. transfers it to the map table.
     * @param {Shape} shape The shape to be grounded.
     */
    groundShape(shape) {
        const coords = shape.getCoordinates(shape.rotation);
        for(let coord of coords){
            let x = shape.row + coord[1];
            let y = shape.col + coord[0];
            this.map[x][y] = shape.playerId;
        }
        console.log(this.map);
    }

    /**
     * Tests whether the given shape is overlapping a block or is out of bounds on the left, right, or bottom of the map.
     * This method allows the test to be done with row, col and/or rotation that are different from those of the shape itself.
     * 
     * Note that we do not consider a shape to be out of bounds if it is (even partly) above the top of the map.
     * 
     * @param {Shape} shape The shape to be tested
     * @param {Number} row Optional row at which the shape should be tested. If omitted, uses that of the shape.
     * @param {Number} col Optional col at which the shape should be tested. If omitted, uses that of the shape.
     * @param {Number} rotation Optional rotation with which the shape should be tested. If omitted, uses that of the shape.
     * @returns true if and only if the shape does not overlap anything and is not out of bounds.
     */
    testShape(shape, row = shape.row, col = shape.col, rotation = shape.rotation) {
        // TODO
    }

    /**
     * Clears any row that is fully complete.
     */
    clearFullRows() {
        // TODO
    }

    /**
     * Clears the given row, and moves any row above it down by one.
     * @param {Number} row The row to be cleared.
     */
    clearRow(row) {
        // TODO
    }

    /**
     * Returns the id of the player whose block is grounded at the given position, or -1 otherwise.
     * @param {Number} row the requested row
     * @param {Number} col the requested column
     * @returns the id of the player whose block is grounded at the given position, or -1 otherwise
     */
    getPlayerAt(row, col) {
        return this.map[row][col];
    }
}