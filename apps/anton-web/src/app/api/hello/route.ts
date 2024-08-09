import {AntonSDK} from "@mrck-labs/anton-sdk-test";

export async function GET(request: Request) {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if(!apiKey) {
        return Response.json({status: 401, body: 'API key not found'});
    }
    
    const anton = new AntonSDK({ type: 'anthropic', apiKey: apiKey });

    const response = await anton.chat([
        {
            content: 'Hey there, how are you ? :)',
            role: 'user',
        },
    ]);

    return Response.json({data: response})
}