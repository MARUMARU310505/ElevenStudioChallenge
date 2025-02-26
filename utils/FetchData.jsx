export const fetchDataFromApi = async (body, url) => {
    try {
        const response = await fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body, url }),
        });

        if (!response.ok) throw new Error("Error en la solicitud");

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
