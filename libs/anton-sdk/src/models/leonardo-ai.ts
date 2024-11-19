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

    async getGeneratedImageUrl(generationId: string): Promise<string> {
        const maxAttempts = 30; // 30 seconds timeout
        let attempts = 0;

        while (attempts < maxAttempts) {
            const response = await this.api.get<{
                generations_by_pk: {
                    status: string;
                    generated_images: Array<{
                        url: string;
                    }>;
                }
            }>(ENDPOINTS.leonardoAI.v1.imageGenerations + `/${generationId}`);

            if (response.data.generations_by_pk.status === 'COMPLETE') {
                return response.data.generations_by_pk.generated_images[0].url;
            }

            if (response.data.generations_by_pk.status === 'FAILED') {
                throw new Error('Image generation failed');
            }

            attempts++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        throw new Error('Timeout waiting for image generation');
    }
}


// type GetCurrentImageGenerationResponse = {
//     "generations_by_pk": {
//       "generated_images": {
//         "url":string,
//         "nsfw": boolean,
//         "id": string,
//         "likeCount": number,
//         "motionMP4URL": null,
//         "generated_image_variation_generics": []
//       }[],
//       "modelId": "b24e16ff-06e3-43eb-8d33-4416c2d75876",
//       "motion": null,
//       "motionModel": null,
//       "motionStrength": null,
//       "prompt": "A majestic cat in the snow",
//       "negativePrompt": "",
//       "imageHeight": 768,
//       "imageToVideo": null,
//       "imageWidth": 1024,
//       "inferenceSteps": 15,
//       "seed": 8827082104,
//       "ultra": null,
//       "public": false,
//       "scheduler": "EULER_DISCRETE",
//       "sdVersion": "SDXL_LIGHTNING",
//       "status": "COMPLETE",
//       "presetStyle": "DYNAMIC",
//       "initStrength": null,
//       "guidanceScale": null,
//       "id": "5d02fbb1-87a4-4f48-91cb-6971a5506011",
//       "createdAt": "2024-11-19T10:42:59.533",
//       "promptMagic": false,
//       "promptMagicVersion": null,
//       "promptMagicStrength": null,
//       "photoReal": false,
//       "photoRealStrength": null,
//       "fantasyAvatar": null,
//       "prompt_moderations": [
//         {
//           "moderationClassification": []
//         }
//       ],
//       "generation_elements": []
//     }
//   }
