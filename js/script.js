// VARIABLES PARA ELEMENTOS DEL HTML
let inputText = document.getElementById('inputText');
let outputMessage = document.getElementById('outputMessage');
let copyButtonContainer = document.getElementById('copyButtonContainer');
let messageModal = document.getElementById('messageModal');
let modalMessage = document.getElementById('modalMessage');
let closeModal = document.getElementsByClassName('close')[0];

// VARIABLE REGEX
const regex = /^[a-z\s]+$/;

// FUNCION PARA MOSTRAR MENSAJE MODAL
function showModal(message) {
    modalMessage.textContent = message;
    messageModal.style.display = 'block';

    closeModal.onclick = function() {
        messageModal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == messageModal) {
            messageModal.style.display = 'none';
        }
    };
}

// FUNCION PARA ENCRIPTAR TEXTO
function encryptText() {
    let texto = '';
    const textoParaEncriptar = inputText.value.trim();

    // Verificar si el texto contiene solo letras minúsculas y espacios
    if (!regex.test(textoParaEncriptar)) {
        showModal('El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales');
        return;
    }

    for (let i = 0; i < textoParaEncriptar.length; i++) {
        switch (textoParaEncriptar[i]) {
            case 'a':
                texto += "ai";
                break;
            case 'e':
                texto += "enter";
                break;
            case 'i':
                texto += "imes";
                break;
            case 'o':
                texto += "ober";
                break;
            case 'u':
                texto += "ufat";
                break;
            default:
                texto += textoParaEncriptar[i];
                break;
        }
    }

    outputMessage.textContent = texto;
    copyButtonContainer.style.display = 'block';
}

// FUNCION PARA DESENCRIPTAR TEXTO
function decryptText() {
    let textoParaDesencriptar = inputText.value.trim();
    let arraPalabras = ["ai", "enter", "imes", "ober", "ufat"];
    let arraPalabras2 = ["a", "e", "i", "o", "u"];
    let textoDesencriptado = textoParaDesencriptar;

    // Verificar si el texto contiene solo letras minúsculas y espacios
    if (!regex.test(textoParaDesencriptar)) {
        showModal('El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales');
        return;
    }

    for (let i = 0; i < arraPalabras.length; i++) {
        textoDesencriptado = textoDesencriptado.replaceAll(arraPalabras[i], arraPalabras2[i]);
    }

    outputMessage.textContent = textoDesencriptado;
    copyButtonContainer.style.display = 'none';
}

// FUNCION DE COPIAR EL TEXTO
function copyText() {
    let textoCopiado = outputMessage.textContent;

    if (textoCopiado.length > 0 && regex.test(textoCopiado)) {
        navigator.clipboard.writeText(textoCopiado).then(() => {
            Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                background: '#C6F7A8',
                icon: 'success',
                title: 'Texto Copiado.'
            });
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    } else {
        showModal('El texto copiado es inválido');
    }
}

// EVENTOS DE BOTONES
document.getElementById('encryptButton').addEventListener('click', encryptText);
document.getElementById('decryptButton').addEventListener('click', decryptText);
document.getElementById('copyButton').addEventListener('click', copyText);
