(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    this.el = $el;
    this.board = new SnakeGame.Board();
    this.keyBinding();
    this.preRender();
    this.run();
  }

  View.prototype.keyBinding = function () {
    var that = this;
    $("html").keydown(function(event) {
      if (event.keyCode === 87 || event.keyCode === 38) {
        that.board.snake.turn([0, -1]);
      } else if (event.keyCode === 65 || event.keyCode === 37) {
        that.board.snake.turn([1, 0]);
      } else if (event.keyCode === 83 || event.keyCode === 40) {
        that.board.snake.turn([0, 1]);
      } else if (event.keyCode === 68 || event.keyCode === 39) {
        that.board.snake.turn([-1, 0]);
      } else if (event.keyCode === 27) {
        if (!that.paused) {
          window.clearInterval(that.intID);
          that.paused = true;
        } else {
          that.run();
        }
      }
    });
  };

  View.prototype.preRender = function () {
    for (var i = 0; i < this.board.grid.length; i++) {
      this.el.append("<ul></ul>");
      for (var j = 0; j < this.board.grid.length; j++) {
        this.el.children().last().append("<li></li>");
      };
    };
  };

  View.prototype.render = function () {
    var that = this;
    $('.snake').removeClass('snake');
    $('.head').removeClass('head');
    var applePos = that.board.apple.pos;
    $($(that.el.children()[applePos[0]]).children()[applePos[1]]).addClass("apple");
    that.board.snake.segments.forEach( function(seg, index) {
      if (index === 0) {
        $($(that.el.children()[seg[0]]).children()[seg[1]]).addClass("head");
      }
      $($(that.el.children()[seg[0]]).children()[seg[1]]).addClass("snake");
    });
  };

  View.prototype.run = function () {
    var that = this;
    this.paused = false;
    this.intID = window.setInterval(function () {
      that.board.snake.move(that.board.apple);
      that.render();
      if (that.board.lose()) {
        alert("You Lose");
        window.clearInterval(that.intID);
      }
    }, 50)
  };



})();


