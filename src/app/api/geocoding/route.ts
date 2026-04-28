import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const adress = searchParams.get("adress");

    if (!adress) {
        return NextResponse.json({ success: false, message: "Indirizzo mancante" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adress)}&limit=1`, {
            headers: {
                "User-Agent": "BinoaStudio (https://binoastudio.com)"
            }
        });

        const data = await response.json();

        if (data.length === 0) {
            return NextResponse.json({ success: false, message: "Inidirzzo non trovato" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                display_name: data[0].display_name
            }
        });
    } catch (error) {
        console.log("Errore durante la geocodifica: ", error instanceof Error ? error.message : "errore sconosciuto");
        return NextResponse.json({ success: false, message: "Errore durante la ricerca dell'indirizzo" }, { status: 500 });
    }
}