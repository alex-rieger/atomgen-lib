import { VFile } from "vfile";
import { Component } from "../factories/component";

export type HtmlPropertyValue =
  | string
  | number
  | boolean
  | (string | number)[]
  | null
  | undefined;

export type ExtendedVFile = VFile & {
  component: Component;
};
