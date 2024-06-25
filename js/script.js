function encryptText() {
    const inputText = document.getElementById('inputText').value.trim();
    if (inputText === '') {
        document.getElementById('outputMessage').textContent = 'Ningún mensaje fue encontrado';
        return;
    }

    let encryptedText = '';

    for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        const newCharCode = charCode + 3;
        encryptedText += String.fromCharCode(newCharCode);
    }

    document.getElementById('outputMessage').textContent = encryptedText;
}

function decryptText() {
    const inputText = document.getElementById('inputText').value.trim();
    if (inputText === '') {
        document.getElementById('outputMessage').textContent = 'Ningún mensaje fue encontrado';
        return;
    }

    let decryptedText = '';

    for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        const newCharCode = charCode - 3;
        decryptedText += String.fromCharCode(newCharCode);
    }

    document.getElementById('outputMessage').textContent = decryptedText;
}
