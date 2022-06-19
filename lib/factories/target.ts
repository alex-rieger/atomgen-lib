import { Options } from "rehype-stringify";
import {
  errDirnameNotSet,
  errExtensionNotSet,
  errNameNotSet,
} from "../utils/constants";

export type Target = {
  name: {
    internal: string;
  };
  fs: {
    extension: string;
    dirname: string;
  };
  stringifyOptions: Options;
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
  };
  return Object.assign(defaults, options);
}
