export type Boxed<T> = T & {
  __boxedType: string;
};

export function makeBoxed<T = any>(name: string, valueObject: T): Boxed<T> {
  return {
    __boxedType: name,
    ...valueObject,
  };
}
