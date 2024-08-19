<h1 align="center">@MuXiu1997/let-also</h1>
<div align="center">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/muxiu1997/let-also/release.yml?branch=main&style=flat-square">
<a href="LICENSE"><img alt="LICENSE" src="https://img.shields.io/github/license/muxiu1997/let-also?style=flat-square"></a>
<a href="https://github.com/muxiu1997/let-also/releases/latest"><img alt="Releases" src="https://img.shields.io/github/v/release/muxiu1997/let-also?style=flat-square&display_name=tag&include_prereleases&sort=semver"></a>
<a href="https://www.npmjs.com/package/@muxiu1997/let-also"><img alt="NPM" src="https://img.shields.io/npm/v/%40muxiu1997%2Flet-also?style=flat-square"></a>
</div>
<br/>
<div align="center">A tiny library inspired by Kotlin, designed for call chaining in JavaScript / TypeScript.</div>

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
