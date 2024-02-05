import validateStrict from '@secvisogram/csaf-validator-lib/validateStrict.js';
import * as mandatory from '@secvisogram/csaf-validator-lib/mandatoryTests.js';
import { optionalTest_6_2_1 } from '@secvisogram/csaf-validator-lib/optionalTests.js';

//import validateStrict from '../csaf-validator-lib/validateStrict.js'
//import * as mandatory from '../csaf-validator-lib/mandatoryTests.js'
//import { optionalTest_6_2_1 } from '../csaf-validator-lib/optionalTests.js'
import { csaf_2_0_strict } from '@secvisogram/csaf-validator-lib/schemaTests.js'

const document = {}
const tests = [
  csaf_2_0_strict,
  ...Object.values(mandatory),
  optionalTest_6_2_1,
]

const result = await validateStrict(tests, document)
console.log(result)
