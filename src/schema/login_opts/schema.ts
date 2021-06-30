export const loginOptsSchema = {
  properties: {
    user: { type: "string" },
    pass: { type: "string" },
  },
} as const;
