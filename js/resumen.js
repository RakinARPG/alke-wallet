function cargarResumenFinanciero() {
  const saldo = Number(localStorage.getItem('saldo')) || 0;
  const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

  const saldoResumen = document.getElementById('saldoResumen');
  const lista = document.getElementById('listaMovimientos');

  if (saldoResumen) {
    saldoResumen.textContent = saldo;
  }

  if (!lista) return;

  lista.innerHTML = '';

  if (movimientos.length === 0) {
    lista.innerHTML = `
      <li class="list-group-item text-muted">
        No hay movimientos registrados
      </li>
    `;
    return;
  }

  // Últimos 3 movimientos
  movimientos.slice(-3).reverse().forEach(mov => {
    const esDeposito = mov.tipo === 'Depósito';
    const signo = esDeposito ? '+' : '-';
    const color = esDeposito ? 'text-success' : 'text-danger';

    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <span>${mov.tipo} <small class="text-muted">(${mov.fecha})</small></span>
        <span class="${color}">
          ${signo}$${mov.monto}
        </span>
      </li>
    `;
  });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarResumenFinanciero);
