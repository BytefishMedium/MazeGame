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
  }

  isLegalRoad (x, y) {
    // 横坐标是否溢出
    if (x < 0 || x >= this.mazeArray[0].length) {
      return false
    }

    // 纵坐标是否超过边界
    if (y < 0 || y >= this.mazeArray.length) {
      return false
    }

    // 是否是路，1代表墙
    if (this.mazeArray[y][x] === 1) {
      return false
    }

    return true
  }

  solvePoint(x, y){
    this.visitedPositions[y][x] = true
    this.path.push({x, y})
    this.detailedPath.push({
      type: 'enter',
      position: {x, y}
    })

    if (x === this.exitPosition.x && y === this.exitPosition.y) {
      console.log('you win')
      return true
    }

    for (const direction of this.directions) {
      let newX = x + direction[0]
      let newY = y + direction[1]

      if (this.isLegalRoad(newX, newY) && !this.visitedPositions[newY][newX]){
        let isDone = this.solvePoint(newX, newY)
        if(isDone) return true
      }
    }

    this.path.pop()
    this.detailedPath.push({
      type: 'exit',
      position: {x, y}
    })

    return false
  }

  /**
   *
   * @return {*}
   */
  solveMaze () {
    let result = this.solvePoint(0, 1)
    if (result === false) {
      console.log('no solution for this maze')
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
// test()

function test2 () {
  let mazeArray2 = require('../../maze_files/mazeArray101.node.js')
  let mazeSolver = new MazeSolver(mazeArray2)
  mazeSolver.solveMaze()
}

// test2()
