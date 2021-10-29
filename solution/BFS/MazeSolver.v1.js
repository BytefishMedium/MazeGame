class MazeSolver {

  constructor (mazeArray,
               entrancePosition = {x: 0, y: 1}, // 第2行，第1列
               exitPosition = {x: mazeArray[0].length - 1, y: mazeArray.length - 2}
  ) {
    this.mazeArray = mazeArray
    this.path = []

    this.entrancePosition = entrancePosition
    this.exitPosition = exitPosition

    this.directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

    // 和mazeArray一样大的二维数组，如果对应位置的值是true，表示这个坐标已经被访问过了
    this.visitedPositions = new Array(mazeArray.length)
    for (let index = 0; index < this.visitedPositions.length; index++) {
      this.visitedPositions[index] = new Array(mazeArray[index].length).fill(false)
    }

    // [{type: 'enter', position: {x:0, y:1}}, {type: 'exit', position: {x:1, y:1}}]
    this.detailedPath = []

    // 用来记录位置的访问的位置的栈，用数组来模拟栈 [{x: 2, y: 3}]
    this.positionQueue = []
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

  findPath(position){
    let path = []

    let currentPosition = position;
    while(currentPosition){
      path.unshift(currentPosition)
      currentPosition = currentPosition.previousPosition
    }

    return path
  }

  /**
   *
   * @return {*}
   */
  solveMaze () {
    this.positionQueue.unshift({x: this.entrancePosition.x, y: this.entrancePosition.y})

    let isDone = false
    while (this.positionQueue.length !== 0 && isDone === false) {
      let currentPosition = this.positionQueue.pop();
      this.visitedPositions[currentPosition.y][currentPosition.x] = true

      this.detailedPath.push({
        type:'enter',
        position: {
          x: currentPosition.x,
          y: currentPosition.y
        }
      })

      if(currentPosition.x === this.exitPosition.x
        && currentPosition.y === this.exitPosition.y){
        console.log('you win')
        this.path = this.findPath(currentPosition)
        isDone = true
      }

      for (const direction of this.directions) {
        let newX = currentPosition.x + direction[0]
        let newY = currentPosition.y + direction[1]

        if (this.isLegalRoad(newX, newY) && !this.visitedPositions[newY][newX]){
          this.positionQueue.unshift({
            x: newX,
            y: newY,
            previousPosition: currentPosition
          })
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
