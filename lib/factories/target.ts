import { Element } from "hastscript/lib/core";
import { Options } from "rehype-stringify";
import { Options as EjsOptions } from "ejs";
import { ClassNames } from "../traits/className";
import { Prop } from "../traits/prop";
import {
  errDirnameNotSet,
  errExtensionNotSet,
  errNameNotSet,
} from "../utils/constants";
import { Component } from "./component";

export type Target = {
  name: {
    internal: string;
  };
  fs: {
    extension: string;
    dirname: string;
  };
  stringifyOptions: Options;
  handler: {
    print(prop: Prop, component: Component): string;
    slot(node: Element, component: Component): Element;
    show(node: Element, prop: Prop, component: Component): Element;
    prop: {
      attr(attr: string, component: Component): string;
      value(value: Prop, component: Component): string;
    };
    className: {
      attr(attr: string, component: Component): string;
      value(values: ClassNames, component: Component): string;
    };
  };
  template: {
    file(): string;
    funcMap(): Record<string,Function>;
    options(): EjsOptions;
  }
};

export function makeTarget(options?: Partial<Target> | any): Target {
  const defaults: Target = {
    name: {
      internal: errNameNotSet.message,
    },
    fs: {
      extension: errExtensionNotSet.message,
      dirname: errDirnameNotSet.message,
    },
    stringifyOptions: {
      allowDangerousCharacters: true,
      allowDangerousHtml: true,
    },
    handler: {
      print() {
        return "";
      },
      slot(node) {
        return node;
      },
      show(node) {
        return node;
      },
      prop: {
        attr(attr) {
          return attr;
        },
        value() {
          return "";
        },
      },
      className: {
        attr(attr) {
          return attr;
        },
        value() {
          return "";
        },
      },
    },
    template: {
      file() {
        return ""
      },
      funcMap() {
        return {}
      },
      options() {
        return {}
      }
    }
  };
  return Object.assign(defaults, options);
}
