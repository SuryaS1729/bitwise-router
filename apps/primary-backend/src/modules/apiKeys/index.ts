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
  .put(
    "/",
    async ({ body, userId, status }) => {
      try {
        await ApiKeyService.updateApiKeyDisabled(
          Number(body.id),
          Number(userId),
          body.disabled,
        );
        return {
          message: "updated Api Key successfully",
        };
      } catch (e) {
        return status(411, {
          message: "updating Api Key failed",
        });
      }
    },
    {
      body: ApiKeyModel.updateApiKeySchema,
      response: {
        200: ApiKeyModel.updateApiKeyResponseSchema,
        411: ApiKeyModel.updateApiKeyFailedResponseSchema,
      },
    },
  )
  .delete(
    "/:id",
    async ({ params: { id }, userId, status }) => {
      try {
        await ApiKeyService.delete(Number(id), Number(userId));
        return {
          message: "Api Key Deleted successfully",
        };
      } catch (e) {
        return status(411, {
          message: "deleting Api Key failed",
        });
      }
    },
    {
      response: {
        200: ApiKeyModel.deleteApiKeyResponseSchema,
        411: ApiKeyModel.deleteApiKeyFailedResponseSchema,
      },
    },
  );
