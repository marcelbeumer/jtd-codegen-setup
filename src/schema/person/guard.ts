import { createJtdTypeGuard } from "../../jtd-helpers";
import { individualSchema, personSchema } from "./schema";
import { Individual, Person } from "./types";

export const isPerson = createJtdTypeGuard<Person>(personSchema);
export const isIndividual = createJtdTypeGuard<Individual>(individualSchema);
