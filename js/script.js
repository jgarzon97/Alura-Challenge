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

    muñecoContainer.classList.remove('hidden');
    copyButtonContainer.style.display = 'none';

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

    // Convertir el texto del input a minúsculas
    inputText.addEventListener('input', function () {
        inputText.value = inputText.value.toLowerCase();
    });
});

// FUNCION PARA ENCRIPTAR TEXTO
function encryptText() {
    const textoParaEncriptar = inputText.value.trim();

    // Verificar si el texto contiene solo letras minúsculas y espacios
    if (!regex.test(textoParaEncriptar)) {
        showModal('El texto debe contener solo letras minúsculas sin acentos ni caracteres especiales');
        return;
    }

    let texto = '';
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

    // Ocultar el muñeco y expandir el textarea
    muñecoContainer.classList.add('hidden');
    outputContainer.classList.add('expanded');
    outputContainer.classList.remove('hidden');
    outputText.style.flexGrow = '1';
    outputText.value = texto;
    outputText.style.height = '50vh';
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

    // Ocultar el muñeco y expandir el textarea
    muñecoContainer.classList.add('hidden');
    outputContainer.classList.remove('hidden');
    outputText.style.flexGrow = '1';
    outputText.style.height = '50vh';
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
                background: '#fff',
                icon: 'success',
                title: 'Texto Copiado.'
            });
            // Borrar el texto y mostrar el muñeco
            outputText.value = '';
            outputText.style.height = '100%';
            muñecoContainer.classList.remove('hidden');
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
