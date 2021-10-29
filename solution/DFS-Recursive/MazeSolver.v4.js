class MazeSolver {

  constructor (mazeArray,
               entrancePosition = {x: 0, y: 1},
               exitPosition = {x: mazeArray[0].length - 1, y: mazeArray.length - 2}
  ) {
    this.mazeArray = mazeArray
    this.path = []

    this.entrancePosition = entrancePosition
    this.exitPosition = exitPosition
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
    if (x === this.exitPosition.x && y === this.exitPosition.y) {
      console.log('you win')
      return
    }
    if(this.isLegalRoad(x + 1, y)){
      this.solvePoint(x + 1, y)
    }
    if(this.isLegalRoad(x, y + 1)){
      this.solvePoint(x, y + 1)
    }
    if(this.isLegalRoad(x - 1, y)){
      this.solvePoint(x - 1, y)
    }
    if(this.isLegalRoad(x, y - 1)){
      this.solvePoint(x, y - 1)
    }
  }

  solveMaze () {
    this.solvePoint(0, 1)
    return this.path
  }
}
