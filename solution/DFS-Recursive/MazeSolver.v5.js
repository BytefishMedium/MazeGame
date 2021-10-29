class MazeSolver {

  constructor (mazeArray,
               entrancePosition = {x: 0, y: 1},
               exitPosition = {x: mazeArray[0].length - 1, y: mazeArray.length - 2}
  ) {
    this.mazeArray = mazeArray
    this.path = []

    this.entrancePosition = entrancePosition
    this.exitPosition = exitPosition

    this.directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

    this.visitedPositions = new Array(mazeArray.length)
    for (let index = 0; index < this.visitedPositions.length; index++) {
      this.visitedPositions[index] = new Array(mazeArray[index].length).fill(false)
    }
  }

  isLegalRoad (x, y) {
    if (x < 0 || x >= this.mazeArray[0].length) {
      return false
    }

    if (y < 0 || y >= this.mazeArray.length) {
      return false
    }

    if (this.mazeArray[y][x] === 1) {
      return false
    }

    return true
  }

  solvePoint(x, y){
    this.visitedPositions[y][x] = true

    if (x === this.exitPosition.x && y === this.exitPosition.y) {
      console.log('you win')
      return
    }

    for (const direction of this.directions) {
      let newX = x + direction[0]
      let newY = y + direction[1]

      if (this.isLegalRoad(newX, newY) && !this.visitedPositions[newY][newX]){
        this.solvePoint(newX, newY)
      }
    }
  }

  /**
   *
   * @return {*}
   */
  solveMaze () {
    this.solvePoint(0, 1)
    return this.path
  }
}

module.exports = MazeSolver
