import { container } from 'tsyringe';
import { io } from '../http'
import { CreateChatRoomService } from '../services/CreateChatRoomService';
import { CreateUserService } from '../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { GetChatRoomByUsersService } from '../services/GetChatRoomByUsersService';
import { GetUserBySockerIdService } from '../services/GetUserBySockerIdService';

io.on('connect', (socket) => {
    socket.on('start', async (data) => {
        const { email, avatar, name } = data;

        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({
            email,
            avatar_url: avatar,
            name,
            socket_id: socket.id
        });
        socket.broadcast.emit("new_users", user);
    });

    socket.on("get_users", async (callback) => {
        const getAllUsersService = container.resolve(GetAllUsersService);
        const users = await getAllUsersService.execute();
        callback(users);
    });

    socket.on('start_chat', async (data, callback) => {
        const getChatRoomByUsersService = container.resolve(GetChatRoomByUsersService);
        const createChatRoomService = container.resolve(CreateChatRoomService);
        const getUserBySockerIdService = container.resolve(GetUserBySockerIdService);

        const userLogged = await getUserBySockerIdService.execute(socket.id);
        let room = await getChatRoomByUsersService.execute([data.idUser, userLogged._id]);
        if (!room) {
            room = await createChatRoomService.execute([data.idUser, userLogged._id]);
        }
        callback(room)
    })
});