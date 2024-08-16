import { type NextRequest } from 'next/server'
import {createLogger} from "@/app/api-src/logger";
import {initializeOpenAIAnton} from "@/app/api-src/anton";
import {LeonardoAICreateImageParams, OpenAICreateImageParams} from "@mrck-labs/api-interface";

const logger = createLogger({name: "chat", level: "info"})

export async function POST(request: NextRequest) {
    logger.info("POST /image")

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const imageModel = searchParams.get('imageModel')

    if(type === 'openai') {
        const anton = initializeOpenAIAnton()

        if(anton.error) {
            return Response.json(anton.error)
        }

        if(imageModel === 'leonardoAI') {
            const body: LeonardoAICreateImageParams = await request.json()

            const response = await anton.client.createImageWithLeonardo({
                ...body
            })

            return Response.json({data: response})
        } else {
            const body: OpenAICreateImageParams = await request.json()

            const response = await anton.client.createImage({
                ...body
            })

            return Response.json({data: response})
        }
    } else {
        return Response.json({error: 'Invalid type - only openai provide this endpoint (createImage)', status: 404})
    }
}