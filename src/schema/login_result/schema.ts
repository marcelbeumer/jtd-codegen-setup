import { personSchema } from "../person/schema";
import { flattenDefinitions } from "../../jtd-helpers";

export const loginResultSchema = {
  definitions: flattenDefinitions({
    person: personSchema,
  }),
  properties: {
    person: { ref: "person" },
  },
} as const;
