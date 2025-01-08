//Vía: LocalStorage - CitasCreadas.
//Función para recoger datos de localStorage y añadir al listado de citas:
document.addEventListener('DOMContentLoaded', function() {
    // Obtén citas del localStorage
    const citas = JSON.parse(localStorage.getItem('citas')) || [];

    // Referencia a la tabla donde se mostrarán las citas
    const tablaBody = document.querySelector('#tabla tbody');

    // Limpia la tabla antes de mostrar las citas
    tablaBody.innerHTML = '';

    // Recorre las citas y agrega filas a la tabla
    citas.forEach((cita, index) => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td><input type="checkbox" name="checkbox${index}"></td>
            <td>${cita.nombre}</td>
            <td>${cita.dni}</td>
            <td>${cita.telefono}</td>
            <td>${cita.fechaNacimiento}</td>
            <td>${new Date(cita.fechaCita).toLocaleString()}</td>
            <td>${cita.observaciones}</td>
        `;
        tablaBody.appendChild(nuevaFila);
    });
}); 

//Función redirige al formulario para crear cita.
    function crearCita() {
        window.location.href = "crearCitas.html";
    }

//Función modificar citas.
    function modificarCita() {
        // Obtener todas las filas de la tabla
        const filas = document.querySelectorAll('#tabla tbody tr');
        let citaSeleccionada = null;
        let indiceSeleccionado = -1;
    
        // Buscar la fila seleccionada
        filas.forEach((fila, index) => {
            const checkbox = fila.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                citaSeleccionada = fila;
                indiceSeleccionado = index; // Guardar el índice de la cita seleccionada
            }
        });
    
        // Si no se seleccionó ninguna fila, mostrar un mensaje
        if (!citaSeleccionada) {
            alert("Por favor, selecciona una cita para modificar.");
            return;
        }
    
        // Obtener los datos de la cita seleccionada
        const nombre = citaSeleccionada.cells[1].innerText;
        const dni = citaSeleccionada.cells[2].innerText;
        const telefono = citaSeleccionada.cells[3].innerText;
        const fechaNacimiento = citaSeleccionada.cells[4].innerText;
        const fechaCita = citaSeleccionada.cells[5].innerText;
        const observaciones = citaSeleccionada.cells[6].innerText;
    
        // Pedir al usuario que ingrese los nuevos datos
        const nuevoNombre = prompt("Modificar Nombre:", nombre) || nombre;
        const nuevoDNI = prompt("Modificar DNI:", dni) || dni;
        const nuevoTelefono = prompt("Modificar Teléfono:", telefono) || telefono;
        const nuevaFechaNacimiento = prompt("Modificar Fecha de Nacimiento:", fechaNacimiento) || fechaNacimiento;
        
         // Solicitar la nueva fecha y hora en el formato DD-MM-YYYY HH:MM
        let nuevaFechaCita = prompt("Modificar Fecha y Hora de la Cita (Ejemplo: 01-01-2023 12:30):", fechaCita) || fechaCita;

        // Validar el formato de nuevaFechaCita
        const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})\s([01][0-9]|2[0-3]):([0-5][0-9])$/;
        if (!fechaRegex.test(nuevaFechaCita)) {
        alert("El formato de la fecha y hora es inválido. Ejemplo: 01-01-2023 12:30");
        return;
        }

        const nuevaObservaciones = prompt("Modificar Observaciones:", observaciones) || observaciones;

        // Obtener citas existentes del localStorage
        const citas = JSON.parse(localStorage.getItem('citas')) || [];
    
        // Actualizar la cita seleccionada
        if (indiceSeleccionado >= 0 && indiceSeleccionado < citas.length) {
            citas[indiceSeleccionado] = {
                nombre: nuevoNombre,
                dni: nuevoDNI,
                telefono: nuevoTelefono,
                fechaNacimiento: nuevaFechaNacimiento,
                fechaCita: nuevaFechaCita,
                observaciones: nuevaObservaciones
            };
        }
    
        // Guardar el array actualizado en localStorage
        localStorage.setItem('citas', JSON.stringify(citas));
    
        // Actualizar la tabla
        cargarCitas(); // Llamar a la función que carga las citas en la tabla
    
        alert("Cita modificada con éxito.");
    }
    
// Función para cargar las citas en la tabla
function cargarCitas() {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const tablaBody = document.querySelector('#tabla tbody');
    tablaBody.innerHTML = ''; // Limpiar la tabla

    // Si no hay citas, mostrar un mensaje
    if (citas.length === 0) {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td colspan="8" style="text-align: center;">Dato vacío</td>
        `;
        tablaBody.appendChild(nuevaFila);
    } else {
        // Si hay citas, recorrer y agregar filas a la tabla
        citas.forEach((cita, index) => {
            const nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `
                <td><input type="checkbox" name="checkbox${index}"></td>
                <td>${cita.nombre}</td>
                <td>${cita.dni}</td>
                <td>${cita.telefono}</td>
                <td>${cita.fechaNacimiento}</td>
                <td>${new Date(cita.fechaCita).toLocaleString()}</td>
                <td>${cita.observaciones}</td>
            `;
            tablaBody.appendChild(nuevaFila);
        });
    }
}

    // Llama a cargarCitas al cargar la página
    document.addEventListener('DOMContentLoaded', cargarCitas);


//Función eliminar citas.
    function eliminarCita() {
        // Obtener todas las filas de la tabla
        const filas = document.querySelectorAll('#tabla tbody tr');
        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        
        // Crear un nuevo array para las citas que no se eliminarán
        const citasActualizadas = [];
    
        // Recorrer las filas de la tabla
        filas.forEach((fila, index) => {
            const checkbox = fila.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                // Si la fila no está seleccionada, mantenerla
                citasActualizadas.push(citas[index]);
            }
        });
    
        // Guardar el array actualizado en localStorage
        localStorage.setItem('citas', JSON.stringify(citasActualizadas));
    
        // Actualizar la tabla
        cargarCitas(); // Llamar a la función que carga las citas en la tabla
    
        alert("Citas eliminadas con éxito.");
    }
    
    
