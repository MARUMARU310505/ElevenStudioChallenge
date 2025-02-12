export default function toggleGuardarJuego(id, slug, name, cover, releaseDate) {
    let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

    const index = savedGames.findIndex(game => game.id === id);

    if (index !== -1) {
        savedGames.splice(index, 1);
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
        return false; 
    } else {
        const nuevoJuego = {
            id,
            slug,
            name,
            cover,
            addedAt: new Date().toISOString(),
            releaseDate
        };

        savedGames.push(nuevoJuego);
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
        return true; 
    }
}

export function obtenerJuegosGuardados() {
    return JSON.parse(localStorage.getItem("savedGames")) || [];
}

export function eliminarJuego(id) {
    let juegos = JSON.parse(localStorage.getItem("savedGames")) || [];

    juegos = juegos.filter(juego => juego.id !== id);

    localStorage.setItem("savedGames", JSON.stringify(juegos));
}

export function exist(id){
    let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    const existe = savedGames.some(game => game.id === id);
    if (existe) {    
        return true;
    }
    return false;
}