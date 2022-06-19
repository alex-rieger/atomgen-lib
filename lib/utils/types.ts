import { VFile } from "vfile";
import { Boxed } from "../factories/boxed";
import { Component } from "../factories/component";
import { Conditional } from "../factories/conditional";

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export type HtmlPropertyValue =
  | string
  | number
  | boolean
  | (string | number)[]
  | null
  | undefined;

export type ExtendedVFile = VFile & {
  component: Component;
};

// convenience type
export type Parsed<T> = Boxed<T|Conditional<T>>
