import { Schema, validate } from "jtd";
import { err, ok, Result } from "neverthrow";

export type SchemaTypeGuardFn<T> = {
  (o: unknown): o is T;
  schema: Schema;
};

export function isSchemaTypeGuardFn<T>(o: unknown): o is SchemaTypeGuardFn<T> {
  return !!o && typeof o === "function" &&
    typeof (o as SchemaTypeGuardFn<T>).schema === "object";
}

export function createJtdTypeGuard<T>(schema: Schema): SchemaTypeGuardFn<T> {
  return Object.assign((o: unknown): o is T => {
    if (o === undefined) return false;
    return validate(schema, o).length === 0;
  }, { schema });
}

export function validateWithSchema<T = unknown>(
  schema: Schema,
  o: T,
  name?: string,
): Result<T, Error> {
  const result = validate(schema, o);
  const label = name ? `"${name}"` : `<unknown>`;
  if (result.length) {
    return err(
      new Error(
        `Schema validation failed for ${label}: ${JSON.stringify(result)}`,
      ),
    );
  }
  return ok(o);
}

export function assertSchemaType<T>(
  typeGuardOrSchema: SchemaTypeGuardFn<T> | Schema,
  o: unknown,
  name?: string,
): asserts o is T {
  const schema = isSchemaTypeGuardFn(typeGuardOrSchema)
    ? typeGuardOrSchema.schema
    : typeGuardOrSchema;
  const result = validateWithSchema(schema, o, name);
  if (result.isOk()) return;
  throw result.error;
}

type Definitions = {
  [definition: string]: Schema;
};

export function losenSchema(
  schema: Schema,
  opts?: { losenDefinitions?: boolean },
) {
  const looseSchema: Schema = { ...schema, additionalProperties: true };
  if (opts?.losenDefinitions && looseSchema.definitions) {
    looseSchema.definitions = { ...looseSchema.definitions };
    for (const [name, def] of Object.entries(looseSchema.definitions ?? {})) {
      looseSchema.definitions[name] = { ...def, additionalProperties: true };
    }
  }
  return looseSchema;
}

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

export function createFauxSchemaRoot(defs: Definitions) {
  const root = {
    definitions: flattenDefinitions(defs, { allowDuplicates: true }),
    properties: {} as Record<string, unknown>,
  };
  for (const name of Object.keys(root.definitions)) {
    root.properties[name] = { ref: name };
  }
  return root;
}
