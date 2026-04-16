import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { ApiKeyService } from "./service";
import { ApiKeyModel } from "./models";

export const app = new Elysia({ prefix: "/api-keys" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .resolve(async ({ cookie: { auth }, status, jwt }) => {
    if (!auth) {
      return status(401);
    }
    const decoded = await jwt.verify(auth.value as string);
    if (!decoded || !decoded.userId) {
      return status(401);
    }
    return {
      userId: decoded.userId as string,
    };
  })
  .post(
    "/",
    async ({ userId, body }) => {
      const { id, apiKey } = await ApiKeyService.createApiKey(
        body.name,
        Number(userId),
      );
      return {
        id,
        apiKey,
      };
    },
    {
      body: ApiKeyModel.createApiKeySchema,
      response: {
        200: ApiKeyModel.createApiKeyResponseSchema,
      },
    },
  )
  .get(
    "/",
    async ({ userId, body }) => {
      const apiKeys = await ApiKeyService.getApiKeys(Number(userId));
      return {
        apiKeys: apiKeys,
      };
    },
    {
      response: {
        200: ApiKeyModel.getApiKeysResponseSchema,
      },
    },
  )
  .post("/disable", () => {})
  .delete("/:id", () => {});
