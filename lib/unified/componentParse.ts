import { ParserFunction } from "unified";
import { ExtendedVFile } from "../utils/types";

export function componentParse(this: any) {
  const Parser: ParserFunction = function (doc, file) {
    return (file as ExtendedVFile).component.fragment();
  };
  Object.assign(this, { Parser });
}
