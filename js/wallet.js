// =====================
// SALDO
// =====================
let saldo = Number(localStorage.getItem('saldo')) || 0;

// =====================
// CONTACTOS
// =====================
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

const contactSelect = document.getElementById('contactSelect');

function actualizarContactos() {
	if (!contactSelect) return;
	contactSelect.innerHTML = `<option value="" disabled selected>-- Selecciona un contacto --</option>`;
	contactos.forEach(c => {
		const option = document.createElement('option');
		option.value = c.id;
		option.textContent = `${c.nombre} (${c.id})`;
		contactSelect.appendChild(option);
	});
}

actualizarContactos();

// Botón para agregar nuevo contacto
const addContactBtn = document.getElementById('addContactBtn');
if (addContactBtn) {
	addContactBtn.addEventListener('click', () => {
		const nombreInput = document.getElementById('newContactName');
		const idInput = document.getElementById('newContactId');

		const nombre = nombreInput.value.trim();
		const idAlke = idInput.value.trim();

		if (!nombre || !idAlke) {
			alert('Completa el nombre y el ID del contacto');
			return;
		}

		if (contactos.find(c => c.id === idAlke)) {
			alert('Este ID ya existe');
			return;
		}

		contactos.push({ id: idAlke, nombre });
		localStorage.setItem('contactos', JSON.stringify(contactos));
		actualizarContactos();

		nombreInput.value = '';
		idInput.value = '';

		alert(`Contacto "${nombre}" agregado con ID ${idAlke}`);
	});
}

// =====================
// DEPÓSITOS
// =====================
const depositForm = document.getElementById('depositForm');
if (depositForm) {
	depositForm.addEventListener('submit', e => {
		e.preventDefault();
		const amount = Number(document.getElementById('amount').value);
		if (amount <= 0) {
			alert('Ingresa un monto válido');
			return;
		}

		saldo += amount;
		localStorage.setItem('saldo', saldo);

		alert('Depósito realizado con éxito');
		depositForm.reset();

		// Actualizar navbar
		if (typeof actualizarSaldoNav === 'function') {
			actualizarSaldoNav();
		}

		saveTransaction('Depósito', amount);
	});
}

// =====================
// ENVÍOS
// =====================
const sendForm = document.getElementById('sendForm');
if (sendForm) {
	sendForm.addEventListener('submit', e => {
		e.preventDefault();

		const selectedId = contactSelect.value;
		const amount = Number(document.getElementById('sendAmount').value);

		if (!selectedId) {
			alert('Selecciona un contacto');
			return;
		}

		if (amount <= 0) {
			alert('Ingresa un monto válido');
			return;
		}

		if (amount > saldo) {
			alert('Saldo insuficiente');
			return;
		}

		const contacto = contactos.find(c => c.id === selectedId);

		saldo -= amount;
		localStorage.setItem('saldo', saldo);

		alert(`Enviado $${amount} a ${contacto.nombre} (ID: ${contacto.id})`);
		sendForm.reset();

		// Actualizar navbar
		if (typeof actualizarSaldoNav === 'function') {
			actualizarSaldoNav();
		}

		saveTransaction('Envío', amount, contacto);
	});
}

// =====================
// GUARDAR MOVIMIENTO
// =====================
function saveTransaction(type, amount, contacto = {}) {
	const movements = JSON.parse(localStorage.getItem('movimientos')) || [];

	movements.push({
		tipo: type,
		monto: amount,
		contactoNombre: contacto.nombre || '',
		contactoId: contacto.id || '',
		fecha: new Date().toLocaleString()
	});

	localStorage.setItem('movimientos', JSON.stringify(movements));
}
