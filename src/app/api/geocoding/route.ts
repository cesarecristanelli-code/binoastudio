import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q) {
        return NextResponse.json({ success: false, message: "Indirizzo mancante" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`, {
            headers: {
                "User-Agent": "BinòaStudio (https://binoastudio.com)"
            }
        });

        const data = await response.json();

        if (data.length === 0) {
            return NextResponse.json({ success: false, message: "Indirizzo non trovato" }, { status: 404 });
        }

        const result = data[0];

        return NextResponse.json({
            success: true,
            data: {
                lat: parseFloat(result.lat),
                lng: parseFloat(result.lon),
                display_name: result.display_name
            }
        });
    } catch (error) {
        console.log("Errore durante la geocodifica: ", error instanceof Error ? error.message : "errore sconosciuto");
        return NextResponse.json({ success: false, message: "Errore durante la ricerca dell'indirizzo" }, { status: 500 });
    }
}