import ejs from "ejs";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { Component } from "./factories/component";
import { Target } from "./factories/target";
import { componentParse } from "./unified/componentParse";
import { componentTranspile } from "./unified/componentTranspile";
import { ExtendedVFile } from "./utils/types";

// public api exported here
export async function transpile(component: Component, target: Target) {
  const processorResult = (await unified()
    .use(componentParse)
    .use(componentTranspile, { target })
    .use(rehypeStringify, target.stringifyOptions)
    .process({ component })) as ExtendedVFile;

  const fileContents = await ejs.render(
    target.template.file(),
    {
      component: processorResult.component,
      template: processorResult.value,
      ...target.template.funcMap(),
    },
    target.template.options()
  );

  return {
    processorResult,
    fileContents,
  };
}

// deps
export { h } from "hastscript";

// factories
export { makeComponent } from "./factories/component";
export { makeTarget } from "./factories/target";

// targets
export { default as targetVue2 } from "./impl/vue2";
export { default as targetNunjucks } from "./impl/nunjucks";

// traits
export { bind } from "./traits/bind";
export { className } from "./traits/className";
export { print } from "./traits/print";
export { prop } from "./traits/prop";
export { show } from "./traits/show";
export { slot } from "./traits/slot";
