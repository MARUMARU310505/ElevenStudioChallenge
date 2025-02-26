"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData";

export default function SimilarGames({ similar_games }) {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!similar_games || similar_games.length === 0) return;

        const body = `fields name, slug, cover.image_id; where id = (${similar_games.join(",")});`;
        const url = "https://api.igdb.com/v4/games";

        fetchDataFromApi(body, url)
            .then(data => setGames(data))
            .catch(error => setError(error.message));
    }, [similar_games]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (games.length === 0) return <div className="text-gray-500">Cargando juegos similares...</div>;

    return (
        <div className="mb-8">
            <h3 className="py-2">Juegos similares</h3>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {games.map((game) => (
                    <Link href={`/game/${game.slug}`} key={game.id}>
                        <div className="flex flex-col items-center w-full h-full text-center shadow-lg rounded-lg overflow-hidden bg-white">
                            {game.cover?.image_id && (
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
                                    alt={game.name}
                                    className="w-full aspect-[3/4] object-cover"
                                />
                            )}
                            <p className="font-semibold text-gray-700 p-2 md:p-4 hidden md:block">{game.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}
