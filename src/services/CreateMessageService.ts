import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

interface CreateMEssageDTO {
    to: string;
    text: string;
    roomId: string;
}

@injectable()
class CreateMessageService {
    async execute({ to, text, roomId }: CreateMEssageDTO) {
        const message = await Message.create({
            to, text, roomId
        });

        return message;
    }
}

export { CreateMessageService }