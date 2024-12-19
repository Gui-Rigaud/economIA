import { extractJsonFromString } from "./extractJsonFromString";
const { VertexAI } = require('@google-cloud/vertexai');

export async function generate(prompt: string, destinationUri: string) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API key não encontrada no arquivo .env.");
    return;
  }

  const projectId = "integral-genius-444511-f0"; // Substitua pelo seu ID do projeto
  const location = "us-central1"; // Substitua pela sua localização

  // Inicializa o Vertex AI SDK
  const vertexAI = new VertexAI({ project: projectId, location: location, apiKey: apiKey });

  // Inicializa o Generative Model com o Vertex AI SDK
  const model = await vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }); // Objeto GenerativeModel

  const textInstruction = "Classificar transações de uma fatura de cartão de crédito em categorias predefinidas com base no tipo de estabelecimento, descrição da compra, ou outras informações relevantes.";

  const fileUri = "gs://fatura_cartao_1/json/" + destinationUri; // Use a URI correta do seu bucket
  const mimeType = "text/plain";

  const document1 = {
    fileUri: fileUri,
    mimeType: mimeType,
  };

  const parts = [
    { text: prompt },
    { fileData: document1 },
  ];

  const generationConfigure = {
    temperature: 1,
    topP: 0.95,
    maxOutputTokens: 10000,
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    ],
    responseMimeType: "application/json",
    responseSchema: { type: "OBJECT", properties: { response: { type: "STRING" } } },
    systemInstruction: [{ text: textInstruction }],
  };

  try {
    const result = await model.generateContent({ contents: { role: 'user', parts: parts }, generationConfigure });
    return extractJsonFromString(String(result.response.candidates[0].content.parts[0].text));
  } catch (error) {
    console.error("Ocorreu um erro ao gerar conteúdo:", error);
  }
}