import {AntonSDK} from "@mrck-labs/anton-sdk-test";

export const initializeAnton = () => {
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