import { h } from "hastscript";
import { HResult } from "hastscript/lib/core";
import { Props } from "../traits/prop";
import { errNameNotSet, errTemplateNotSet } from "../utils/constants";

export type Component = {
  name: {
    internal: string;
  };
  props: Props;
  fragment: () => HResult;
};

export function makeComponent(options: Partial<Component> | any): Component {
  const defaults: Component = {
    name: {
      internal: errNameNotSet.message,
    },
    props: {},
    fragment() {
      return <div>{errTemplateNotSet.message}</div>;
    },
  };
  return Object.assign(defaults, options);
}
