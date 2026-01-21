// Se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', () => {
	actualizarSaldoNav();
});

// Actualiza el saldo en la navbar
function actualizarSaldoNav() {
	const saldoNav = document.getElementById('saldoNav');
	const saldoActual = Number(localStorage.getItem('saldo')) || 0;

	if (saldoNav) {
		saldoNav.innerText = 'Saldo: $' + saldoActual;
	}
}

// Función para cerrar sesión
function logout() {
	localStorage.clear();
	window.location.href = 'login.html';
}
