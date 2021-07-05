import { Schema, validate } from "jtd";

type TypeGuardFn<T> = (o: unknown) => o is T;

export function createJtdTypeGuard<T>(schema: Schema): TypeGuardFn<T> {
  return (o: unknown): o is T => {
    return !!(o && validate(schema, o).length === 0);
  };
}

type Definitions = {
  [definition: string]: Schema;
};

export function flattenDefinitions(
  defsIn: Definitions,
  defsOut: Definitions = {},
): Definitions {
  for (const [name, def] of Object.entries(defsIn)) {
    if (typeof defsOut[name] !== "undefined") {
      throw new Error(`Duplicate definition name "${name}"`);
    }
    defsOut[name] = def;
    if (def.definitions) {
      flattenDefinitions(def.definitions, defsOut);
      delete def.definitions;
    }
  }
  return defsOut;
}
