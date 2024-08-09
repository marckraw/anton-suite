import axios from 'axios';

interface AIResponse {
  text: string;
  model: string;
}

export async function getOpenAIResponse(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      text: response.data.choices[0].message.content,
      model: 'GPT-4',
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

export async function getClaudeResponse(prompt: string): Promise<AIResponse> {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      text: response.data.content[0].text,
      model: 'Claude Sonnet 3.5',
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}
