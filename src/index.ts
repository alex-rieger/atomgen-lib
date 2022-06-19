import { transpile, targetVue2 } from "../lib";
import bootstrapAccordionItem from "./components/bootstrapAccordionItem";

const { processorResult, fileContents } = await transpile(
  bootstrapAccordionItem,
  targetVue2
);

console.log(processorResult);
console.log(fileContents);
