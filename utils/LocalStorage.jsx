export default function guardarJuego(id, name, cover, releaseDate) {
    // Obtener la lista actual de juegos guardados
    let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

    // Verificar si el juego ya está guardado
    const existe = savedGames.some(game => game.id === id);
    if (existe) {
        alert("Este juego ya está guardado.");
        return;
    }

    // Crear objeto con la información del juego
    const nuevoJuego = {
        id,
        name,
        cover,
        addedAt: new Date().toISOString(), // Fecha de añadido (ISO 8601)
        releaseDate
    };

    // Guardar en el array y actualizar LocalStorage
    savedGames.push(nuevoJuego);
    localStorage.setItem("savedGames", JSON.stringify(savedGames));

    alert(`Juego "${name}" guardado exitosamente.`);
}

export function obtenerJuegosGuardados() {
    return JSON.parse(localStorage.getItem("savedGames")) || [];
}

export function eliminarJuego(id) {
    let juegos = JSON.parse(localStorage.getItem("savedGames")) || [];

    // Filtra los juegos dejando solo los que NO coincidan con el ID
    juegos = juegos.filter(juego => juego.id !== id);

    // Guarda la nueva lista en LocalStorage
    localStorage.setItem("savedGames", JSON.stringify(juegos));
}
