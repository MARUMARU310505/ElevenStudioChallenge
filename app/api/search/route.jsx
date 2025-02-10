let lastRequestTime = 0;
const REQUEST_DELAY = 250;

export async function POST(req) {
    try {
        const { query } = await req.json();

        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;

        if (timeSinceLastRequest < REQUEST_DELAY) {
            await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY - timeSinceLastRequest));
        }

        lastRequestTime = Date.now();

        const CLIENT_ID = "gbsh8lrmvb1uvj2eof8rumykxwbmtb";
        const ACCESS_TOKEN = "m25n78orh22ybl12ilx7naerlstlz2";
        const API_URL = "https://api.igdb.com/v4/games";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Accept": "application/json",
                "Content-Type": "text/plain"
            },
            body: `search "${query}"; fields name, cover.url, genres.name, first_release_date; limit 5;`
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
