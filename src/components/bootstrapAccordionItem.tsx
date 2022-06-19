import {
  bind,
  className,
  h,
  makeComponent,
  print,
  prop,
  show,
} from "../../lib";

export default makeComponent({
  name: {
    internal: "bootstrap-accordion-item",
  },
  props: {
    id: prop("id").string().make(),
    isOpen: prop("isOpen").boolean().make(),
    textHeader: prop("textHeader").string().default("").make(),
  },
  fragment() {
    const header = (
      <h2 id={bind(this.props.id, "heading")} class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          aria-expanded={bind(this.props.isOpen)}
          aria-controls={bind(this.props.id, "collapse")}
        >
          {print(this.props.textHeader)}
        </button>
      </h2>
    );

    return (
      <div class="accordion-item">
        {show(header).onTrue(this.props.textHeader).make()}
        <div
          id={bind(this.props.id)}
          aria-labelledby={bind(this.props.id, "heading")}
          className={bind(
            className("accordion-collapse").make(),
            className("collapse").make(),
            className("show").onTrue(this.props.isOpen).make()
          )}
        >
          <slot></slot>
        </div>
      </div>
    );
  },
});
