const MazeSolver = require('./MazeSolver.v5')

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
}
test()

function test2 () {
  let mazeArray2 = require('../../maze_files/mazeArray101.node.js')
  let mazeSolver = new MazeSolver(mazeArray2)
  mazeSolver.solveMaze()
}

test2()
