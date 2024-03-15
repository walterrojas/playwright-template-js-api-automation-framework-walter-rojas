
const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const userSchema = require('./schema/userSchema.json');
const { getRequest, postRequest, putRequest, deleteRequest } = require('../baseAPI');
const fs = require('fs').promises;

let userId;

test.describe.serial('Users API Test Suite', () => {
    test('[POST] Create User and verify response', async () => {
        // Read the userData JSON file
        const newUser = JSON.parse(await fs.readFile('tests/users/testData/userData.json', 'utf8'));
        const response = await postRequest('/users', newUser);

        expect(response.status()).toBe(201);

        const responseJson = await response.json();
        userId = responseJson.id; // Save the user ID so we can use it later
        expect(responseJson.name).toBe("James Doe");

        console.log('New users details', responseJson)
        console.log('New user id', responseJson.id)
    });

    test('[GET] User by ID and verify response', async () => {
        const response = await getRequest(`/users/${userId}`);

        expect(response.status()).toBe(200);

        const userDetails = await response.json();
        console.log('Retrieved user details', userDetails)

        // Initialize AJV and validate the response
        const ajv = new Ajv();
        const validate = ajv.compile(userSchema);
        const valid = validate(userDetails);

        if (!valid) {
            console.error('AJV Validation Errors:', ajv.errorsText(validate.errors));
        }
        console.log('Schema validation is true')

        expect(valid).toBe(true);
    });

    test('[PUT] Update User and verify response', async () => {
        const updatedUser = JSON.parse(await fs.readFile('tests/users/testData/updateUserData.json', 'utf8'));
        const response = await putRequest(`/users/${userId}`, updatedUser);

        expect(response.status()).toBe(200);

        const userDetails = await response.json();
        expect(userDetails.name).toBe("James Doe Updated");

        console.log('Retrieved user details', userDetails)
    });

    test('[DELETE] Delete a User and verify response', async () => {
        const response = await deleteRequest(`/users/${userId}`);

        expect(response.status()).toBe(204);

        const responseBody = await response.text();
        expect(responseBody).toBe('');

        console.log(responseBody)
    });

});
