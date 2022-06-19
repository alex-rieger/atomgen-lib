export enum Condition {
  Always,
  True,
  TrueStrict,
  False,
  FalseStrict,
}

export type Conditional<T> = T & {
  __condition: Condition;
};

export function makeConditional<T = any>(
  condition: Condition,
  valueObject: T
): Conditional<T> {
  return {
    __condition: condition,
    ...valueObject,
  };
}
