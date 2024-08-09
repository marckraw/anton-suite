import {createLogger} from "@/app/api-src/logger";
import {initializeAnton} from "@/app/api-src/anton";

const logger = createLogger({name: "hello", level: "info"})



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