import { readFileSync } from "fs";
import { makeTarget } from "../../factories/target";
import { Prop } from "../../traits/prop";
import { Parsed } from "../../utils/types";

export default makeTarget({
  name: {
    internal: 'nunjucks',
  },
  fs: {
    dirname: 'nunjucks',
    extension: 'nunjucks'
  },
  handler: {
    print(prop: Parsed<Prop>) {
      return `{{ ${prop.name} }}`
    },

  },
  template: {
    file() {
      return readFileSync(new URL("./template.ejs", import.meta.url)).toString()
    },
    funcMap() {
      return {}
    },
    options() {
      return {}
    }
  }
})
