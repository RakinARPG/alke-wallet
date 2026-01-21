$('#loginForm').submit(function (e) {
	e.preventDefault();

	const user = $('#user').val();
	const pass = $('#pass').val();

	if (user === 'admin' && pass === '1234') {
		localStorage.setItem('saldo', 1000);
		localStorage.setItem('movimientos', JSON.stringify([]));
		window.location.href = 'menu.html';
	} else {
		$('#error').text('Usuario o contraseña incorrectos');
	}
});
