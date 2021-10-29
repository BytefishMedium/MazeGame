class MazeGenerator {
  /**
   *
   * @param {*} n 迷宫的宽度 要求是奇数
   * @param {*} m 迷宫的长度 要求是偶数
   * @param canvas
   */
  constructor (n, m, canvas) {
    if (n % 2 === 0 || m % 2 === 0)
      throw new Error('n, m应该是奇数')

    this.n = n
    this.m = m

    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.d = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ]

    // 树的起点和终点
    this.startPosition = {x: 0, y: 1}
    this.endPosition = {x: n - 1, y: m - 2}

    this.mazeArray = new Array(m)
    for (let i = 0; i < this.mazeArray.length; i++) {
      this.mazeArray[i] = new Array(n).fill(1)
    }
    this.mazeArray[this.startPosition.y][this.startPosition.x] = 0
    this.mazeArray[this.endPosition.y][this.endPosition.x] = 0
    this.initRoad()

    // 和mazeArray一样大的二维数组，如果对应位置的值是true，表示这个坐标已经被访问过了
    this.visitedPositions = new Array(this.mazeArray.length)
    for (let index = 0; index < this.visitedPositions.length; index++) {
      this.visitedPositions[index] = new Array(this.mazeArray[index].length).fill(false)
    }

    this.positionQueue = []
  }

  // 每个奇数行的奇数列，设置为road
  initRoad () {
    for (let i = 1; i < this.mazeArray[0].length; i = i + 2) {
      for (let j = 1; j < this.mazeArray.length; j = j + 2) {
        this.mazeArray[j][i] = 0
      }
    }
  }

  /**
   * 首先这个点应该在迷宫，其次这个点应该是路，对应的数值是0
   * @param {*} x 点的横坐标
   * @param {*} y 点的纵坐标
   */
  inArea (x, y) {
    // 横坐标是否溢出
    if (x < 0 || x >= this.mazeArray[0].length) {
      return false
    }

    // 纵坐标是否超过边界
    if (y < 0 || y >= this.mazeArray.length) {
      return false
    }

    return true
  }

  renderRect (x, y, color) {
    let itemWidth = this.canvas.width / this.n
    let itemHeight = this.canvas.height / this.m

    this.context.beginPath()

    // 每个正方形的变长是4，横坐标是j*4，纵坐标是i*4
    this.context.rect(x * itemWidth, y * itemHeight, itemWidth, itemHeight)

    this.context.fillStyle = color
    this.context.fill()

    this.context.closePath()
  }

  async generateAndRender () {
    this.positionQueue.unshift({x: 1, y: 1})
    this.visitedPositions[1][1] = true

    while (this.positionQueue.length !== 0) {
      // 深度右边遍历不能这样玩，有顺序要求的
      //let currentPosition = this.positionQueue.pop()
      let currentPosition = Math.random() > 0.5 ?  this.positionQueue.pop() : this.positionQueue.shift()

      for (let i = 0; i < 4; i++) {
        let newX = currentPosition.x + this.d[i][0] * 2
        let newY = currentPosition.y + this.d[i][1] * 2
        if (this.inArea(newX, newY) && !this.visitedPositions[newY][newX]) {
          Math.random() > 0.5 ? this.positionQueue.unshift({x: newX, y: newY}) : this.positionQueue.push({x: newX, y: newY})
          this.visitedPositions[newY][newX] = true

          this.mazeArray[currentPosition.y + this.d[i][1]][currentPosition.x + this.d[i][0]] = 0
          this.renderRect(currentPosition.x + this.d[i][0], currentPosition.y + this.d[i][1], 'white')
          await this.sleep(40)
        }
      }
    }
  }

  generate () {
    this.positionQueue.unshift({x: 1, y: 1})
    this.visitedPositions[1][1] = true

    while (this.positionQueue.length !== 0) {
      // 深度右边遍历不能这样玩，有顺序要求的
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  renderMaze () {
    for (let i = 0; i < this.mazeArray.length; i++) {
      for (let j = 0; j < this.mazeArray[i].length; j++) {
        let color =  this.mazeArray[i][j] === 0 ? 'white' : '#3581fc'
        this.renderRect(j, i, color)
      }
    }
  }
}
