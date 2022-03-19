
import { server } from "./http";
import './websocket/ChatService'
server.listen(3000, () => console.log('Serviador rodando na porta 3333'));
