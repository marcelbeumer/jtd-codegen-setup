import { Schema, validate } from "jtd";

type TypeGuardFn<T> = (o: unknown) => o is T;

export function createJtdTypeGuard<T>(schema: Schema): TypeGuardFn<T> {
  return (o: unknown): o is T => {
    return !!(o && validate(schema, o).length === 0);
  };
}
