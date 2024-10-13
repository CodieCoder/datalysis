import ENV from '../config/env';

interface IPrompt {
  inputs: string;
}

export const apiInference = async (prompt: IPrompt) => {
  const response = await fetch(
    // 'https://api-inference.huggingface.co/models/meta-llama/CodeLlama-7b-hf',
    'https://api-inference.huggingface.co/models/codellama/CodeLlama-7b-hf',
    {
      headers: {
        Authorization: `Bearer ${ENV.HUGGING_FACE_API}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(prompt),
    }
  );
  const result = await response.json();
  return JSON.stringify(result);
};
