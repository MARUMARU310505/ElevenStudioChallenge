export async function POST(req) {
    try {
        const { body, url } = await req.json();

        const CLIENT_ID = "gbsh8lrmvb1uvj2eof8rumykxwbmtb";
        const ACCESS_TOKEN = "m25n78orh22ybl12ilx7naerlstlz2";
        const API_URL = url;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Accept": "application/json",
                "Content-Type": "text/plain"
            },
            body: body
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Error: ${response.status} - ${response.statusText}, Details: ${errorDetails}`);
        }

        const data = await response.json();
        
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
    
}
