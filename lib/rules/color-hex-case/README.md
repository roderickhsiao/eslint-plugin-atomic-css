# color-hex-case

Specify lowercase or uppercase for hex colors.

**Default**: lower case

```js
/**
 * Uppercase hex
 */
const className = 'C(#FFF)';

/**
 * Lowercase hex
 */
const className = 'C(#fff)';
```

## Options
```js
string: 'upper' | 'lower' (default 'lower')
```

### lower

**legal**

```js
const className = 'Bgc(#fff)';
```

**illegal**
```js
const className = 'Bgc(#FFF)';
```

### upper

**legal**

```js
const className = 'Bgc(#FFF)';
```

**illegal**
```js
const className = 'Bgc(#fff)';
```
