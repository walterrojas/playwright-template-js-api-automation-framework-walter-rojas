
const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const userSchema = require('./schema/userSchema')
const { getRequest, postRequest, putRequest, deleteRequest } = require('../baseAPI');
const fs = require('fs').promises;
const { generateDynamicEmail, printConsoleLogByEnvFlag } = require('../utils/utils');

let userId;

test.describe.serial('Users API Test Suite (In Serial)', () => {
    test('[POST] Create User and verify response', async () => {
        // Read the user seed data from the userData JSON file
        const userData = JSON.parse(await fs.readFile('tests/users/testData/userData.json', 'utf8'));
        userData.email = await generateDynamicEmail(userData.email);

        const postResponse = await postRequest('/users', userData);

        expect.soft(postResponse.status()).toBe(201);
        const jsonNewUserResponse = await postResponse.json();
        userId = jsonNewUserResponse.id; // Save the user ID so we can use it later
        expect.soft(jsonNewUserResponse.name).toBe(userData.name);

        await printConsoleLogByEnvFlag('POST (In Serial) - New users details', jsonNewUserResponse)
        await printConsoleLogByEnvFlag('POST (In Serial) - New user id', jsonNewUserResponse.id)
    });

    test('[GET] User by ID and verify response', async () => {
        const getResponse = await getRequest(`/users/${userId}`);

        expect.soft(getResponse.status()).toBe(200);

        const jsonGetResponse = await getResponse.json();
        await printConsoleLogByEnvFlag('GET (In Serial) - User details: ', jsonGetResponse)

        // Initialize AJV and validate the response
        const ajv = new Ajv();
        const validate = ajv.compile(userSchema);
        const valid = validate(jsonGetResponse);

        if (!valid) {
            console.error('GET (In Serial) - AJV Validation Errors:', ajv.errorsText(validate.errors));
        }
        await printConsoleLogByEnvFlag('GET (In Serial) - Schema validation was correct!')

        expect.soft(valid).toBe(true);
    });

    test('[PUT] Update User and verify response', async () => {
        const updateUserData = JSON.parse(await fs.readFile('tests/users/testData/updateUserData.json', 'utf8'));
        const putResponse = await putRequest(`/users/${userId}`, updateUserData);

        expect.soft(putResponse.status()).toBe(200);

        const jsonUpdatedUserResponse = await putResponse.json();
        expect.soft(jsonUpdatedUserResponse.name).toBe(updateUserData.name);

        await printConsoleLogByEnvFlag('PUT (In Serial) - User updated: ', jsonUpdatedUserResponse)
    });

    test('[DELETE] Delete a User and verify response', async () => {
        const deleteResponse = await deleteRequest(`/users/${userId}`);

        expect.soft(deleteResponse.status()).toBe(204);

        const deleteResponseBody = await deleteResponse.text();
        expect.soft(deleteResponseBody).toBe('');

        await printConsoleLogByEnvFlag('DELETE (In Serial) - Delete response body: ', deleteResponseBody)
    });

});
