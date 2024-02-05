import {validate} from './bundle.js';

async function validateDocument() {
    const documentToValidate = {};
    const result = await validate(documentToValidate);
    console.log(result);
}
validateDocument();
