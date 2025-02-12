import Searchbar from "../components/Searchbar";
import { Swords } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <main className="relative">
            <div className="z-[-2] absolute w-full h-screen ">
                <p className="z-[-2] opacity-90 absolute top-2 left-[55%] text-pink-300 text-sm font-bold rotate-[-25deg] rounded-lg shadow-md shadow-white bg-pink-50 p-1.5 pr-3 pl-3">W</p>
                <p className="z-[-2] opacity-90 absolute top-6 left-[75%] text-pink-300 text-sm font-bold rotate-[20deg] rounded-lg shadow-md shadow-white bg-pink-50 p-1.5 pr-3 pl-3">A</p>
                <p className="z-[-2] opacity-90 absolute top-3 left-[90%] text-pink-300 text-sm font-bold rotate-[15deg] rounded-lg shadow-md shadow-white bg-pink-50 p-1.5 pr-3 pl-3">S</p>
                <p className="z-[-2] opacity-90 absolute -top-1 left-[35%] text-pink-300 text-sm font-bold rotate-[15deg] rounded-sm shadow-md shadow-white bg-pink-50 p-2"></p>
                <p className="z-[-2] opacity-90 absolute top-14 left-[98%] text-pink-300 text-sm font-bold rotate-[15deg] rounded-sm shadow-md shadow-white bg-pink-50 p-1"></p>
            </div>
            <nav className="w-full justify-center pb-8">
                <div className="flex items-start gap-3 pt-16 justify-start md:justify-center">
                    <Link href={"/"}>
                        <Swords className="rounded-lg shadow-xl border-2 border-pink-600 text-violet-900 p-1 bg-pink-100" />
                    </Link>
                    <Link href={"/"}>
                        <h1 className="font-bold bg-gradient-to-r from-[#3c1661] to-[#8038c9] bg-clip-text text-transparent">
                            Epic Gaming
                        </h1>
                    </Link>
                </div>
            </nav>

            <Searchbar />
        </main>
    );
}
