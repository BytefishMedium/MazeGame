class MazeGenerator {
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

    this.positionStack = []
  }

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
    this.positionStack.push({x: 1, y: 1})
    this.visitedPositions[1][1] = true

    while (this.positionStack.length !== 0) {
      let currentPosition = this.positionStack.pop()

      for (let i = 0; i < 4; i++) {
        let newX = currentPosition.x + this.d[i][0] * 2
        let newY = currentPosition.y + this.d[i][1] * 2
        if (this.inArea(newX, newY) && !this.visitedPositions[newY][newX]) {
          this.positionStack.push({x: newX, y: newY})
          this.visitedPositions[newY][newX] = true
          this.mazeArray[currentPosition.y + this.d[i][1]][currentPosition.x + this.d[i][0]] = 0
          this.renderRect(currentPosition.x + this.d[i][0], currentPosition.y + this.d[i][1], 'white')
          await this.sleep(40)
        }
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async goAndRender(x, y){
    this.visitedPositions[y][x] = true

    for (let i = 0; i < this.d.length; i++) {
      let newX = x + this.d[i][0] * 2
      let newY = y + this.d[i][1] * 2

      if(this.inArea(newX, newY) && !this.visitedPositions[newY][newX]){

        this.mazeArray[y + this.d[i][1]][x + this.d[i][0]] = 0
        this.renderRect(x + this.d[i][0], y + this.d[i][1], 'white')

        await this.sleep(40)

        await this.goAndRender(newX, newY)
      }
    }

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
