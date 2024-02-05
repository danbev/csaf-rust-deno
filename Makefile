init: 
	npm install

# Run deno example
run-deno-example: 
	deno run example.mjs

JAVY_HOME := ~/work/javascript/javy/
compile-javy-example: 
	$(JAVY_HOME)/target/release/javy compile src/validate.js \
	       	--wit wit/validate.wit -n validate-world -o validate.wasm

run-javy-example: 
	@echo '{"one": 1, "two": 2}' | wasmtime run --invoke validate validate.wasm
