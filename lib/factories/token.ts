import { errNameNotSet } from "../utils/constants";

export type Token<T = any, R = any> = {
  // T=trait, R=input type of node / ast
  matches: (value: R) => boolean;
  serialize: (values: T | any) => string;
  parse: (values: string) => T;
};

function serialize(tag: string, values: any) {
  return tag + JSON.stringify(values);
}

function parse(tag: string, values: string) {
  return JSON.parse(values.replace(tag, "").replace("&#x22;", '"'));
}

export function makeToken<T = any, R = any>(
  tag?: string,
  options?: Partial<Token<T, R>>
): Token<T, R> {
  const t = tag || errNameNotSet.message;
  const defaults: Token<any, any> = {
    matches(value) {
      return false;
    },
    serialize(values) {
      return serialize(t, values);
    },
    parse(values) {
      return parse(t, values);
    },
  };
  return Object.assign(defaults, options);
}
