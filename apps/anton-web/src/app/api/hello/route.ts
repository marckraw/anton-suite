import {AntonSDK} from "@mrck-labs/anton-sdk-test";
import {createLogger} from "@/app/api-src/logger";
import {createRequestResponseMocks} from "next/dist/server/lib/mock-request";

const logger = createLogger({name: "hello", level: "info"})

const initializeAnton = () => {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if(!apiKey) {
        return {
            client: null,
            error: {
                status: 401,
                body: 'API key not found',
            },
        }
    }


    const anton = new AntonSDK({ type: 'anthropic', apiKey: apiKey });

    return {
        client: anton,
        error: false,
    }
}

export async function GET(request: Request) {
    logger.info("GET /hello")

    const anton = initializeAnton()

    if(anton.error) {
        return Response.json(anton.error)
    }


    const response = await anton.client.chat([
        {
            content: 'Hey there, how are you ? :)',
            role: 'user',
        },
    ]);

    return Response.json({data: response})
}


export async function POST(request: Request) {
    logger.info("POST /hello")

    const anton = initializeAnton()

    if(anton.error) {
        return Response.json(anton.error)
    }

    const {message} = await request.json();

    const response = await anton.client.chat([
        {
            content: message,
            role: 'user',
        },
    ]);

    return Response.json({data: response})
}