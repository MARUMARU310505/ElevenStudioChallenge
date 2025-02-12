"use client"
import Link from "next/link";
import { obtenerJuegosGuardados, eliminarJuego } from "@/utils/LocalStorage";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Frown } from "lucide-react";

function ListaJuegos({ juegos, onEliminar, filter }) {
    let juegosOrdenados = [...juegos];

    switch (filter) {
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
        <div className="">
            <ul className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {juegosOrdenados.map((juego) => (
                    <li key={juego.id} className="relative flex flex-col items-center text-center bg-white shadow-lg rounded-lg h-full">
                        <Link href={`/game/${juego.slug}`} className="w-full">
                            <div className="relative">
                                <img
                                    src={juego.cover}
                                    alt={juego.name}
                                    className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onEliminar(juego.id);
                                    }}
                                    className=" absolute bottom-2 right-2 bg-white text-purple-900 p-2  rounded-full shadow-md hover:text-white hover:bg-purple-900 transition"
                                >
                                    <Trash className="w-5 h-5 " />
                                </button>
                            </div>
                        </Link>
                        <p className="font-semibold text-gray-700 p-2 md:p-4 hidden md:block">{juego.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Home() {
    const [juegos, setJuegos] = useState([]);
    const [filter, setFilter] = useState("Last Added");

    useEffect(() => {
        const juegosGuardados = obtenerJuegosGuardados();
        setJuegos(juegosGuardados);
    }, []);

    const handleEliminar = (id) => {
        eliminarJuego(id);
        const juegosGuardados = obtenerJuegosGuardados();
        setJuegos(juegosGuardados);
    };

    return (
        <div>
            <h1 className="p2-4 pt-14">Juegos Guardados</h1>

            {juegos && juegos.length > 0 ? (
                <div>
                    <div className="z-10 sticky top-4 right-4 md:top-4 md:right-auto md:mx-auto md:w-fit flex justify-evenly gap-2 my-5 bg-white rounded-3xl p-2 shadow-lg transition-all duration-300">
                        <button
                            className={`${filter === "Last Added"
                                ? "bg-purple-900 text-white"
                                : "bg-white text-purple-900"
                                } hover:bg-purple-700 hover:text-white font-medium py-2 px-4 rounded-full`}
                            onClick={() => setFilter("Last Added")}
                        >
                            Last Added
                        </button>
                        <button
                            className={`${filter === "Newest"
                                ? "bg-purple-900 text-white"
                                : "bg-white text-purple-900"
                                } hover:bg-purple-700 hover:text-white font-medium py-2 px-4 rounded-full`}
                            onClick={() => setFilter("Newest")}
                        >
                            Newest
                        </button>
                        <button
                            className={`${filter === "Oldest"
                                ? "bg-purple-900 text-white"
                                : "bg-white text-purple-900"
                                } hover:bg-purple-700 hover:text-white font-medium py-2 px-4 rounded-full`}
                            onClick={() => setFilter("Oldest")}
                        >
                            Oldest
                        </button>
                    </div>

                    <ListaJuegos juegos={juegos} onEliminar={handleEliminar} filter={filter} />
                </div>
            ) : (
                <div className="py-10">
                    <div className="justify-items-center">
                        <div className="w-2/6 md:w-1/6 bg-gradient-to-t from-gray-200 to-white py-[20%] md:py-[10%] justify-items-center rounded-2xl border border-gray-500 border-opacity-35 shadow-md">

                            <Frown className="opacity-35 text-gray-500 w-12 h-12 " />

                        </div>
                    </div>
                    <div className="w-full mx-auto justify-items-center p-5">
                        <h2 className="p-2 ">Nada agregado aun</h2>
                        <p>Aca podras ver tu collecion de juegos</p>
                    </div>
                </div>
            )}
        </div>
    );
}
