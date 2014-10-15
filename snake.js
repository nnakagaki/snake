(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.dir = [0,1];
    this.segments = [[2,0],[1,0],[0,0]];
  }

  Snake.prototype.plusCoord = function (firstCoor, plusCoor) {
    return [firstCoor[0] + plusCoor[0], firstCoor[1] + plusCoor[1]]
  };

  Snake.prototype.turn = function (pos) {
    if ((Math.abs(pos[0]) === Math.abs(this.dir[0])) && (Math.abs(pos[1]) === Math.abs(this.dir[1]))) {

    } else {
      this.dir = pos;
    }
  };

  Snake.prototype.move = function (apple) {
    var here = this.segments[0];
    var eaten = false;
    if (here[0] === apple.pos[0] && here[1] === apple.pos[1]) {
      eaten = true;
    }
    this.segments[0] = this.plusCoord(this.segments[0], this.dir)
    for (var i = 1; i < this.segments.length; i++) {
      var there = this.segments[i];
      this.segments[i] = here;
      here = there;
    };
    if (eaten) {
      this.segments.push(there);
      apple.reSpawn();

    }

  };

  var Apple = SnakeGame.Apple = function () {
    this.pos = this.randomLoc();
  }

  Apple.prototype.randomLoc = function (snake) {
    do {
      var x = Math.floor(Math.random() * 29.999);
      var y = Math.floor(Math.random() * 29.999);
    } while (false)
    return [x,y]
  };

  Apple.prototype.reSpawn = function () {
    $('.apple').removeClass('apple');
    this.pos = this.randomLoc();
  };

  var Board = SnakeGame.Board = function () {
    this.snake = new Snake();
    this.apple = new Apple();
    this.grid = this.makeGrid();
  }

  Board.prototype.makeGrid = function () {
    var grid = [];

    for (var i = 0; i < 30; i++) {
      grid.push([]);
      for (var j = 0; j < 30; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  };

  Board.prototype.lose = function () {
    var pos = this.snake.segments[0];
    if (pos[0] < 0 || pos[0] > 29 || pos[1] < 0 || pos[1] > 29) {
      return true;
    } else if (this.touchingItself(pos)) {
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.touchingItself = function (pos) {
    for (var i = 1; i < this.snake.segments.length; i++) {
      if (pos[0] === this.snake.segments[i][0] && pos[1] === this.snake.segments[i][1]) {
        return true;
      }
    };
  };



})();