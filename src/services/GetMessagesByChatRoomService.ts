import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

@injectable()
class GetMessagesByChatRoomService {
    async execute(roomId: string) {
        const message = await Message.find({
            roomId
        }).populate('to')
            .exec();
        return message;
    }
}

export {
    GetMessagesByChatRoomService
}