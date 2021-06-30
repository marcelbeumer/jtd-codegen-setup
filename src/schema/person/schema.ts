export const individualSchema = {
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
} as const;

export const personSchema = {
  definitions: {
    individual: individualSchema,
  },
  properties: {
    ...individualSchema.properties,
    mother: { ref: "individual" },
    father: { ref: "individual" },
  },
} as const;
