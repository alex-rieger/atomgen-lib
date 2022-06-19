import { Root } from "hastscript/lib/core";
import { visit } from "unist-util-visit";
import { Target } from "../factories/target";
import { tokenClassNameBinding, tokenPrintBinding, tokenPropBinding, tokenShowBinding, tokenSlotBinding } from "../utils/constants";
import { info, debug } from "../utils/log";
import { normalizeHtmlPropertyValue } from "../utils/normalizeHtmlPropertyValue";
import { ExtendedVFile } from "../utils/types";

export function componentTranspile({ target }: { target: Target }) {
  return function (ast: Root, { component }: ExtendedVFile) {
    info(`transforming AST for component=${component.name.internal}`)

    visit(ast, "text", function (node) {
      debug('visiting text nodes')
      if (tokenPrintBinding.matches(node)) {
        debug(`found print binding=${node.value}`)
        const prop = tokenPrintBinding.parse(node.value)
        const newValue = target.handler.print(prop, component)
        node.value = newValue
        debug(`applying print binding handler`, 'prop=', prop, 'new value=', newValue)
      }
    });
    visit(ast, "element", function (node) {
      if (tokenSlotBinding.matches(node)) {
        debug(`found slot binding=`, node)
        const newValue = target.handler.slot(node, component)
        Object.assign(node, newValue)
        debug(`applying slot handler`, newValue)
      } else if (tokenShowBinding.matches(node)) {
        debug(`found show binding=`, node)
        debug(`todo: applying show handler`, node)
      }
      if (node.properties) {
        debug(`node has properties=`, node.properties)
        let properties = {}
        Object.entries(node.properties).forEach(function (p) {
          debug(`handling property=`, p)
          const attr = p[0]
          const val = normalizeHtmlPropertyValue(p[1])
          let result = {}

          if (val.some(v => tokenPropBinding.matches(v))) {
            result = {
              [target.handler.prop.attr(attr, component)]: val.map(v => target.handler.prop.value(tokenPropBinding.parse(v), component))
            }
          } else if (val.some(v => tokenClassNameBinding.matches(v))) {
            result = {
              [target.handler.className.attr(attr, component)]: val.map(v => target.handler.className.value(tokenClassNameBinding.parse(v), component))
            }
          } else {
            result = {
              [attr]: val
            }
          }
          properties = {
            ...properties,
            ...result,
          }
        })
        node.properties = properties
      }
    })
  };
}
