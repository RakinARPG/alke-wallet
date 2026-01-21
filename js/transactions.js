const list = document.getElementById('list');
const movements = JSON.parse(localStorage.getItem('movimientos')) || [];

movements.forEach(op => {
	const li = document.createElement('li');
	li.className = 'list-group-item';

	li.innerHTML = `
		<strong>${op.tipo}</strong> - $${op.monto}
		<br>
		<small>${op.fecha}</small>
	`;

	list.appendChild(li);
});
