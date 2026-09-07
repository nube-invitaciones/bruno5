// Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwwK-GjNAWH-OdaKOhin5KNGrL8q5fRkxR8nj7xonqxIoIvXzQQOIxfKdQyOPo7fjCxkw/exec';
const btnClose = document.getElementById('btnClose');
const btnEnviar = document.getElementById('btnEnviar');
const btnModalOpen = document.getElementById('btnModalOpen');
const campoPersonas = document.getElementById('campoPersonas');
const form = document.getElementById('rsvpForm');
const modal = document.getElementById('modalRSVP');
const radiosAsistencia = document.querySelectorAll('input[name="asistencia"]');

// Abrir y cerrar modal
btnModalOpen.onclick = () => modal.classList.remove('hidden');
btnClose.onclick = () => modal.classList.add('hidden');

radiosAsistencia.forEach(radio => {
radio.addEventListener('change', (e) => {
    errorAsistencia.classList.add('hidden');
    if (e.target.value === 'Si') {
    campoPersonas.classList.remove('hidden');
    } else {
    campoPersonas.classList.add('hidden');
    }
});
});

// Manejo del envío del formulario
form.addEventListener('submit', (e) => {
e.preventDefault();

if (!window.validarFormulario()) {
        return; 
    }

btnEnviar.disabled = true;
btnEnviar.innerText = "Enviando...";

// Localizar cuál radio button fue seleccionado
const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked').value;

const data = {
    nombre: document.getElementById('nombre').value,
    asistencia: asistenciaSeleccionada,
    // Si asiste, mandamos el número, si no, mandamos 0 por defecto
    personas: asistenciaSeleccionada === 'Si' ? document.getElementById('personas').value : 0
};

fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(() => {
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');

    const textoAgradecimiento = document.getElementById('textoAgradecimiento');
    if (data.asistencia === 'Si') {
    textoAgradecimiento.innerHTML = `<p>Gracias ${data.nombre}<br>Tu asistencia ha sido confirmada.</p><br><h2>¡Te esperamos!</h2>`;
    } else {
    textoAgradecimiento.innerHTML = `<h2>Gracias por avisarnos</h2><br><p>Lamentamos que no puedas acompañarnos, ${data.nombre}.</p>`;
    }
})
.catch(error => {
    alert("Ocurrió un error al enviar tu respuesta. Intenta de nuevo.");
    btnEnviar.disabled = false;
    btnEnviar.innerText = "Enviar respuesta";
});
});
