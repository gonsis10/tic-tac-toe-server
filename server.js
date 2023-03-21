const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { Game } = require("./game");

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// const loginRouter = require("./routes/login");
const matchRouter = require("./routes/match");

// app.use("/", loginRouter);
app.use("/match", matchRouter);

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.post("/", (req, res) => {
  res.redirect(`/match/?id=${1}&name=${req.body.name}`);
});

//Tic Tac Toe Game
const game = new Game();

var symbol;
var current_room = uid();
var clients = [];
io.on("connection", (socket) => {
  //handle room
  if (clients.length % 2 == 0) {
    current_room = uid();
    symbol = ["O", "X"];
  }
  var room = current_room;
  socket.join(room);
  clients.push(socket);

  //handle game
  socket.emit("id", symbol.pop());
  if (symbol.length == 0) {
    // socket.broadcast.to(room).emit("opponent")
    io.to(room).emit("play", "X");
  }
  socket.on("request", (id, coords) => {
    game.update(
      id,
      coords.split(" ").map((x) => parseInt(x))
    );
    io.to(room).emit("update", id, coords);
    switch (game.checkWin(id)) {
      case 1:
        io.to(room).emit("state", 1, id);
        break;
      case 0:
        io.to(room).emit("state", 0, 0);
        break;
      default:
        if (id == "X") {
          io.to(room).emit("play", "O");
        } else {
          io.to(room).emit("play", "X");
        }
    }
  });

  socket.on("disconnect", () => {
    const index = clients.indexOf(socket);
    if (index > -1) {
      clients.splice(index, 1);
    }
    if (clients.length % 2 == 1) {
      symbol = ["O"];
    } else {
      symbol = ["O", "X"];
    }
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
