// Localizar el botón flotante
const btnFlotante = document.getElementById('btnFloat');

// Escuchar el evento de scroll en la ventana
window.addEventListener('scroll', () => {
  
  // Si el usuario ha bajado más de 50 píxeles desde el inicio (el "top" exacto), mostramos el botón
  if (window.scrollY > 50) {
    btnFlotante.classList.add('mostrar');
  } else {
    // Si regresa al inicio absoluto, lo volvemos a ocultar
    btnFlotante.classList.remove('mostrar');
  }
  
});

// Reutiliza la lógica para abrir el modal desde este botón flotante
btnFlotante.onclick = () => {
  document.getElementById('modalRSVP').classList.remove('hidden');
};