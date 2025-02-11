// app/game/[slug]/page.jsx
"use client";

import Overview from "@/components/GamesOverviewComponents/Overview";
import { use } from "react";

export default function GamePage({ params }) {
    const { slug } = use(params); // Usamos `slug` en lugar de `id`
    console.log(slug)
    return (
        <div className="p-4">
            {/* Pasamos el `slug` como prop al componente Overview */}
            <Overview slug={slug} />
        </div>
    );
}
