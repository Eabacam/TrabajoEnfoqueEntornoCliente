// Función para validar y guardar la cita
function validacionCita() {
    // Obtén los valores de los campos del formulario.
    const nombre = document.getElementById("nombre").value; // Obtiene el valor del campo "nombre"
    const dni = document.getElementById("dni").value; // Obtiene el valor del campo "dni"
    const telefono = document.getElementById("telefono").value; // Obtiene el valor del campo "telefono"
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value; // Obtiene el valor del campo "fecha de nacimiento"
    const fechaCita = document.getElementById("fecha").value; // Obtiene el valor del campo "fecha y hora de la cita"
    const observaciones = document.getElementById("observaciones").value; // Obtiene el valor del campo "observaciones"

    // Valida que todos los campos estén llenos.
    if (!nombre || !dni || !telefono || !fechaNacimiento || !fechaCita) { 
        alert("Por favor, completa todos los campos requeridos."); // Muestra un mensaje de alerta si falta algún campo
        return false; // Evita el envío del formulario
    }

    // Crea un objeto con los datos de la cita.
    const cita = {
        nombre, 
        dni, 
        telefono,  
        fechaNacimiento, 
        fechaCita, 
        observaciones
    };

    // Obtén citas existentes del localStorage o inicializa un array vacío.
    const citas = JSON.parse(localStorage.getItem('citas')) || []; // Intenta obtener las citas del localStorage

    // Agrega la nueva cita al array de citas.
    citas.push(cita); // Añade la nueva cita al array

    // Guarda el array actualizado en localStorage.
    localStorage.setItem('citas', JSON.stringify(citas)); // Guarda el array de citas en el localStorage

    // Limpiar el formulario.
    document.getElementById("nombre").value = ""; // Limpia el campo "nombre"
    document.getElementById("dni").value = ""; // Limpia el campo "dni"
    document.getElementById("telefono").value = ""; // Limpia el campo "telefono"
    document.getElementById("fecha_nacimiento").value = ""; // Limpia el campo "fecha de nacimiento"
    document.getElementById("fecha").value = ""; // Limpia el campo "fecha y hora de la cita"
    document.getElementById("observaciones").value = ""; // Limpia el campo "observaciones"

    alert("Cita guardada con éxito"); // Muestra un mensaje de éxito
    return false; // Evita el envío del formulario
}

// Función para ir de la página crear citas a citas creadas 
function irCitasCreadas() {
    window.location.href = 'citasCreadas.html'; // Redirige a la página de citas creadas
}