import { type NextRequest } from 'next/server'
import {createLogger} from "@/app/api-src/logger";
import {initializeOpenAIAnton} from "@/app/api-src/anton";

const logger = createLogger({name: "chat", level: "info"})

export async function GET(request: NextRequest) {
    logger.info("GET /models-list")

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')

    if(type === 'openai') {
        const anton = initializeOpenAIAnton()

        if(anton.error) {
            return Response.json(anton.error)
        }

        const response = await anton.client.modelsList()

        return Response.json({data: response})
    } else {
        return Response.json({error: 'Invalid type - only openai provide this endpoint (models-list)', status: 404})
    }
}