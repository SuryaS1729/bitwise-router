import { prisma } from "db";
const API_KEY_LENGTH = 20;
const ALPHABET_SET = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOKJHGVFC2345672E4";
export abstract class ApiKeyService {
  static createRandomApiKey() {
    let suffixKey = "";
    for (let i = 0; i < API_KEY_LENGTH; i++) {
      suffixKey +=
        ALPHABET_SET[Math.floor(Math.random() * ALPHABET_SET.length)];
    }
    return `bt-dharma-v1-${suffixKey}`;
  }
  static async createApiKey(
    name: string,
    userId: number,
  ): Promise<{
    id: string;
    apiKey: string;
  }> {
    const apiKey = this.createRandomApiKey();
    const apiKeyDb = await prisma.apiKey.create({
      data: {
        name,
        userId,
        apiKey,
      },
    });
    return {
      id: apiKeyDb.id.toString(),
      apiKey,
    };
  }
}
