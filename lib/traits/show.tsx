import { h } from "hastscript";
import { Condition, makeConditional } from "../factories/conditional";
import { tokenShowBinding } from "../utils/constants";
import { Prop } from "./prop";

export function show(content: any) {
  let condition = Condition.Always;
  let prop: Prop;

  return {
    onTrue(value: Prop) {
      condition = Condition.True;
      prop = value;
      return this;
    },
    onTrueStrict(value: Prop) {
      condition = Condition.TrueStrict;
      prop = value;
      return this;
    },
    onFalse(value: Prop) {
      condition = Condition.False;
      prop = value;
      return this;
    },
    onFalseStrict(value: Prop) {
      condition = Condition.FalseStrict;
      prop = value;
      return this;
    },
    make() {
      return (
        <div
          {...{
            [tokenShowBinding.serialize(makeConditional(condition, prop))]:
              true,
          }}
        >
          {content}
        </div>
      );
    },
  };
}
