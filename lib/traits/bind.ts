import { tokenClassNameBinding, tokenPropBinding } from "../utils/constants";
import { ClassNames, isClassName } from "./className";
import { isProp, Prop } from "./prop";

export function bind(prop: Prop, idSuffix?: Prop["idSuffix"]): string;
export function bind(...args: ClassNames): string;
export function bind(...args: any[]): string {
  if (isProp(args[0])) {
    const input: Prop = {
      ...args[0],
      idSuffix: args[1],
    };
    return tokenPropBinding.serialize(input);
  }

  if (isClassName(args[0])) {
    return tokenClassNameBinding.serialize(args);
  }

  return "";
}
