import { h } from "hastscript";

export function slot(name = "default") {
  return <slot name={name}></slot>;
}
