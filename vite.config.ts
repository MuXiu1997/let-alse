import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'

const libName = name.replace(/^@.*\//, '')

export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`,
      '#': `${path.resolve(__dirname, 'test')}`,
    },
  },
  build: {
    lib: {
      name: libName,
      entry: 'src/index.ts',
      fileName: format => `${libName}.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src/**/*'],
      outDir: '.',
    }),
  ],
})
