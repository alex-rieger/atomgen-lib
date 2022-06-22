import { readFileSync } from "fs";
import { Element } from "hastscript/lib/core";
import { makeTarget } from "../../factories/target";
import { Prop } from "../../traits/prop";
import { getPropsList, propTypeToConstructor, propDefaultToValue, toConditionString } from "../../utils/templateUtils";
import { Parsed } from "../../utils/types";


export default makeTarget({
  name: {
    internal: "vue-2-javascript",
  },
  fs: {
    dirname: "vue-2-javascript",
    extension: "vue",
  },
  handler: {
    print(prop: Parsed<Prop>) {
      return `{{ ${prop.name} }}`;
    },
    show(node: Element, prop: Parsed<Prop>) {

      node.properties = {
        "v-if": toConditionString(prop.__condition, prop),
      };
      return node;
    },
    prop: {
      attr(attr: string) {
        return `:${attr}`;
      },
      value(prop: Parsed<Prop>) {
        const appended = prop.idSuffix ? `+'_${prop.idSuffix}'` : "";
        return prop.name + appended;
      },
    },
    className: {},
  },
  template: {
    file() {
      return readFileSync(
        new URL("./template.ejs", import.meta.url)
      ).toString();
    },
    funcMap() {
      return {
        getPropsList,
        propTypeToConstructor,
        propDefaultToValue,
      };
    },
    options() {
      return {};
    },
  },
});
