class MazeGenerator {
  /**
   *
   * @param {*} n 迷宫的宽度 要求是奇数
   * @param {*} m 迷宫的长度 要求是偶数
   * @param canvas
   */
  constructor (n, m) {
    if (n % 2 === 0 || m % 2 === 0)
      throw new Error('n, m应该是奇数')

    this.n = n
    this.m = m

    this.d = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ]

    this.startPosition = {x: 0, y: 1}
    this.endPosition = {x: n - 1, y: m - 2}

    this.mazeArray = new Array(m)
    for (let i = 0; i < this.mazeArray.length; i++) {
      this.mazeArray[i] = new Array(n).fill(1)
    }
    this.mazeArray[this.startPosition.y][this.startPosition.x] = 0
    this.mazeArray[this.endPosition.y][this.endPosition.x] = 0
    this.initRoad()

    this.visitedPositions = new Array(this.mazeArray.length)
    for (let index = 0; index < this.visitedPositions.length; index++) {
      this.visitedPositions[index] = new Array(this.mazeArray[index].length).fill(false)
    }

    this.positionQueue = []
  }

  // The odd column of each odd row, set to road
  initRoad () {
    for (let i = 1; i < this.mazeArray[0].length; i = i + 2) {
      for (let j = 1; j < this.mazeArray.length; j = j + 2) {
        this.mazeArray[j][i] = 0
      }
    }
  }

  inArea (x, y) {
    if (x < 0 || x >= this.mazeArray[0].length) {
      return false
    }

    if (y < 0 || y >= this.mazeArray.length) {
      return false
    }

    return true
  }


  generate () {
    this.positionQueue.unshift({x: 1, y: 1})
    this.visitedPositions[1][1] = true

    while (this.positionQueue.length !== 0) {
      //let currentPosition = this.positionQueue.pop()
      let currentPosition = Math.random() > 0.5 ?  this.positionQueue.pop() : this.positionQueue.shift()

      for (let i = 0; i < 4; i++) {
        let newX = currentPosition.x + this.d[i][0] * 2
        let newY = currentPosition.y + this.d[i][1] * 2
        if (this.inArea(newX, newY) && !this.visitedPositions[newY][newX]) {
          Math.random() > 0.5 ? this.positionQueue.unshift({x: newX, y: newY}) : this.positionQueue.push({x: newX, y: newY})
          this.visitedPositions[newY][newX] = true

          this.mazeArray[currentPosition.y + this.d[i][1]][currentPosition.x + this.d[i][0]] = 0
        }
      }
    }
    return this.mazeArray
  }
}
