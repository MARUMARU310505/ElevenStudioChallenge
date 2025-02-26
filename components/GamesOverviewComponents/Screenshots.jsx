"use client";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/FetchData";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Screenshots({ ids }) {
    const [screenshots, setScreenshots] = useState([]);
    const [error, setError] = useState(null);
    const [modalImage, setModalImage] = useState(null); 

    useEffect(() => {
        if (!ids || ids.length === 0) return;

        const screenshotBody = `fields url, image_id, width, height; where id = (${ids.join(",")});`;
        const screenshotUrl = "https://api.igdb.com/v4/screenshots?";

        fetchDataFromApi(screenshotBody, screenshotUrl)
            .then(data => setScreenshots(data))
            .catch(error => setError(error.message));
    }, [ids]); 

    const showModal = (src) => {
        setModalImage(src); 
        document.body.style.overflow = "hidden"; 
    };

    const closeModal = () => {
        setModalImage(null); 
        document.body.style.overflow = "auto"; 
    };

    const handleBackgroundClick = (e) => {
        if (e.target.id === "modal-background") {
            closeModal();
        }
    };

    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (screenshots.length === 0) return <div className="text-gray-500">Cargando capturas...</div>;

    return (
        <div className="mb-8">
            <h2 className="py-2">Media</h2>

            <div className="">
                <Carousel>
                    <CarouselContent>
                        {screenshots.map((screenshot, index) => (
                            <CarouselItem className="basis-1/3 mb:basis-1/5 " key={index}>
                                <img
                                    src={screenshot.url.replace("t_thumb", "t_720p")}
                                    alt={`Screenshot ${index + 1}`}
                                    width={screenshot.width}
                                    height={screenshot.height}
                                    className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                                    onClick={() => showModal(screenshot.url.replace("t_thumb", "t_1080p"))}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {modalImage && (
                <div
                    id="modal-background"
                    className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 flex justify-center items-center"
                    onClick={handleBackgroundClick}
                >
                    <img
                        src={modalImage}
                        alt="Modal Image"
                        className="w-[90%] md:w-3/4 object-contain rounded-lg"
                    />

                </div>
            )}
        </div>
    );
}
