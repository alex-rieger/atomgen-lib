import { existsSync, mkdirSync, writeFileSync } from "fs";
import { transpile, targetVue2, targetNunjucks } from "../lib";
import bootstrapAccordionItem from "./components/bootstrapAccordionItem";

function writeToDist(
  dirname: string,
  filename: string,
  contents: string,
  extension: string
) {
  const folder = `./dist/${dirname}`;
  if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
  const target = `${folder}/${filename}.${extension}`;
  writeFileSync(target, contents, { encoding: "utf-8" });
}

// vue code

const resultVue = await transpile(
  bootstrapAccordionItem,
  targetVue2
);
writeToDist(
  targetVue2.fs.dirname,
  bootstrapAccordionItem.name.internal,
  resultVue.fileContents,
  targetVue2.fs.extension
);

// nunjucks code
let resultNunjucks = await transpile(
  bootstrapAccordionItem,
  targetNunjucks
);
writeToDist(
  targetNunjucks.fs.dirname,
  bootstrapAccordionItem.name.internal,
  resultNunjucks.fileContents,
  targetNunjucks.fs.extension
);

// console.log(processorResult);
// console.log(fileContents);
