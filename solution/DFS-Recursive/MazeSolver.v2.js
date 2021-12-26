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

  solvePoint(x, y){
    this.solvePoint(x + 1, y)
    this.solvePoint(x, y + 1)
    this.solvePoint(x - 1, y)
    this.solvePoint(x, y - 1)
  }

  solveMaze () {
    this.solvePoint(0, 1)
    return this.path
  }
}
