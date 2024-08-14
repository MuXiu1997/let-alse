# let-also
A tiny library inspired by Kotlin, designed for call chaining in JavaScript / TypeScript.

## Install
```bash
$ npm install @muxiu1997/let-also
```

## Quick Start
```typescript
import { wrap } from '@muxiu1997/let-also'

const result = wrap(Math.random() * 100)
  .also(it => console.log(`Random number: ${it}`))
  .takeIf(it => it > 50)
  ?.let(it => it * 2)
```

## License
[MIT](./LICENSE)
