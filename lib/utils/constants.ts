import { Text } from "hast";
import { Element } from "hastscript/lib/core";
import { makeToken } from "../factories/token";
import { ClassName } from "../traits/className";
import { Prop } from "../traits/prop";

export const boxedTypeProp = "__prop__";
export const boxedTypeClassName = "__classname__";

export const errNameNotSet = new Error("NameNotSet");
export const errTemplateNotSet = new Error("TemplateNotSet");
export const errExtensionNotSet = new Error("ExtensionNotSet");
export const errDirnameNotSet = new Error("DirnameNotSet");

export const tokenPropBinding = makeToken<Prop, string | number>("@prop@", {
  matches(value) {
    const v = typeof value === "string" ? value : String(value);
    return v.startsWith("@prop@");
  },
});

export const tokenClassNameBinding = makeToken<ClassName, string>(
  "@classname@",
  {
    matches(value) {
      return value.startsWith("@classname@");
    },
  }
);

export const tokenPrintBinding = makeToken<Prop, Text>("@print@", {
  matches({ value }) {
    return value.startsWith("@print@");
  },
});

export const tokenShowBinding = makeToken<Prop, Element>("@show@", {
  matches({ properties }) {
    if (properties) {
      return Object.keys(properties).some((p) => p.startsWith("@show@"));
    }
    return false;
  },
});
