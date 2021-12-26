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

    // [{type: 'enter', position: {x:0, y:1}}, {type: 'exit', position: {x:1, y:1}}]
    this.detailedPath = []

    this.positionStack = []
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

  /**
   *
   * @return {*}
   */
  solveMaze () {
    this.positionStack.push({x: this.entrancePosition.x, y: this.entrancePosition.y})

    while (this.positionStack.length !== 0) {
      let currentPosition = this.positionStack.pop();
      this.visitedPositions[currentPosition.y][currentPosition.x] = true

      if(currentPosition.x === this.exitPosition.x
        && currentPosition.y === this.exitPosition.y){
        console.log('you win')
      }

      for (const direction of this.directions) {
        let newX = currentPosition.x + direction[0]
        let newY = currentPosition.y + direction[1]

        if (this.isLegalRoad(newX, newY) && !this.visitedPositions[newY][newX]){
          this.positionStack.push({x: newX, y: newY})
        }
      }
    }

    return this.path
  }
}

function test () {
  let mazeArray = [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ]
  let mazeSolver = new MazeSolver(mazeArray)
  mazeSolver.solveMaze()
  console.log(mazeSolver.detailedPath)
}
test()

function test2 () {
  let mazeArray2 = require('../../maze_files/mazeArray101.node.js')
  let mazeSolver = new MazeSolver(mazeArray2)
  mazeSolver.solveMaze()
}

// test2()
