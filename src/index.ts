import { makeTarget, transpile } from "../lib";
import bootstrapAccordionItem from "./components/bootstrapAccordionItem";

const componentResult = await transpile(bootstrapAccordionItem, makeTarget());

console.log(componentResult);
