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

  export const updateApiKeySchema = t.Object({
    id: t.String(),
    disabled: t.Boolean(),
  });

  export type updateApiKeySchema = typeof updateApiKeySchema.static;

  export const updateApiKeyResponseSchema = t.Object({
    message: t.Literal("updated Api Key successfully"),
  });

  export type updateApiKeyResponseSchema =
    typeof updateApiKeyResponseSchema.static;

  export const updateApiKeyFailedResponseSchema = t.Object({
    message: t.Literal("updating Api Key failed"),
  });

  export type updateApiKeyFailedResponseSchema =
    typeof updateApiKeyFailedResponseSchema.static;

  export const getApiKeysResponseSchema = t.Object({
    apiKeys: t.Array(
      t.Object({
        id: t.String(),
        apiKey: t.String(),
        name: t.String(),
        creditsConsumed: t.Number(),
        lastUsed: t.Nullable(t.Date()),
        disabled: t.Boolean(),
      }),
    ),
  });
  export type getApiKeysResponseSchema = typeof getApiKeysResponseSchema.static;

  export const deleteApiKeyResponseSchema = t.Object({
    message: t.Literal("Api Key Deleted successfully"),
  });

  export type deleteApiKeyResponseSchema =
    typeof deleteApiKeyResponseSchema.static;

  export const deleteApiKeyFailedResponseSchema = t.Object({
    message: t.Literal("deleting Api Key failed"),
  });

  export type deleteApiKeyFailedResponseSchema =
    typeof deleteApiKeyFailedResponseSchema.static;
}
