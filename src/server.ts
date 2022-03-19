
import { server } from "./http";
import './websocket/ChatService'
server.listen(process.env.PORT, () => console.log(`Serviador rodando na porta ${process.env.PORT}`));
