let saldo = Number(localStorage.getItem('saldo')) || 0;

/* =====================
   FORM DEPÓSITO
===================== */
document.getElementById('depositForm')?.addEventListener('submit', function (e) {
	e.preventDefault();

	const amount = Number(document.getElementById('amount').value);

	if (amount > 0) {
		saldo += amount;
		saveTransaction('Depósito', amount);
		alert('Depósito realizado con éxito');
		this.reset();
	}
});

/* =====================
   FORM ENVÍO
===================== */
document.getElementById('sendForm')?.addEventListener('submit', function (e) {
	e.preventDefault();

	const amount = Number(document.getElementById('sendAmount').value);

	if (amount > 0 && amount <= saldo) {
		saldo -= amount;
		saveTransaction('Envío', amount);
		alert('Envío realizado con éxito');
		this.reset();
	} else {
		alert('Saldo insuficiente');
	}
});

/* =====================
   GUARDAR MOVIMIENTO
===================== */
function saveTransaction(type, amount) {
	localStorage.setItem('saldo', saldo);

	const movements = JSON.parse(localStorage.getItem('movimientos')) || [];

	movements.push({
		tipo: type,
		monto: amount,
		fecha: new Date().toLocaleDateString()
	});

	localStorage.setItem('movimientos', JSON.stringify(movements));

	// Actualiza el saldo del navbar
	if (typeof actualizarSaldoNav === 'function') {
		actualizarSaldoNav();
	}
}
