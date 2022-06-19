import { tokenPrintBinding } from "../utils/constants";
import { Prop } from "./prop";

export function print(prop: Prop) {
  return tokenPrintBinding.serialize(prop);
}
