"use client";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData"; // Importamos la función reutilizable
import Screenshots from "@/components/GamesOverviewComponents/Screenshots"; // Asegúrate de importar correctamente el componente Overview
import SimilarGames from "@/components/GamesOverviewComponents/SimilarGames"; // Asegúrate de importar correctamente el componente Overview
import guardarJuego from "@/utils/LocalStorage";
import Image from 'next/image';
import { formatImageUrl } from "@/utils/formatUrl"; // Importar la función

export default function Overview({ slug }) { // Recibimos el `id` como prop

    const [game, setGame] = useState(null);
    const [platforms, setPlatforms] = useState([]); // Estado para plataformas
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return; // Evita ejecutar si `id` aún no está disponible

        // Definir el cuerpo específico de la consulta para el juego
        const gameBody = `where slug = "${slug}";fields name, slug, cover.url, genres.name, first_release_date, summary, platforms, screenshots, similar_games; limit 1;`;
        const gameUrl = "https://api.igdb.com/v4/games";

        // Usamos la función reutilizable para hacer la solicitud
        fetchDataFromApi(gameBody, gameUrl)
            .then(data => {
                if (data.length === 0) throw new Error("Juego no encontrado");
                setGame(data[0]); // Guardamos el primer resultado

                // Después de obtener el juego, obtener las plataformas por ID
                const platformIds = data[0].platforms;
                if (platformIds && platformIds.length > 0) {
                    // Definir el cuerpo para obtener los nombres de plataformas
                    const platformBody = `fields name; where id = (${platformIds.join(",")});`;
                    const platformUrl = "https://api.igdb.com/v4/platforms";

                    fetchDataFromApi(platformBody, platformUrl)
                        .then(platformData => setPlatforms(platformData.map(platform => platform.name))); // Establecer los nombres de las plataformas
                }
            })
            .catch(error => setError(error.message));
    }, [slug]); // Solo se ejecuta cuando cambia el `id`

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!game) return <h1 className="text-gray-500">Cargando Juego...</h1>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{game.name}</h1>
            {game.cover?.url && (


                <Image
                src={formatImageUrl(game.cover.url.replace("t_thumb", "t_1080p"))}
                alt={game.name}
                width={1000}
                height={1000}
                layout="intrinsic"
                className="w-48 h-auto rounded-lg shadow-lg my-4"
            />
            )}

            <button onClick={() => guardarJuego(game.id, game.slug, game.name, game.cover.url.replace("t_thumb", "t_1080p"), game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString() : "Desconocido")}>
                Guardar Juego
            </button>
            <p className="text-gray-600">
                {game.genres ? game.genres.map(g => g.name).join(", ") : "Sin género"}
            </p>
            <p className="text-sm text-gray-500">
                Lanzamiento: {game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString() : "Desconocido"}
            </p>
            <p className="mt-4">{game.summary || "Sin descripción disponible."}</p>

            {/* Mostrar las plataformas con los nombres */}
            <h1>
                {platforms.length > 0
                    ? platforms.join(", ") // Unir las plataformas con coma
                    : "Plataforma desconocida"}
            </h1>
            <Screenshots ids={game.screenshots} />
            <SimilarGames similar_games={game.similar_games} />
        </div>
    );
}
