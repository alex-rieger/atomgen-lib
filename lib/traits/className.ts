import { Boxed, makeBoxed } from "../factories/boxed";
import {
  Condition,
  Conditional,
  makeConditional,
} from "../factories/conditional";
import { boxedTypeClassName } from "../utils/constants";
import { Prop } from "./prop";

type BaseClassName = {
  name: string;
  prop?: Prop;
};

export type ClassName = BaseClassName | Conditional<BaseClassName>;

export type ClassNames = ClassName[];

export function className(name: string) {
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
    make(): Boxed<ClassName> {
      return makeBoxed(
        boxedTypeClassName,
        makeConditional(condition, {
          name,
          prop,
        })
      );
    },
  };
}

export function isClassName(obj: any): obj is Boxed<ClassName> {
  const o = obj as Boxed<ClassName>;
  return o.__boxedType === boxedTypeClassName;
  // && !!o.name && Object.values(Condition).includes(o.condition);
}

export function isClassNames(obj: any): obj is ClassNames {
  const o = obj as ClassNames;
  return Array.isArray(o) && o.every(isClassName);
}
