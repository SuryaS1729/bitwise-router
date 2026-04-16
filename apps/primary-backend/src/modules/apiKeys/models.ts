import { t } from "elysia";

export namespace ApiKeyModel {
  export const createApiKeySchema = t.Object({
    name: t.String(),
  });
  export type createApiKeySchema = typeof createApiKeySchema.static;

  export const createApiKeyResponseSchema = t.Object({
    id: t.String(),
    apiKey: t.String(),
  });
  export type createApiKeyResponseSchema =
    typeof createApiKeyResponseSchema.static;

  export const disableApiKeySchema = t.Object({
    id: t.String(),
  });

  export type disableApiKeySchema = typeof disableApiKeySchema.static;

  export const disableApiKeyResponseSchema = t.Object({
    message: t.Literal("Disabled Api Key successfully"),
  });

  export type disableApiKeyResponseSchema =
    typeof disableApiKeyResponseSchema.static;

  export const getApiKeysResponseSchema = t.Object({
    name: t.String(),
    apiKey: t.String(),
    lastUsed: t.String(),
    creditsConsumed: t.String(),
  });
  export type getApiKeysResponseSchema = typeof getApiKeysResponseSchema.static;

  export const deleteApiKeyResponseSchema = t.Object({
    message: t.Literal("Api Key Deleted successfully"),
  });

  export type deleteApiKeyResponseSchema =
    typeof deleteApiKeyResponseSchema.static;
}
