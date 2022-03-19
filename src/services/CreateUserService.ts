import { injectable } from "tsyringe";
import { User } from "../schemas/User"

interface CreateUserDTO {
    email: string;
    socket_id: string
    avatar_url: string
    name: string
}


@injectable()
class CreateUserService {

    async execute({ email, socket_id, avatar_url, name }: CreateUserDTO) {
        const userAlreadyExists = await User.findOne({ email }).exec();
        if (userAlreadyExists) {
            const user = await User.findOneAndUpdate(
                {
                    _id: userAlreadyExists._id
                },
                {
                    $set: { socket_id, avatar_url, name }
                },
                {
                    new: true
                }
            );
            return user;
        } else {
            const user = await User.create({
                email,
                socket_id,
                avatar_url,
                name,
            });
            return user;
        }
    }
}

export {
    CreateUserService
}