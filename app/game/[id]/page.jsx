"use client";

import Overview from "@/components/GamesOverviewComponents/Overview"; // Asegúrate de importar correctamente el componente Overview

import { use } from "react";

export default function GamePage({ params }) {
    const { id } = use(params); // Usamos `use()` para desestructurar el `id` del parámetro

    return (
        <div className="p-4">
            {/* Pasamos el `id` como prop al componente Overview */}
            <Overview id={id} />
            
        </div>
    );
}
