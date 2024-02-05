import validateStrictOriginal from '@secvisogram/csaf-validator-lib/validateStrict.js';
import * as mandatory from '@secvisogram/csaf-validator-lib/mandatoryTests.js';
import { optionalTest_6_2_1 } from '@secvisogram/csaf-validator-lib/optionalTests.js';
import { csaf_2_0_strict } from '@secvisogram/csaf-validator-lib/schemaTests.js'

export async function validate(document, customTests = null) {
  console.log("validate...document: ", document);
  const defaultTests = [
    csaf_2_0_strict,
    ...Object.values(mandatory),
    optionalTest_6_2_1,
  ];

  const tests = customTests || defaultTests;
  let result = await validateStrictOriginal(tests, document);
  return result;
}
