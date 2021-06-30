export const individualSchema = {
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    metadata: { ref: "metadata" },
  },
} as const;

const metadataSchema = {
  properties: {
    a: { type: "string" },
    b: { type: "string" },
    c: { type: "string" },
  },
} as const;

export const personSchema = {
  definitions: {
    metadata: metadataSchema,
    individual: individualSchema,
  },
  properties: {
    ...individualSchema.properties,
    mother: { ref: "individual" },
    father: { ref: "individual" },
  },
} as const;
