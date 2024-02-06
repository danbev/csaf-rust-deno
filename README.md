## Embedding Deno in Rust to run npm module code
This project explores the possibility of embedding Deno in Rust to run npm
module code, specifically `@secvisogram/csaf-validator-lib`.

### Setup
```console
$ npm i
```

### Run the npm module with Deno (non embedded)
First we try to run the npm module using Deno from the command line:
```console
$ deno run example.mjs
```
That seems to work so lets try out embedding this in Rust.

###  Compiling JavaScript to WebAssembly
For this we'll try to use [Javy]. I needed to use an older version of GCC (12)
to be able to compile Javy (I'm using Fedora 39 which has GCC 13).

The following script allows me to use the older version of GCC to compile Javy.
```console
$ source setenv.sh
```

Next we can clone the Javy repository and compile it.
```console
$ git clone https://github.com/bytecodealliance/javy.git
$ cd javy
$ cargo install wasmtime-cli
$ cargo install cargo-wasi
$ cargo +stable install cargo-hack --locked
$ make
```

First we need to compile the JavaScript to WebAssembly.
```console
$ make compile-javy-example 
~/work/javascript/javy//target/release/javy compile src/javy-example.js \
--wit wit/validate.wit -n validate-world -o javy-example.wasm
```
This will produce a `javy-example.wasm` file which can then be used with a wasm
runtime, for example wasmtime:
```console
$ make run-javy-example-wasm 
[validate] input:  {"one":1,"two":2}
{"valid":true}
```

### Create a bundle of the JavaScript
Now, lets try to create a bundle of the JavaScript using Rollup for the
JavaScript code in [validate.mjs](src/validate.mjs):
```console
$ make rollup-validate 
npx rollup -c rollup.val.config.js

src/validate.mjs → validate-bundle.js...
(!) Circular dependencies
node_modules/semver/classes/comparator.js -> node_modules/semver/classes/range.js -> node_modules/semver/classes/comparator.js
polyfill-node._stream_duplex.js -> polyfill-node._stream_readable.js -> polyfill-node._stream_duplex.js
polyfill-node._stream_duplex.js -> polyfill-node._stream_writable.js -> polyfill-node._stream_duplex.js
created validate-bundle.js in 10.4s
```
Next we can try to compile 
```console
$ make compile-validate-bundle 
~/work/javascript/javy//target/release/javy compile validate-bundle.mjs \
--wit wit/validate.wit -n validate-world -o validate.wasm
thread '<unnamed>' panicked at crates/core/src/main.rs:27:10:
called `Result::unwrap()` on an `Err` value: Uncaught ReferenceError: could not load module 'stream/web'

note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
Error: JS compilation failed
make: *** [Makefile:24: compile-validate-bundle] Error 1
```
__wip__

### Streams

https://www.npmjs.com/package/rollup-plugin-polyfill-node



[javy]: https://github.com/bytecodealliance/javy

