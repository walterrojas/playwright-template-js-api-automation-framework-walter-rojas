
const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const userSchema = require('./schema/userSchema');
const { getRequest, postRequest, putRequest, deleteRequest } = require('../baseAPI');
const fs = require('fs').promises;
const { generateDynamicEmail, printConsoleLogByEnvFlag } = require('../utils/utils');

test.describe('Users API Test Suite (In Parallel)', () => {
    async function createAndReturnNewUserResponse() {
        // Read the user seed data from the userData JSON file
        let userData = JSON.parse(await fs.readFile('tests/users/testData/userData.json', 'utf8'));
        userData.email = await generateDynamicEmail(userData.email);

        const postResponse = await postRequest('/users', userData);
        return postResponse
    }

    async function deleteUserAndReturnResponse(userId) {
        const deleteResponse = await deleteRequest(`/users/${userId}`);
        return deleteResponse
    }

    test('[POST] Create new user and verify response', {tag: ['@smoke', '@regression']}, async () => {
        const newUserResponse = await createAndReturnNewUserResponse();

        expect.soft(newUserResponse.status()).toBe(201);

        const jsonNewUserResponse = await newUserResponse.json();
        const userId = jsonNewUserResponse.id;

        // Read the user seed data from the userData JSON file
        const userData = JSON.parse(await fs.readFile('tests/users/testData/userData.json', 'utf8'));
        expect.soft(jsonNewUserResponse.name).toBe(userData.name);

        await printConsoleLogByEnvFlag('POST - New User created: ', jsonNewUserResponse)

        await deleteUserAndReturnResponse(userId)
    });

    test('[GET] Get user details and verify response', {tag: ['@smoke', '@regression']}, async () => {
        const newUserResponse = await createAndReturnNewUserResponse();
        const userId = (await newUserResponse.json()).id;

        await printConsoleLogByEnvFlag('GET - userId: ', userId)

        const getResponse = await getRequest(`/users/${userId}`);

        expect.soft(getResponse.status()).toBe(200);

        const jsonGetResponse = await getResponse.json();

        await printConsoleLogByEnvFlag('GET - User details: ', jsonGetResponse)

        // Initialize AJV and validate the response
        const ajv = new Ajv();
        const validate = ajv.compile(userSchema);
        const valid = validate(jsonGetResponse);

        if (!valid) {
            console.error('GET - AJV Validation Errors:', ajv.errorsText(validate.errors));
        }

        await printConsoleLogByEnvFlag('GET - Schema validation was correct!')

        expect.soft(valid).toBe(true);

        await deleteUserAndReturnResponse(userId)
    });

    test('[PUT] Update user details and verify response', {tag: ['@regression']}, async () => {
        const newUserResponse = await createAndReturnNewUserResponse();
        const jsonNewUserResponse = await newUserResponse.json();
        const userId = jsonNewUserResponse.id;

        await printConsoleLogByEnvFlag('PUT - userId: ', userId)

        // Read the user updated seed data from the updateUserData JSON file
        const updateUserData = JSON.parse(await fs.readFile('tests/users/testData/updateUserData.json', 'utf8'));

        const putResponse = await putRequest(`/users/${userId}`, updateUserData);

        expect.soft(putResponse.status()).toBe(200);
        const jsonUpdatedUserResponse = await putResponse.json();
        expect.soft(jsonUpdatedUserResponse.name).toBe(updateUserData.name);

        await printConsoleLogByEnvFlag('PUT - User updated: ', jsonUpdatedUserResponse)

        await deleteUserAndReturnResponse(userId)
    });

    test('[DELETE] Delete a user and verify response', {tag: ['@smoke','@regression']}, async () => {
        const newUserResponse = await createAndReturnNewUserResponse();
        const jsonNewUserResponse = await newUserResponse.json();
        const userId = jsonNewUserResponse.id;

        await printConsoleLogByEnvFlag('DELETE - userId: ', userId)

        const deleteResponse = await deleteUserAndReturnResponse(userId)

        expect.soft(deleteResponse.status()).toBe(204);
        const deleteResponseBody = await deleteResponse.text();
        expect.soft(deleteResponseBody).toBe('');

        await printConsoleLogByEnvFlag('DELETE - Delete response body: ', deleteResponseBody)

        await deleteUserAndReturnResponse(userId)
    });
});
