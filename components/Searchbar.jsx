"use client";
import { useState, Suspense } from "react";

import Realtimeresults from "./Realtimeresults";

export default function Searchbar() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="p-4">
            <h3>Busca tu juego</h3>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Escribe algo..."
            />
            <Suspense fallback = { <div> Cargando publicaciones ...</div> }> 
                <Realtimeresults query={inputValue} />  
            </Suspense>
            
        </div>
    );
}
