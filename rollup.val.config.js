import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'src/validate.mjs',
  output: {
    file: 'validate-bundle.mjs',
    format: 'es',
    sourcemap: true,
    name: "validate"
  },
  plugins: [
      nodeResolve({
        moduleDirectories: [
            "node_modules",
        ]
      }),
      commonjs({
        include: 'node_modules/**',
        ignoreTryCatch: true,
      }),
      json(),
      terser(),
      nodePolyfills( { include: null })
  ]
};

