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
  opts: { allowDuplicates?: boolean } = {},
  defsOut: Definitions = {},
): Definitions {
  for (const [name, def] of Object.entries(defsIn)) {
    if (!opts.allowDuplicates && typeof defsOut[name] !== "undefined") {
      throw new Error(`Duplicate definition name "${name}"`);
    }

    const defCopy = { ...def };
    delete defCopy.definitions;
    defsOut[name] = defCopy;

    if (def.definitions) {
      flattenDefinitions(def.definitions, opts, defsOut);
    }
  }
  return defsOut;
}
