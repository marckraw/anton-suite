import {createLogger} from "@/app/api-src/logger";
import {initializeAnton} from "@/app/api-src/anton";
import {Message} from "@mrck-labs/api-interface";

const logger = createLogger({name: "chat", level: "info"})

interface ChatRequest {
    messages: Message[]
}

export async function POST(request: Request) {
    logger.info("POST /chat")

    const anton = initializeAnton()

    if(anton.error) {
        return Response.json(anton.error)
    }

    const {messages} = await request.json() as ChatRequest;

    const response = await anton.client.chat(messages);

    return Response.json({data: response})
}