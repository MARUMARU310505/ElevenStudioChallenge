"use client";
import { useEffect, useState } from "react";
import Fuse from 'fuse.js';
import Link from "next/link";

export default function Realtimeresults({ query }) {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            setFilteredResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                const body = `search "${query}"; fields name, cover.url, genres.name, first_release_date, slug; limit 5;`;
                const url = "https://api.igdb.com/v4/games";

                const response = await fetch("/api/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ body, url }), // Pasa el body como JSON
                });

                if (!response.ok) throw new Error("Error en la búsqueda");

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        if (query.length < 2) {
            setFilteredResults([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        const options = {
            includeScore: true,
            threshold: 1,
            keys: ['name'],
        };

        const fuse = new Fuse(results, options);
        const filtered = fuse.search(lowerCaseQuery).map(result => result.item);


        setFilteredResults(filtered);
    }, [query, results]);

    return (

        <div className="mt-4 relative ">
            <div className="absolute bg-white p-1">
                <h3>Resultados:</h3>
                <ul>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((game) => (
                            <li key={game.id} className="border-b py-2 flex items-center">
                                {game.cover?.url && (
                                    <img
                                        src={game.cover.url.replace("t_thumb", "t_cover_big")}
                                        alt={game.name}
                                        className="w-16 h-16 object-cover mr-2"
                                    />
                                )}
                                <div>
                                    {console.log(game.slug)}
                                    
                                    <Link href={`/game/${game.slug }`}>
                                        <p className="font-semibold">{game.name}</p>
                                        {game.genres && (
                                            <p className="text-sm text-gray-500">
                                                {game.genres.map((g) => g.name).join(", ")}
                                            </p>
                                        )}
                                    </Link>

                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </ul>
            </div>

        </div>
    );
}
