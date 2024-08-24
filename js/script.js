// Definir regex para validar solo letras minúsculas y sin acentos
const regex = /^[a-z\s]+$/;

// VARIABLES PARA ELEMENTOS DEL HTML
let inputText, outputText, copyButtonContainer, messageModal, modalMessage, closeModal, muñecoContainer;

document.addEventListener('DOMContentLoaded', function () {
    inputText = document.getElementById('inputText');
    outputText = document.getElementById('outputText');
    copyButtonContainer = document.getElementById('copyButtonContainer');
    messageModal = document.getElementById('messageModal');
    modalMessage = document.getElementById('modalMessage');
    closeModal = document.getElementsByClassName('close')[0];
    muñecoContainer = document.querySelector('.muñeco-container');

    if (closeModal) {
        // Cerrar el modal al hacer clic en el botón de cierre
        closeModal.onclick = function () {
            messageModal.style.display = "none";
        }
    }

    // Cerrar el modal al hacer clic fuera de él
    window.onclick = function (event) {
        if (event.target === messageModal) {
            messageModal.style.display = "none";
        }
    }
});

// FUNCION PARA ENCRIPTAR TEXTO
function encryptText() {
    let texto = '';
    const textoParaEncriptar = inputText.value.trim();

    // Verificar si el texto contiene solo letras minúsculas y espacios
    if (!regex.test(textoParaEncriptar)) {
        showModal('El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales');
        return;
    }

    // Ocultar el muñeco
    muñecoContainer.classList.add('hidden');

    // Expande el textarea para ocupar todo el espacio
    outputText.style.height = '100%';

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

    outputText.value = texto;
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

    outputText.value = textoDesencriptado;
    copyButtonContainer.style.display = 'none';
}

// FUNCION DE COPIAR EL TEXTO
function copyText() {
    let textoCopiado = outputText.value;

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
            // Borrar el texto y mostrar el muñeco
            outputText.value = '';
            muñecoContainer.classList.remove('hidden');
            outputText.style.height = '50%'; // Restablecer la altura del textarea
            copyButtonContainer.style.display = 'none';
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    } else {
        showModal('El texto copiado es inválido');
    }
}

// FUNCION PARA MOSTRAR EL MODAL
function showModal(message) {
    modalMessage.textContent = message;
    messageModal.style.display = "block";
}
