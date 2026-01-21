document.addEventListener('DOMContentLoaded', () => {
	actualizarSaldoNav();
});

function actualizarSaldoNav() {
	const saldoNav = document.getElementById('saldoNav');
	const saldoActual = Number(localStorage.getItem('saldo')) || 0;

	if (saldoNav) {
		saldoNav.innerText = 'Saldo: $' + saldoActual;
	}
}

function logout() {
	localStorage.clear();
	window.location.href = 'login.html';
}
