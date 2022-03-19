import { io } from '../http'
// import { CreateUserService } from '../services/CreateUserService';

io.on('connect', (socket) => {
    socket.emit("chat_iniciado", {
        message: "Seu chat foi iniciado"
    });

});