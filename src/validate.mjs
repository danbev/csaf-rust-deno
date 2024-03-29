import validateStrictOriginal from '@secvisogram/csaf-validator-lib/validateStrict.js';
import * as mandatory from '@secvisogram/csaf-validator-lib/mandatoryTests.js';
import { optionalTest_6_2_1 } from '@secvisogram/csaf-validator-lib/optionalTests.js';
import { csaf_2_0_strict } from '@secvisogram/csaf-validator-lib/schemaTests.js'

function readInput() {
    const chunkSize = 1024;
    const inputChunks = [];
    let totalBytes = 0;

    // Read all the available bytes
    while (1) {
        const buffer = new Uint8Array(chunkSize);
        // Stdin file descriptor
        const fd = 0;
        const bytesRead = Javy.IO.readSync(fd, buffer);

        totalBytes += bytesRead;
        if (bytesRead === 0) {
            break;
        }
        inputChunks.push(buffer.subarray(0, bytesRead));
    }

    // Assemble input into a single Uint8Array
    const { finalBuffer } = inputChunks.reduce((context, chunk) => {
        context.finalBuffer.set(chunk, context.bufferOffset);
        context.bufferOffset += chunk.length;
        return context;
    }, { bufferOffset: 0, finalBuffer: new Uint8Array(totalBytes) });

    return JSON.parse(new TextDecoder().decode(finalBuffer));
}

function writeOutput(output) {
    const encodedOutput = new TextEncoder().encode(JSON.stringify(output));
    const buffer = new Uint8Array(encodedOutput);
    // Stdout file descriptor
    const fd = 1;
    Javy.IO.writeSync(fd, buffer);
}

export async function validate() {
  const input = readInput();
  console.log("[validate] input: ", JSON.stringify(input));
  const defaultTests = [
    csaf_2_0_strict,
    ...Object.values(mandatory),
    optionalTest_6_2_1,
  ];

  const tests = customTests || defaultTests;
  const result = await validateStrictOriginal(tests, document);
  writeOutput(result);
}
