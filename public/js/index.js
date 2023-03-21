//setup board
const n = 3;
var board = document.getElementById("board");
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let unit = document.createElement("div");
    unit.id = `${i} ${j}`;
    unit.classList.add("cell");
    if (i % 2 == (j % 2 == 0 ? 1 : 0)) {
      unit.classList.add("black");
    } else {
      unit.classList.add("white");
    }
    board.appendChild(unit);
  }
}

// socket
var socket = io();

var state = "WAITING";
var p_elem = document.getElementById("player");
var st_elem = document.getElementById("status");
var player = "";
socket.on("id", (id) => {
  player = id;
  p_elem.innerText = player;
});

var selection = null;
var turn = false;

function handleClick(e) {
  if (turn) {
    if (e.target.id == selection) {
      e.target.classList.remove("selected");
      socket.emit("request", player, selection);
      selection = null;
      turn = false;
    } else if (!selection && e.target.innerText == "") {
      selection = e.target.id;
      e.target.classList.add("selected");
    } else {
      document.getElementById(selection).classList.remove("selected");
      e.target.classList.add("selected");
      selection = e.target.id;
    }
  }
}
board.addEventListener("click", handleClick);

socket.on("update", (id, coords) => {
  const b = document.getElementById(coords);
  b.innerText = id;
});

socket.on("play", (id) => {
  if (id == player) {
    turn = true;
  }
  st_elem.innerText = `Player ${id}'s turn`;
});

socket.on("state", (state, id) => {
  board.removeEventListener("click", handleClick);
  if (state == 1) {
    if (id == player) {
      st_elem.innerText = `You win!`;
    } else {
      st_elem.innerText = `You lose`;
    }
  } else {
    st_elem.innerText = `You tie`;
  }
});
