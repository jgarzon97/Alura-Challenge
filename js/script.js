let encryptedMessage = '';

function encryptText() {
    const inputText = document.getElementById('inputText').value.trim();
    if (inputText === '') {
        document.getElementById('outputMessage').textContent = 'Ningún mensaje fue encontrado';
        return;
    }

    encryptedMessage = '';

    for (let i = 0; i < inputText.length; i++) {
        const charCode = inputText.charCodeAt(i);
        const newCharCode = charCode + 3;
        encryptedMessage += String.fromCharCode(newCharCode);
    }

    document.getElementById('outputMessage').textContent = 'Mensaje encriptado, copialo!';
    document.getElementById('copyButtonContainer').style.display = 'block';
}

function decryptText() {
    const inputText = encryptedMessage;
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
    document.getElementById('copyButtonContainer').style.display = 'none';
}

function copyText() {
    navigator.clipboard.writeText(encryptedMessage).then(() => {
        console('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}
