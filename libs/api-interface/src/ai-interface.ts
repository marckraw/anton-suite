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
}

export interface AIModelInterface {
    type?: ModelType
    chat(args: ChatArgs): Promise<ChatResponse>;
    setSystemMessage?(message: string): void;
    moderation(message: string): Promise<ModerationResponse>
}

export interface OpenAIModelInterface extends AIModelInterface {
    type: 'openai'
    chat(args: OpenAIChatArgs): Promise<ChatResponse>;
}
export interface AnthropicModelInterface extends AIModelInterface {
    type: 'anthropic'
    chat(args: AnthropicChatArgs): Promise<ChatResponse>;
}

export interface ChatArgs {
    model?: string
    messages: Message[]
}

export interface AnthropicChatArgs extends ChatArgs {
    model?: AnthropicModels
}

export interface OpenAIChatArgs extends ChatArgs {
    model?: OpenAIModels
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
            imageGenerations: "/v1/images/generations" // dall-e
        }
    },
    anthropic: {
        baseUrl: "https://api.anthropic.com",
        v1: {
            completions: "/v1/messages",
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




