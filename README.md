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
~/work/javascript/javy//target/release/javy compile src/validate.js \
       	--wit wit/validate.wit -n validate-world -o validate.wasm
```
This will produce a `validate.wasm` file which can then be used with a wasm
runtime, for example wasmtime:
```console
$ make run-javy-example 
wasmtime run --invoke validate validate.wasm
Loaded validate.js module!
validate...
```


[javy]: https://github.com/bytecodealliance/javy
