import { readFileSync } from "fs";
import { Element } from "hastscript/lib/core";
import { Condition } from "../../factories/conditional";
import { makeTarget } from "../../factories/target";
import { Prop } from "../../traits/prop";
import { Parsed } from "../../utils/types";

function toConditionString(condition: Condition, { name }: Prop) {
  switch (condition) {
    case Condition.Always:
      return `true === true`;
    case Condition.True:
      return `${name}`;
    case Condition.TrueStrict:
      return `${name} === true`;
    case Condition.False:
      return `!${name}`;
    case Condition.FalseStrict:
      return `${name} === false`;
    default:
      ``;
  }
}

export default makeTarget({
  name: {
    internal: "vue-2-javascript",
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
      return {};
    },
    options() {
      return {};
    },
  },
});
