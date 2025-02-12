"use client";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

export default function Realtimeresults({ query }) {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 100);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {

        const searchbar = document.getElementById("searchbar");

        if (debouncedQuery.length < 2) {
            setResults([]);
            setFilteredResults([]);

            return;
        }

        const fetchData = async () => {
            try {
                const body = `search "${debouncedQuery}"; fields name, cover.url, first_release_date, slug; limit 5;`;
                const url = "https://api.igdb.com/v4/games";

                const response = await fetch("/api/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ body, url }),
                });

                if (!response.ok) throw new Error("Error en la búsqueda");

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Error en la búsqueda:", error);
            }
        };

        fetchData();
    }, [debouncedQuery]);

    useEffect(() => {
        if (debouncedQuery.length < 2) {
            setFilteredResults([]);
            return;
        }

        const lowerCaseQuery = debouncedQuery.toLowerCase();

        const options = {
            includeScore: true,
            threshold: 1,
            keys: ["name"],
        };

        const fuse = new Fuse(results, options);
        const filtered = fuse.search(lowerCaseQuery).map((result) => result.item);

        setFilteredResults(filtered);
    }, [debouncedQuery, results]);

    return (
        <ul className="px-4 py-1.5">
            {filteredResults.length > 0 ? (
                filteredResults.map((game) => (
                    <li key={game.id} className="py-1 flex items-center gap-3">
                        {game.cover?.url && (
                            <img
                                src={game.cover.url.replace("t_thumb", "t_cover_big")}
                                alt={game.name}
                                className="w-10 h-10 object-cover rounded-lg"
                            />
                        )}
                        <div>
                            <Link href={`/game/${game.slug}`}>
                                <p className="">{game.name}</p>

                            </Link>
                        </div>
                    </li>
                ))
            ) : debouncedQuery.length >= 2 ? (
                <li className="py-2 text-gray-500 text-center">No se encontraron resultados</li>
            ) : null}
        </ul>


    );
}
