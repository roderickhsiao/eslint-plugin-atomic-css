# color-no-hex

Disallow hex colors, enforce color defined as variable

Use [custom variable](https://acss.io/guides/syntax.html#variable-values) for colors instead of hex color.

```js
/**
 * violations
 */
const className = 'C(#fff)';
```

## Options

## Reason

To reduce small variations of colors.
