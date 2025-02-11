"use client"
import Link from "next/link";
import Searchbar from "../components/Searchbar";
import { obtenerJuegosGuardados, eliminarJuego } from "@/utils/LocalStorage";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { formatImageUrl } from "@/utils/formatUrl"; // Importar la función

function ListaJuegos({ juegos, onEliminar, filter }) {
    let juegosOrdenados = [...juegos]; // Hacemos una copia para evitar mutaciones directas

    // Filtrar según el 'filter' recibido usando switch-case
    switch (filter) {
        //a - b, mas viejo primero
        case "Last Added":
            juegosOrdenados = juegosOrdenados.sort((b, a) =>
                new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
            );
            break;
        case "Newest":
            juegosOrdenados = juegosOrdenados.sort((b, a) =>
                new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
            );
            break;
        case "Oldest":
            juegosOrdenados = juegosOrdenados.sort((a, b) =>
                new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
            );
            break;
        default:
            break;
    }

    return (
        <div className="p-14">
            <ul>
                {juegosOrdenados.map(juego => (
                    <li key={juego.id}>
                        {console.log(juego.cover)}
                        <Link href={`/game/${juego.slug}`}>
                            
                            <Image
                                src={formatImageUrl(juego.cover)}
                                alt={juego.name}
                                width={100}
                                height={100}
                                layout="intrinsic"
                            />
                            <p>{juego.name}</p>
                        </Link>
                        <Button variant="outline" onClick={() => onEliminar(juego.id)}>❌ Eliminar</Button>
                        <p>Lanzamiento: {juego.releaseDate}</p>
                        <p>Agregado: {juego.addedAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Home() {
    const [juegos, setJuegos] = useState([]);
    const [filter, setFilter] = useState("Last Added"); // Estado para manejar el filtro

    // Obtener los juegos guardados desde LocalStorage
    useEffect(() => {
        const juegosGuardados = obtenerJuegosGuardados();
        setJuegos(juegosGuardados);
    }, []);

    // Manejar la eliminación de un juego
    const handleEliminar = (id) => {
        eliminarJuego(id);
        // Actualizar los juegos después de eliminar
        const juegosGuardados = obtenerJuegosGuardados();
        setJuegos(juegosGuardados);
    };

    return (
        <div>
            <Searchbar />
            <h2>Juegos Guardados</h2>
            <div className="justify-between p-4">
                {/* Botones de filtro */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setFilter("Last Added")}>Last Added</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setFilter("Newest")}>Newest</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setFilter("Oldest")}>Oldest</button>
            </div>

            {/* Lista de juegos con el filtro */}
            <ListaJuegos juegos={juegos} onEliminar={handleEliminar} filter={filter} />
        </div>
    );
}
