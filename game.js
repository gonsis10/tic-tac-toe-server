class Game {
  constructor() {
    this.current = "O";
    this.board = new Array(3).fill("").map(() => new Array(3).fill(""));
    this.moved = false;
  }

  update(id, coords) {
    let x, y;
    [x, y] = coords;
    this.board[x][y] = id;
    // console.log(this.board);
  }

  checkWin(id) {
    if (this.board[0][0] == id && this.board[0][1] == id && this.board[0][2] == id) {
      return 1;
    } else if (this.board[1][0] == id && this.board[1][1] == id && this.board[1][2] == id) {
      return 1;
    } else if (this.board[2][0] == id && this.board[2][1] == id && this.board[2][2] == id) {
      return 1;
    } else if (this.board[0][0] == id && this.board[1][0] == id && this.board[2][0] == id) {
      return 1;
    } else if (this.board[0][1] == id && this.board[1][1] == id && this.board[2][1] == id) {
      return 1;
    } else if (this.board[0][2] == id && this.board[1][2] == id && this.board[2][2] == id) {
      return 1;
    } else if (this.board[0][0] == id && this.board[1][1] == id && this.board[2][2] == id) {
      return 1;
    } else if (this.board[0][2] == id && this.board[1][1] == id && this.board[2][0] == id) {
      return 1;
    }

    if (
      this.board.flat().every((item) => {
        if (item != "") {
          return true;
        }
      })
    ) {
      return 0;
    }

    return -1;
  }
}

module.exports = { Game };
