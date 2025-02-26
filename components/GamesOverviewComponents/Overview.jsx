import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData";
import Screenshots from "@/components/GamesOverviewComponents/Screenshots";
import SimilarGames from "@/components/GamesOverviewComponents/SimilarGames";
import toggleGuardarJuego, { exist } from "@/utils/LocalStorage";
import Head from "next/head";
import { Star, Calendar, Puzzle } from "lucide-react";
import Alert from "@/components/Alert";

export default function Overview({ slug }) {

    const [game, setGame] = useState(null);
    const [platforms, setPlatforms] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    const handleShowAlert = (message) => {
      setAlertMessage(message);
      setShowAlert(true);
      document.body.style.overflow = "hidden"; 

    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
      document.body.style.overflow = "auto"; 
    };

    useEffect(() => {
        if (!slug) return;

        const gameBody = `where slug = "${slug}";fields name, slug, cover.url, genres.name, first_release_date, summary, platforms, screenshots, similar_games, involved_companies.company, rating; limit 1;`;
        const gameUrl = "https://api.igdb.com/v4/games";

        fetchDataFromApi(gameBody, gameUrl)
            .then(data => {
                if (data.length === 0) throw new Error("Juego no encontrado");
                setGame(data[0]);

                const platformIds = data[0].platforms;
                if (platformIds && platformIds.length > 0) {
                    const platformBody = `fields name; where id = (${platformIds.join(",")});`;
                    const platformUrl = "https://api.igdb.com/v4/platforms";

                    fetchDataFromApi(platformBody, platformUrl)
                        .then(platformData =>
                            setPlatforms(platformData.map(platform => platform.name))
                        );
                }


                const companyIds = data[0].involved_companies?.map(company => company.company);
                if (companyIds && companyIds.length > 0) {
                    const companyBody = `fields name; where id = (${companyIds.join(",")});`;
                    const companyUrl = "https://api.igdb.com/v4/companies";

                    fetchDataFromApi(companyBody, companyUrl)
                        .then(companyData =>
                            setCompanies(companyData.map(company => company.name))
                        );
                }
            })
            .catch(error => setError(error.message));
    }, [slug]);

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!game) return <h1 className="text-gray-500">Cargando Juego...</h1>;

    let btnToggleProperties = { class: "bg-purple-900 text-white", text: "Guardar Juego" };
    if (exist(game.id)) {
        btnToggleProperties.class = " border-2 border-purple-900 text-purple-900";
        btnToggleProperties.text = "Juego ya guardado";
    }
    return (
        <div className="">
            <Head>
                <title>{game.name} | Epic Gaming</title>
                <meta name="description" content={game.summary || "Sin descripción disponible."} />
                <meta property="og:title" content={game.name} />
                <meta property="og:description" content={game.summary || "Sin descripción disponible."} />
                <meta property="og:image" content={game.cover?.url.replace("t_thumb", "t_1080p")} />
                <meta property="og:url" content={`https://www.tu-sitio-web.com/game/${game.slug}`} />
                <meta property="og:type" content="website" />
            </Head>
            <div className="pt-10 pb-5 md:pt-24 md:pb-16 flex items-start gap-3">
                {game.cover?.url && (
                    <img
                        src={game.cover.url.replace("t_thumb", "t_1080p")}
                        alt={game.name}
                        className="w-1/4 md:w-1/6 h-auto rounded-lg shadow-lg shadow-pink-100 "
                    />
                )}
                <div className=" items-center gap-3">
                    <h1 className="">{game.name}</h1>
                    <h4 className="py-3 text-violet-900 opacity-60 font-semibold">{companies.length > 0 ? companies.join(", ") : "Compañías no disponibles"}</h4>

                </div>

            </div>
            <div className="md:flex gap-4 mb-10">
                <button
                    className={`${btnToggleProperties.class}  w-full md:w-1/3 rounded-3xl text-lg my-6 md:my-0 md:p-3`}
                    onClick={() => {
                        const guardado = toggleGuardarJuego(
                            game.id,
                            game.slug,
                            game.name,
                            game.cover.url.replace("t_thumb", "t_1080p"),
                            game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString() : "Desconocido"
                        );

                        if (guardado) {
                            handleShowAlert(`Juego "${game.name}" guardado exitosamente.`)
                        } else {
                            handleShowAlert(`Juego "${game.name}" eliminado.`)
                        }
                        
                    }}
                >
                    {btnToggleProperties.text}
                </button>
                <div className="flex flex-wrap gap-2 text-sm">
                    <div className="flex border-purple-300 border rounded-3xl py-1 px-4 gap-1 items-center font-semibold">
                        <Star className="w-4 h-4 text-violet-600" />
                        <p className="text-violet-600">Valoración:</p>
                        <p className=" text-violet-900">
                            {game.rating ? game.rating.toFixed(2) : "*"}
                        </p>
                    </div>
                    <div className="flex border-purple-300 border rounded-3xl py-1 px-4 gap-1 items-center font-semibold">
                        <Calendar className="w-4 h-4 text-violet-600" />
                        <p className="text-violet-600">Género:</p>
                        <p className=" text-violet-900">
                            {game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString() : "Desconocido"}
                        </p>

                    </div>
                    <div className="flex border-purple-300 border rounded-3xl py-1 px-4 gap-1 items-center font-semibold">
                        <Puzzle className="w-4 h-4 text-violet-600" />
                        <p className="text-violet-600">Lanzamiento:</p>
                        <p className=" text-violet-900">
                            {game.genres ? game.genres.map(g => g.name).join(", ") : "Sin género"}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="py-2">Descripcion</h2>
                <p className="text-gray-500 font-medium mb-8">{game.summary || "Sin descripción disponible."}</p>
                <h2 className="py-2">Plataformas</h2>

                <p className="text-gray-500 font-medium mb-6">
                    {platforms.length > 0
                        ? platforms.join(", ")
                        : "Plataforma desconocida"}
                </p>
            </div>

            <Screenshots ids={game.screenshots} />
            <SimilarGames similar_games={game.similar_games} />
            {showAlert && <Alert message={alertMessage} onClose={handleCloseAlert} />}
        </div>
    );
}
