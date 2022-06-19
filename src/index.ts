import { transpile } from "../lib";
import vueTarget from "./targets/vue"
import bootstrapAccordionItem from "./components/bootstrapAccordionItem";


const { processorResult, fileContents } = await transpile(bootstrapAccordionItem, vueTarget)

console.log(processorResult)
console.log(fileContents)
