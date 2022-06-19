import { Boxed, makeBoxed } from "../factories/boxed";
import { boxedTypeProp } from "../utils/constants";

export enum PropType {
  String,
  Boolean,
  Number,
  Array,
  Object,
}

export type Prop = {
  name: string;
  type: PropType;
  required: boolean;
  default: any;
  idSuffix?: string; // only on a parsed prop
};

export type Props = Record<string, Prop>;

export function prop(name: Prop["name"]) {
  let type = PropType.String;
  let required = false;
  let defaultValue: any;

  return {
    string() {
      type = PropType.String;
      return this;
    },
    boolean() {
      type = PropType.Boolean;
      return this;
    },
    number() {
      type = PropType.Number;
      return this;
    },
    array() {
      type = PropType.Array;
      return this;
    },
    object() {
      type = PropType.Object;
      return this;
    },
    required() {
      required = true;
      return this;
    },
    default(value: any) {
      defaultValue = value;
      return this;
    },
    make(): Boxed<Prop> {
      return makeBoxed(boxedTypeProp, {
        name,
        type,
        required,
        default: defaultValue,
      });
    },
  };
}

export function isProp(obj: any): obj is Boxed<Prop> {
  const o = obj as Boxed<Prop>;
  return o.__boxedType === boxedTypeProp;
  // ,!!o.name &&
  // Object.values(PropType).includes(o.type) &&
  // o.hasOwnProperty("required") &&
  // o.hasOwnProperty("default")
}
