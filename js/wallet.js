$(document).ready(function() {
    // =====================
    // ESTADO INICIAL
    // =====================
    let saldo = Number(localStorage.getItem('saldo')) || 0;
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [
        { id: "123", nombre: "Juan Pérez" },
        { id: "456", nombre: "María García" }
    ];

    // Actualizar saldo en Navbar al iniciar
    actualizarSaldoUI();

    function actualizarSaldoUI() {
        $('#saldoNav').text(`Saldo: $${saldo.toLocaleString()}`);
    }

    // =====================
    // GESTIÓN DE CONTACTOS (jQuery)
    // =====================
    
    // Filtro y Autocompletado
    $('#buscarContacto').on('keyup', function() {
        let query = $(this).val().toLowerCase().trim();
        let $lista = $('#listaSugerencias');
        let $btnAgregar = $('#btnAgregar');
        
        $lista.empty();

        if (query.length > 0) {
            let filtrados = contactos.filter(c => 
                c.nombre.toLowerCase().includes(query) || c.id.includes(query)
            );
            
            if (filtrados.length > 0) {
                filtrados.forEach(c => {
                    $lista.append(`<li class="list-group-item list-group-item-action" data-id="${c.id}" data-nombre="${c.nombre}">${c.nombre} (${c.id})</li>`);
                });
                $lista.slideDown(200); // Animación
                $btnAgregar.fadeOut(100);
            } else {
                $lista.hide();
                $btnAgregar.fadeIn(100);
            }
        } else {
            $lista.hide();
            $btnAgregar.fadeOut(100);
        }
    });

    // Selección de contacto
    $(document).on('click', '#listaSugerencias li', function() {
        const id = $(this).data('id');
        const nombre = $(this).data('nombre');

        $('#buscarContacto').val(nombre);
        $('#contactoIdSeleccionado').val(id);
        $('#contactoNombreSeleccionado').val(nombre);
        
        $('#listaSugerencias').fadeOut(200);
    });

    // Agregar nuevo contacto (Lección 5/6)
    $('#btnAgregar').on('click', function() {
        const nuevoNombre = $('#buscarContacto').val().trim();
        const nuevoId = Math.floor(Math.random() * 1000000).toString(); // ID aleatorio para el ejemplo

        if (nuevoNombre) {
            contactos.push({ id: nuevoId, nombre: nuevoNombre });
            localStorage.setItem('contactos', JSON.stringify(contactos));
            
            $('#contactoIdSeleccionado').val(nuevoId);
            $('#contactoNombreSeleccionado').val(nuevoNombre);
            
            alert(`Contacto "${nuevoNombre}" agregado.`);
            $(this).fadeOut(100);
        }
    });

    // =====================
    // DEPÓSITOS (jQuery)
    // =====================
    $('#depositForm').on('submit', function(e) {
        e.preventDefault();
        const amount = Number($('#amount').val());

        if (amount > 0) {
            saldo += amount;
            localStorage.setItem('saldo', saldo);
            actualizarSaldoUI();
            saveTransaction('Depósito', amount);
            
            alert('¡Depósito exitoso!');
            this.reset();
        }
    });

    // =====================
    // ENVÍOS (jQuery)
    // =====================
    $('#sendForm').on('submit', function(e) {
        e.preventDefault();
        
        const amount = Number($('#sendAmount').val());
        const destinoId = $('#contactoIdSeleccionado').val();
        const destinoNombre = $('#contactoNombreSeleccionado').val();

        if (!destinoId) {
            alert('Por favor, selecciona un contacto de la lista o agrégalo.');
            return;
        }

        if (amount > 0 && amount <= saldo) {
            saldo -= amount;
            localStorage.setItem('saldo', saldo);
            actualizarSaldoUI();

            saveTransaction('Envío', amount, { nombre: destinoNombre, id: destinoId });
            
            alert(`Transferencia de $${amount} a ${destinoNombre} realizada.`);
            this.reset();
            $('#buscarContacto').val('');
            $('#contactoIdSeleccionado').val('');
        } else {
            alert('Monto inválido o saldo insuficiente.');
        }
    });

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
});