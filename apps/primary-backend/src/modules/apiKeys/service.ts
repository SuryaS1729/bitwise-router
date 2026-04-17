import { prisma } from "db";
import { UserScalarFieldEnum } from "db/generated/prisma/internal/prismaNamespace";
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

  static async getApiKeys(userId: number) {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId: userId,
      },
    });

    return apiKeys.map((apikey) => ({
      id: apikey.id.toString(),
      apiKey: apikey.apiKey,
      name: apikey.name,
      creditsConsumed: apikey.creditsConsumed,
      lastUsed: apikey.lastUsed,
    }));
  }

  static async updateApiKeyDisabled(
    apiKeyId: number,
    userId: number,
    disabled: boolean,
  ) {
    await prisma.apiKey.update({
      where: {
        id: Number(apiKeyId),
        userId: userId,
      },
      data: {
        disabled,
      },
    });
  }
}
