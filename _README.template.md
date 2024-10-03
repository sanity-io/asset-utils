# @sanity/asset-utils

Reusable utility functions for dealing with image and file assets in Sanity.

> [!IMPORTANT]
> This package does _not_ resolve any information from the Sanity APIs - it does no asynchronous operations and only has the information that you pass it. You cannot, for instance, get the LQIP, BlurHash, image palette and similar information without requesting it from the Sanity API.

## Installing

```sh
$ npm install @sanity/asset-utils
```

## Usage

```js
// ESM / TypeScript
import {someUtilityFunction} from '@sanity/asset-utils'

// CommonJS
const {someUtilityFunction} = require('@sanity/asset-utils')
```

## License

MIT-licensed. See LICENSE.
