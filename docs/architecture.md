# architecture

## overview

- `hastscript` and `tsx` is used to create the AST
- functionality that can be used in `tsx` files is called `trait`
- `tsx` defintions use `traits` and the `component factory method` to describe an atom with its input parameters (_"Props"_) and the resulting html fragment
- _transpile targets_ implement the `Target` type / interface to describe how attributes & `traits` are converted to the specific framework
- _transpile targets_ also define how the specific framework file contents look like

todo
