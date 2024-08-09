import {createLogger} from "@/app/api-src/logger";
import {initializeAnthropicAnton} from "@/app/api-src/anton";

const logger = createLogger({name: "moderation", level: "info"})

interface ChatRequest {
    message: string
}

export async function POST(request: Request) {
    logger.info("POST /moderation")

    const anton = initializeAnthropicAnton()

    if(anton.error) {
        return Response.json(anton.error)
    }

    const {message} = await request.json() as ChatRequest;

    const response = await anton.client.ai.moderation(message);

    return Response.json({data: response})
}