/**
 * Renderizado de historial de transacciones.
 * El objetivo es mejorar la experiencia de usuario (UX) mostrando un mensaje
 * informativo en caso de que la 'base de datos' (localStorage) esté vacía.
 */

const list = document.getElementById('list');
const emptyState = document.getElementById('emptyState');

// Recuperamos los movimientos o inicializamos un array vacío para evitar errores de ejecución
const movements = JSON.parse(localStorage.getItem('movimientos')) || [];

/**
 * Lógica de control de flujo:
 * Si el array tiene elementos, los recorre. Si no, activa el estado vacío.
 */
if (movements.length === 0) {
    // Si no hay registros, eliminamos la clase 'd-none' para mostrar el mensaje de bienvenida
    emptyState?.classList.remove('d-none');
} else {
    // Si existen registros, iteramos para construir la lista dinámicamente
    movements.forEach(op => {
        const li = document.createElement('li');
        
        // Usamos Flexbox para alinear el texto (izquierda) y el monto (derecha)
        li.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 border-start border-4 ' + 
                       (op.tipo === 'Depósito' ? 'border-success' : 'border-danger');

        li.innerHTML = `
            <div>
                <span class="fw-bold">${op.tipo}</span><br>
                <small class="text-muted">${op.fecha}</small>
            </div>
            <span class="badge ${op.tipo === 'Depósito' ? 'bg-success' : 'bg-danger'} rounded-pill">
                ${op.tipo === 'Depósito' ? '+' : '-'}$${op.monto}
            </span>
        `;

        list.appendChild(li);
    });
}