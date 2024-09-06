const uppercaseChars = 'ABCDEFGHJKMNPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghjkmnpqrstuvwxyz';
const alphabeticChars = uppercaseChars + lowercaseChars + 'iolIOL';
const digitChars = '0123456789';
const specialChars = '!#$%&()*+.:;<=>?@[]^';

function generateRandomNumbers() {
    const passwordLength = document.getElementById('password-length').value;
    const randomValues = window.crypto.getRandomValues(new Uint8Array(passwordLength));
    return randomValues;
}

function generateRandomPassword() {
    let charList = lowercaseChars;
    charList = document.getElementById('capital').checked ? charList + uppercaseChars : charList;
    charList = document.getElementById('numbers').checked ? charList + digitChars : charList;
    charList = document.getElementById('symbols').checked ? charList + specialChars : charList;
    const randomValues = generateRandomNumbers();
    const password = Array.from(randomValues)
	.map((val) => charList[val % charList.length])
	.join('');
    return password
}

function displayRandomPassword() {
    let password = generateRandomPassword();
    while (!checkPasswordCriteria(password)) {
	password = generateRandomPassword();
    }
    document.getElementById('password-1').textContent = password;
}

function checkPasswordCriteria(password) {
    let capital = document.getElementById('capital').checked;
    let numbers = document.getElementById('numbers').checked;
    let symbols = document.getElementById('symbols').checked;
    if (capital && !(/[A-Z]/).test(password)) return false;
    if (numbers && !(/[0-9]/).test(password)) return false;
    if (symbols && !(/[!#$%&()*+.:;<=>?@\[\]^]/).test(password)) return false;
    return true;
}

function displayPasswordLength() {
    const passwordLength = document.getElementById('password-length').value;
    document.getElementById('password-length-label').textContent = passwordLength + ' characters';
}

function copyPassword() {
    const password = document.getElementById('password-1').textContent;
    navigator.clipboard.writeText(password).catch(error => {
	console.error(error.message);
    });
}

function setupEventListeners() {
    const passwordLength = document.getElementById('password-length');
    passwordLength.addEventListener('input', displayRandomPassword);
    passwordLength.addEventListener('input', displayPasswordLength);

    const checkbox = document.getElementById('checkbox');
    checkbox.addEventListener('change', displayRandomPassword);

    const regenerate = document.getElementById('regenerate');
    regenerate.addEventListener('click', displayRandomPassword);

    const password = document.getElementById('password-1');
    password.addEventListener('click', copyPassword);

}

function displayDefault() {
    displayRandomPassword();
}

document.addEventListener('DOMContentLoaded', function() {
    displayDefault();
    setupEventListeners();
});
