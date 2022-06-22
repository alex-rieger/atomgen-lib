import { Boxed } from "../factories/boxed"
import { Condition } from "../factories/conditional"
import { Prop, PropType } from "../traits/prop"

export function getPropsList(props: Record<string, Boxed<Prop>>) {
  return Object.values(props)
}

export function propTypeToConstructor(type: PropType) {
  switch (type) {
    case PropType.String: return 'String'
    case PropType.Number: return 'Number'
    case PropType.Boolean: return 'Boolean'
    case PropType.Array: return 'Array'
    case PropType.Object: return 'Object'
  }
}

export function propDefaultToValue(value: Prop['default']) {
  if (value === undefined) return 'undefined'
  if (value === '') return '""'
  return value
}

export function toConditionString(condition: Condition, { name }: Prop) {
  switch (condition) {
    case Condition.Always:
      return `true === true`;
    case Condition.True:
      return `${name}`;
    case Condition.TrueStrict:
      return `${name} === true`;
    case Condition.False:
      return `!${name}`;
    case Condition.FalseStrict:
      return `${name} === false`;
    default:
      ``;
  }
}
