"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Realtimeresults from "./Realtimeresults";

export default function Searchbar() {

    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputFocus = () => {
        const results = document.getElementById("results");
        const searchbar = document.getElementById("searchbar");

        if (results) {
            results.classList.add("border-2");
            results.classList.remove("border-none");

            if (inputValue.length > 0) {
                searchbar.classList.add("rounded-t-3xl");
                searchbar.classList.remove("rounded-3xl");
                results.style.display = "block";
            } else {
                results.style.display = "none";
                searchbar.classList.add("rounded-3xl");
                searchbar.classList.remove("rounded-t-3xl");
            }
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            const results = document.getElementById("results");
            const searchbar = document.getElementById("searchbar");
            if (results) {
                results.classList.add("border-none");
                results.classList.remove("border-2");
                results.style.display = "none";

                searchbar.classList.add("rounded-3xl");
                searchbar.classList.remove("rounded-t-3xl");
            }
        }, 200);
    };

    useEffect(() => {
        const results = document.getElementById("results");
        const searchbar = document.getElementById("searchbar");

        if (inputValue.length === 0) {
            results.style.display = "none";
            searchbar.classList.add("rounded-3xl");
            searchbar.classList.remove("rounded-t-3xl");
        } else if (inputValue.length >= 2) {
            results.style.display = "block";
            searchbar.classList.add("rounded-t-3xl");
            searchbar.classList.remove("rounded-3xl");
        }
    }, [inputValue]);

    return (
        <div className="w-full md:w-[35%] justify-center items-center mx-auto ">
            <div className="relative flex ">
                <input
                    type="text"
                    className="w-full pl-10 pr-6 py-2 border-2 rounded-3xl border-pink-200 bg-white focus:outline-none placeholder:text-pink-200"
                    id="searchbar"
                    placeholder="Buscar juego..."
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                <span className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-200">
                    <Search />
                </span>
            </div>
            <div
                className="z-20 absolute w-full md:w-[35%] left-1/2 transform -translate-x-1/2 rounded-b-3xl border-t-0 border-pink-200 bg-white"
                id="results"
            >
                <Realtimeresults query={inputValue} />
            </div>
        </div>
    );
}
