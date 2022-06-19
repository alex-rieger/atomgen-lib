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
import { Parsed, RecursivePartial } from "../utils/types";
import merge from "lodash.merge"

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
    print(prop: Parsed<Prop>, component: Component): string;
    slot(node: Element, component: Component): Element;
    show(node: Element, prop: Parsed<Prop>, component: Component): Element;
    prop: {
      attr(attr: string, component: Component): string;
      value(value: Prop, component: Component): string;
    };
    className: {
      attr(attr: string, component: Component): string;
      value(values: Parsed<ClassNames>, component: Component): string;
    };
  };
  template: {
    file(): string;
    funcMap(): Record<string,Function>;
    options(): EjsOptions;
  }
};

export function makeTarget(options: RecursivePartial<Target>): Target {
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
  return merge(defaults, options)
}
