// errores.js
const inputNombre = document.getElementById('nombre');
const errorNombre = document.getElementById('errorNombre');
const errorAsistencia = document.getElementById('errorAsistencia');
const inputPersonas = document.getElementById('personas');
const errorPersonas = document.getElementById('errorPersonas');

// 1. Lógica para limpiar las alertas en rojo cuando el usuario interactúa
inputNombre.addEventListener('input', () => {
    inputNombre.classList.remove('input-invalido');
    errorNombre.classList.add('hidden');
});

inputPersonas.addEventListener('input', () => {
    inputPersonas.classList.remove('input-invalido');
    errorPersonas.classList.add('hidden');
});

// 2. Función global que evalúa si hay errores (devuelve true o false)
window.validarFormulario = function() {
    let esValido = true;

    if (inputNombre.value.trim() === '') {
        inputNombre.classList.add('input-invalido');
        errorNombre.classList.remove('hidden');
        esValido = false;
    }

    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    if (!asistenciaSeleccionada) {
        errorAsistencia.classList.remove('hidden');
        esValido = false;
    }

    if (asistenciaSeleccionada && asistenciaSeleccionada.value === 'Si') {
        const numPersonas = parseInt(inputPersonas.value);
        if (isNaN(numPersonas) || numPersonas < 1 || numPersonas > 10) {
            inputPersonas.classList.add('input-invalido');
            errorPersonas.classList.remove('hidden');
            esValido = false;
        }
    }

    return esValido; 
};