# simple-svg-sprite-loader

## Install

Install with npm

```bash 
npm install --save-dev simple-svg-sprite-loader
```

## Introduction

A very simple webpack loader for SVGs that will automatically generate and inject all SVGs as a sprite into the DOM.
It is intentionally kept simple with a very narrow use case: 

A library wants to ship SVG icons in tree-shaking-enabled way.

It could also work for applications directly.

## Usage

### Library Side
File structure:
```
- icons
  - my-icon.svg
  - my-icon.js
  - fish.svg
  - fish.js
- icons.js // barrel file as your public interface
```

icons/my-icon.js
```javascript
export const myIcon = require('!simple-svg-sprite-loader!./my-icon.svg');
```

icons/icons.js
```javascript
export { myIcon } from './icons/my-icon';
export { fish } from './icons/fish';
```

Hint: both of these files could be easily generated by a build script.

### Client side

```javascript
import { fish } from 'your-library/icons';

console.log(fish.id, fish.svg); // > "fish" "<svg id=\"fish\" [...]"

const svg = document.createElement('svg');
svg.innerHTML = `<use xlink:href="${fish.id}"></use>`;
document.body.appendChild(svg);
```

## Configuration

none.

## Compatibility

Only Browsers are supported.

- Firefox (reasonably recent)
- Chrome (reasonably recent)
- Internet Explorer (IE 11)
- Safari (untested, should work though)

Tested with Webpack 4.41.x
