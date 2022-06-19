import { Root } from "hastscript/lib/core";
import { visit } from "unist-util-visit";
import { Target } from "../factories/target";
import { ExtendedVFile } from "../utils/types";

export function componentTranspile({ target }: { target: Target }) {
  return function (ast: Root, { component }: ExtendedVFile) {
    visit(ast, "text", function (node) {});
    // todo
  };
}
