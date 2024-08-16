import axios from "axios";
import type { AxiosInstance } from "axios";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import {
    ENDPOINTS, LeonardoAIInterface,
    LeonardoAICreateImageResponse,
    LeonardoAICreateImageParams
} from '@mrck-labs/api-interface';

export class LeonardoAIModel implements LeonardoAIInterface {
    private api: AxiosInstance;
    private baseUrl = ENDPOINTS.leonardoAI.baseUrl;

    constructor(private apiKey: string) {
        if (isBrowser) {
            throwErrorIfBrowser("LeonardoAI");
        }

        console.log("This is apiKey", this.apiKey)

        this.api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.apiKey}`,
            },
        });
    }

    async createImage(args: LeonardoAICreateImageParams): Promise<LeonardoAICreateImageResponse> {
        try {
            const response = await this.api.post<LeonardoAICreateImageParams>(ENDPOINTS.leonardoAI.v1.imageGenerations, {
                ...args
            });
            return response.data;
        } catch (error) {
            console.error("LeonardoAI API error:", error);
            throw error;
        }
    }
}
