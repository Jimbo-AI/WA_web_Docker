const { Server } = require("socket.io");

const initiateSocket = (server) => {
    const io = new Server(server, {
      path: "/socket/"
    });
  
    io.on("connection", (socket) => {
      console.log("User connected");
      socket.emit("message", "Welcome to the chat!");
    });
  
    return io;
  };
  
  module.exports = initiateSocket;