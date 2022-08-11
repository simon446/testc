import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function create_completion(code, options) {
  const completion = await openai.createCompletion({
    model: options.model,
    prompt: code,
    temperature: options.temperature,
    max_tokens: options.max_tokens,
  });

  return completion.data.choices;
}