import {AntonSDK} from "@mrck-labs/anton-sdk-test";
import {AnthropicModels, OpenAIModels} from "@mrck-labs/api-interface";

export const initializeAnthropicAnton = () => {
    // const type = 'openai';
    // const apiKey = process.env.OPENAI_API_KEY;
    // const model: OpenAIModels = 'gpt-4o';

    const type = 'anthropic';
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model: AnthropicModels = 'claude-3-5-sonnet-20240620'

    if(!apiKey) {
        return {
            client: null,
            error: {
                status: 401,
                body: 'API key not found',
            },
        }
    }


    const anton = AntonSDK.create({ type, apiKey, model });


    return {
        client: anton,
        error: false,
    }
}