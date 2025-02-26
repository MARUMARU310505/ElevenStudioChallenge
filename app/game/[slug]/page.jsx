"use client";

import Overview from "@/components/GamesOverviewComponents/Overview";
import { use } from "react";

export default function GamePage({ params }) {
    const { slug } = use(params);
    return (
        <div className="">
            <Overview slug={slug} />
        </div>
    );
}
