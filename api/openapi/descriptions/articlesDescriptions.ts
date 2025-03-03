import { describeRoute } from "npm:hono-openapi@0.4.5";
import { articleSchema, errorResponseSchema } from "@openapi/schemas.ts";

export const getArticlesByIdsDesc = describeRoute({
  summary: "Get articles by IDs",
  description: "This endpoint retrieves articles by their IDs.",
  tags: ["Articles"],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            articleIds: {
              type: "array",
              items: { type: "string" },
              description: "Array of article IDs",
            },
          },
          required: ["articleIds"],
        },
      },
    },
  },
  responses: {
    200: {
      description: "Articles retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: articleSchema,
          },
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});
