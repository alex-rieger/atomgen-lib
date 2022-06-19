import { HtmlPropertyValue } from "./types";

export function normalizeHtmlPropertyValue(values?: HtmlPropertyValue) {
  let result: string[] = [];

  if (!Array.isArray(values)) {
    result = [values] as string[];
  } else {
    result = values as string[];
  }

  result = result.reduce<string[]>((a, c) => {
    if (typeof c === "number") {
      a.push(String(c));
    } else if (typeof c === "string") {
      a.push(c);
    }
    return a;
  }, []);

  return result;
}
