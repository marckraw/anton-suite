export interface AIModel {
  chat(messages: Message[]): Promise<ChatResponse>;
  setSystemMessage?(message: string): Promise<void>;
}

export type Role = "system" | "user" | "assistant"

export interface Message {
  role: Role;
  content: string;
}

export const anthropicModels = ['claude-3-5-sonnet']

// https://platform.openai.com/docs/models
export const openAIModels = ['gpt-4o', 'gpt-4o-mini', "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"]
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




