import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  lib: [
    {
      format: 'esm',
      bundle: true,
      autoExternal: true,
      dts: true,
    },
  ],
  output: {
    target: 'web',
    minify: true,
    injectStyles: true,
    cssModules: {
      localIdentName: '[hash:base64:4]',
    },
  },
  plugins: [pluginReact()],
});
