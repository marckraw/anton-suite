export type ModelType = "anthropic" | "openai"; // Add other types as needed

export interface BaseFactoryConfig {
    type?: ModelType
    apiKey: string
}

export interface AnthropicFactoryConfig extends BaseFactoryConfig {
    type: 'anthropic'
    model?: AnthropicModels
}
export interface OpenAIFactoryConfig extends BaseFactoryConfig {
    type: 'openai'
    model?: OpenAIModels
    supportedModelsApiKeys?: {
        leonardoAI?: string
    }
}

export interface AIModelInterface {
    chat(args: ChatArgs): Promise<ChatResponse | ReadableStream>;
    setSystemMessage?(message: string): void;
    moderation(message: string): Promise<ModerationResponse>
}

export interface OpenAIModelInterface extends AIModelInterface {
    chat(args: OpenAIChatArgs): Promise<ChatResponse | ReadableStream>;
    modelsList(): Promise<ModelsListResponse>;
    createImage(args: OpenAICreateImageParams): Promise<CreateImageResponse>
    createImageWithLeonardo(args: LeonardoAICreateImageParams): Promise<LeonardoAICreateImageResponse>
}

export interface AnthropicModelInterface extends AIModelInterface {
    chat(args: AnthropicChatArgs): Promise<ChatResponse | ReadableStream>;
}

export interface LeonardoAIInterface {
    createImage(args: LeonardoAICreateImageParams): Promise<LeonardoAICreateImageResponse>
}

export interface ChatArgs {
    model?: string
    messages: Message[]
    stream?: boolean
}

export interface AnthropicChatArgs extends ChatArgs {
    model?: AnthropicModels
}

export interface OpenAIChatArgs extends ChatArgs {
    model?: OpenAIModels
}

export type OpenAICreateImageParams = {
    prompt: string;

    /**
     * The model to use for image generation.
     */
    model?: (string & {}) | 'dall-e-2' | 'dall-e-3' | null;

    /**
     * The number of images to generate. Must be between 1 and 10. For `dall-e-3`, only
     * `n=1` is supported.
     */
    n?: number | null;

    /**
     * The quality of the image that will be generated. `hd` creates images with finer
     * details and greater consistency across the image. This param is only supported
     * for `dall-e-3`.
     */
    quality?: 'standard' | 'hd';

    /**
     * The format in which the generated images are returned. Must be one of `url` or
     * `b64_json`.
     */
    response_format?: 'url' | 'b64_json' | null;

    /**
     * The size of the generated images. Must be one of `256x256`, `512x512`, or
     * `1024x1024` for `dall-e-2`. Must be one of `1024x1024`, `1792x1024`, or
     * `1024x1792` for `dall-e-3` models.
     */
    size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | null;

    /**
     * The style of the generated images. Must be one of `vivid` or `natural`. Vivid
     * causes the model to lean towards generating hyper-real and dramatic images.
     * Natural causes the model to produce more natural, less hyper-real looking
     * images. This param is only supported for `dall-e-3`.
     */
    style?: 'vivid' | 'natural' | null;

    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor
     * and detect abuse.
     * [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
     */
    user?: string;
}

export const leonardoAIModels = {
    leonardoPhoenixModel: "6b645e3a-d64f-4341-a6d8-7a3690fbf042"
}

export const leonardoAIStyles = {
    "3D Render":"debdf72a-91a4-467b-bf61-cc02bdeb69c6",
    "Bokeh":"9fdc5e8c-4d13-49b4-9ce6-5a74cbb19177",
    "Cinematic":"a5632c7c-ddbb-4e2f-ba34-8456ab3ac436",
    "Cinematic Concept":"33abbb99-03b9-4dd7-9761-ee98650b2c88",
    "Creative":"6fedbf1f-4a17-45ec-84fb-92fe524a29ef",
    "Dynamic":"111dc692-d470-4eec-b791-3475abac4c46",
    "Fashion":"594c4a08-a522-4e0e-b7ff-e4dac4b6b622",
    "Graphic Design Pop Art":"2e74ec31-f3a4-4825-b08b-2894f6d13941",
    "Graphic Design Vector":"1fbb6a68-9319-44d2-8d56-2957ca0ece6a",
    "HDR":"97c20e5c-1af6-4d42-b227-54d03d8f0727",
    "Illustration":"645e4195-f63d-4715-a3f2-3fb1e6eb8c70",
    "Macro":"30c1d34f-e3a9-479a-b56f-c018bbc9c02a",
    "Minimalist":"cadc8cd6-7838-4c99-b645-df76be8ba8d8",
    "Moody":"621e1c9a-6319-4bee-a12d-ae40659162fa",
    "None":"556c1ee5-ec38-42e8-955a-1e82dad0ffa1",
    "Portrait":"8e2bc543-6ee2-45f9-bcd9-594b6ce84dcd",
    "Ray Traced":"b504f83c-3326-4947-82e1-7fe9e839ec0f",
    "Sketch (B&W)":"be8c6b58-739c-4d44-b9c1-b032ed308b61",
    "Sketch (Color)":"093accc3-7633-4ffd-82da-d34000dfc0d6",
    "Stock Photo":"5bdc3f2a-1be6-4d1c-8e77-992a30824a2c",
    "Vibrant":"dee282d3-891f-4f73-ba02-7f8131e5541b"
}



export type LeonardoAICreateImageParams = {
    "modelId": string,
    "contrast": number,
    "prompt": string,
    "num_images": number,
    "width": number,
    "height": number,
    "alchemy": boolean, // true: quality, false: speed
    "styleUUID": string,
    "enhancePrompt": false
}

export type Role = "system" | "user" | "assistant"

export interface Message {
    role: Role;
    content: string;
}

export const anthropicModels = ['claude-3-5-sonnet-20240620'] as const
export type AnthropicModels = typeof anthropicModels[number]

// https://platform.openai.com/docs/models
export const openAIModels = ['gpt-4o', 'gpt-4o-mini', "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"] as const
export type OpenAIModels = typeof openAIModels[number]
export const dalleModels = ['dall-e-3', "dall-e-2"]


export const ENDPOINTS = {
    openai: {
        baseUrl: "https://api.openai.com",
        v1: {
            translations: "/v1/audio/translations",
            transcriptions: "/v1/audio/transcriptions",
            speech: "/v1/audio/speech",
            completions: "/v1/chat/completions",
            embeddings: "/v1/embeddings",
            moderations: "/v1/moderations",
            imageGenerations: "/v1/images/generations", // dall-e
            modelsList: "/v1/models"
        }
    },
    anthropic: {
        baseUrl: "https://api.anthropic.com",
        v1: {
            completions: "/v1/messages",
        }
    },
    leonardoAI: {
        baseUrl: "https://cloud.leonardo.ai/api/rest",
        v1: {
            imageGenerations: "/v1/generations"
        }
    }
}


/**
 * claude-3-5-sonnet -> claude-3-5-sonnet-20240620
 *
 * */
export const antonAPIModels = ['claude-3-5-sonnet', 'gpt-4o'] as const
export type AntonAPIModels = typeof antonAPIModels[number]


export interface OpenAICompletionResponse {
    id: string
    object: string
    created: number
    model: string
    choices: {
        index: number
        message: Message
        logprobs?: null
        finish_reason: string
    }[]
    usage: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
    }
    system_fingerprint: string
}

export interface AnthropicCompletionResponse {
    id: string
    type: string
    role: 'assistant'
    model: string
    content: {
        type: 'text',
        text: string
    }[]
    stop_reason: string
    stop_sequence: null
    usage: {
        input_tokens: number
        output_tokens: number
    }
}

export type OpenAIImage = {
    b64_json?: string;

    /**
     * The prompt that was used to generate the image, if there was any revision to the
     * prompt.
     */
    revised_prompt?: string;

    /**
     * The URL of the generated image, if `response_format` is `url` (default).
     */
    url?: string;
}

export type CreateImageResponse = {
    created: number
    data: OpenAIImage[]
}

export type LeonardoAICreateImageResponse = {

}

export type ModelsListResponse = {
    object: "list"
    data: {
        id: string
        object: string
        created: number
        owned_by: string
    }[]
}

export type ChatResponse = {
    role: Role,
    content: string
}[]

export type ModerationResponse = {
    "id": string
    "model": string
    "results": {
        "flagged": boolean
        "categories": {
            "sexual": boolean
            "hate": boolean
            "harassment": boolean
            "self-harm": boolean
            "sexual/minors": boolean
            "hate/threatening": boolean
            "violence/graphic": boolean
            "self-harm/intent": boolean
            "self-harm/instructions": boolean
            "harassment/threatening": boolean
            "violence": boolean
        }
        "category_scores": {
            "sexual": number
            "hate": number
            "harassment": number
            "self-harm": number
            "sexual/minors": number
            "hate/threatening": number
            "violence/graphic": number
            "self-harm/intent": number
            "self-harm/instructions": number
            "harassment/threatening": number
            "violence": number
        }
    }[]
}




