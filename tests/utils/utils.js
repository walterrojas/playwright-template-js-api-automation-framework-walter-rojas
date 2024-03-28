require('dotenv').config();
const moment = require('moment');

async function getTimeStamp() {
    var now = new moment().format('MMDDYYYY_HHmmssSSS_A')
    return now
}

async function getRandomValue(length) {
    let randomValue = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        randomValue += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return randomValue
}

async function generateDynamicEmail(email) {
    let dynamicEmail = email || "email_template@email.com"
    const randomValue = await getRandomValue(8)
    const currentTimeStamp = await getTimeStamp()
    dynamicEmail = dynamicEmail.replace('@', `_${randomValue}_${currentTimeStamp}@`)
    return dynamicEmail
}

async function printConsoleLogByEnvFlag(description, value) {
    if (process.env.PRINT_CONSOLE_LOG == "true") {
        if(value){
            console.log(description, value);
        }
        else {
            console.log(description);
        }
    }
}

module.exports = { printConsoleLogByEnvFlag, generateDynamicEmail }