// Code generated by jtd-codegen for TypeScript v0.2.0

export interface Person {
  father: Individual;
  firstName: string;
  lastName: string;
  metadata: Metadata;
  mother: Individual;
}

export interface Individual {
  firstName: string;
  lastName: string;
  metadata: Metadata;
}

export interface Metadata {
  a: string;
  b: string;
  c: string;
}
