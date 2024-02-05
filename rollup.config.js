import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'example.mjs', // Path to your main JS file
  output: {
    file: 'bundle.js', // Output bundle file
    format: 'es', // Immediately Invoked Function Expression (suitable for <script> tags)
    sourcemap: true, // Optional: Enable source maps
  },
  plugins: [
    resolve(), // Teaches Rollup how to find external modules
    commonjs(), // Converts CommonJS modules to ES6
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    json(),
  ]
};

