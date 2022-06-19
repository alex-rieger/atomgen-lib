import { readFileSync } from "fs";
import { makeTarget } from "../../../lib";

export default makeTarget({
  name: {
    internal: "vue-2-javascript",
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
});
