[![NPM](https://nodei.co/npm/boxing-hosting-utils.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/boxing-hosting-utils)

# un boxing hosting
 https://bots.unboxingman.com API wrapper for Node.js

## Installation
Simply run `npm i boxing-hosting-utils` 

## Usage
(Async)

geting userid list:
```js
const util = require('boxing-hosting-utils');
const utils = new util();

const list = await utils.getIDList();

```

## License
[MIT](LICENSE)
