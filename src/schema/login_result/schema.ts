// import { personSchema } from "../person/schema";

export const loginResultSchema = {
  definitions: {
    // TODO
    // Write helper fun that "merges" schema definitions
    // and throw errors when there are naming conflicts
    // person: personSchema,
    person: {},
  },
  properties: {
    person: { ref: "person" },
  },
} as const;
