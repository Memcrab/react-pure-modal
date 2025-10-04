declare module '@rsbuild/plugin-react' {
  import type { Plugin } from '@rslib/core';

  export function pluginReact(): Plugin;

  export default pluginReact;
}

declare module '@rslib/core' {
  export interface Plugin {
    name?: string;
    apply?: (...args: unknown[]) => unknown;
  }

  export function defineConfig<T = unknown>(config: T): T;

  export default defineConfig;
}
