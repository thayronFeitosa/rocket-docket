const socket = io("http://localhost:3000");

socket.on("chat_iniciado", data => {
  console.log(data);
});
