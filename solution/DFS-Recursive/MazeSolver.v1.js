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

  solveMaze () {
    return this.path
  }
}
