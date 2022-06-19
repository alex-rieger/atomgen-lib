import {
  camelCase,
  // capitalCase,
  // constantCase,
  // dotCase,
  // headerCase,
  // noCase,
  // paramCase,
  pascalCase,
  // pathCase,
  // sentenceCase,
  snakeCase,
} from "change-case";

declare global {
  interface String {
    toCamelCase: () => string;
    toPascalCase: () => string;
    toSnakeCase: () => string;
  }
}

String.prototype.toCamelCase = function () {
  return camelCase(this.toString());
};

String.prototype.toPascalCase = function () {
  return pascalCase(this.toString());
};

String.prototype.toSnakeCase = function () {
  return snakeCase(this.toString());
};
