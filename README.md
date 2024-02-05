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
