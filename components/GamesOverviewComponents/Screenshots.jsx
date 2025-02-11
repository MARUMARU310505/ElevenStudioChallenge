"use client";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData"; // Utiliza la función reutilizable
import Image from 'next/image';
import { formatImageUrl } from "@/utils/formatUrl"; // Importar la función

export default function Screenshots({ ids }) {
    const [screenshots, setScreenshots] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ids || ids.length === 0) return; // Evita ejecutar si no hay IDs de screenshots

        // Crea el cuerpo para la solicitud de las capturas de pantalla
        const screenshotBody = `fields url, image_id, width, height; where id = (${ids.join(",")});`;
        const screenshotUrl = "https://api.igdb.com/v4/screenshots?";

        // Usamos la función reutilizable para obtener las capturas de pantalla
        fetchDataFromApi(screenshotBody, screenshotUrl)
            .then(data => setScreenshots(data))
            .catch(error => setError(error.message));
    }, [ids]); // Solo se ejecuta cuando cambian los IDs

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (screenshots.length === 0) return <div className="text-gray-500">Cargando capturas...</div>;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold">Capturas de Pantalla</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {screenshots.map((screenshot, index) => (
                    <div key={index} className="w-full h-auto">
                        <Image
                            src={formatImageUrl(screenshot.url.replace("t_thumb", "t_1080p"))}
                            alt={`Screenshot ${index + 1}`}
                            width={screenshot.width}
                            height={screenshot.height}
                            className="w-full h-auto rounded-lg shadow-md"
                            layout="intrinsic"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
