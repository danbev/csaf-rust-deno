JAVY_HOME := ~/work/javascript/javy/

init: 
	npm install

# Run deno example
run-deno-example: 
	deno run src/validate.mjs

# Example to try out the javy compiler
compile-javy-example: 
	$(JAVY_HOME)/target/release/javy compile src/javy-example.js \
	--wit wit/validate.wit -n validate-world -o javy-example.wasm

run-javy-example-wasm:
	@echo '{"one": 1, "two": 2}' | wasmtime run --invoke validate javy-example.wasm

# Try to rollup validate.mjs
rollup-validate:
	npx rollup -c rollup.val.config.js

# Try to compile validate.mjs
compile-validate-bundle:
	$(JAVY_HOME)/target/release/javy compile validate-bundle.mjs \
	--wit wit/validate.wit -n validate-world -o validate.wasm
