"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData"; // Función reutilizable

export default function SimilarGames({ similar_games }) {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!similar_games || similar_games.length === 0) return; // Evita ejecutar si no hay juegos similares

        const body = `fields name, cover.image_id; where id = (${similar_games.join(",")});`;
        const url = "https://api.igdb.com/v4/games";

        fetchDataFromApi(body, url)
            .then(data => setGames(data))
            .catch(error => setError(error.message));
    }, [similar_games]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (games.length === 0) return <div className="text-gray-500">Cargando juegos similares...</div>;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold">Juegos Similares</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {games.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id}>  {/* Mueve key aquí */}
                        <div className="w-full h-auto text-center">
                            {game.cover?.image_id && (
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                    alt={game.name}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            )}
                            <p className="mt-2 text-sm">{game.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
