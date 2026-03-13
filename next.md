# Next.js

## Componenti built-in

### Routing di Base
La tecnica è molto semplice:
- Dentro a *src/app* ho il file *page.tsx*, che è la pagine principale, ovvero la Home Page '/'
- Sempre dentro a *src/app* creo una cartella con il nome dell'indirizzamento URL, e ci creo un'altro file nominato *page.tsx* 
- Esempio:
    + Creo la cartella *src/app/about* per fare la pagina 'About'
    + Dentro a questa cartella creo il file *page.tsx*
    + Ora all'URL *https://localhost:3000/about* mi mostrerà la mia pagina *page.tsx*

### Link

Il componente built-in <Link> mi permette di spostarmi da una paggina all'altra senza refresh di qualsiasi tipo (esegue un *pre-fetch* alla pagina--> precaricamento della pagina prima che l'utente clicchi il link):

```tsx

// ============= Link Normali ==============

<Link href="/about">About</Link>

// ============= Link con QueryStrings ==============

<Link href="/blog?categoria=news">News</Link>

// ============= Link come Oggetto ==============

<Link href={{
    pathname: "/blog",
    query: {categoria: "news", id: "123"}
}}>
    News
</Link>

// ============= Link Dinamico  ==============

<Link href="`/posts/${postID}`">Post</Link>

// ============= Link Interni ============== (Scrolling automatico alla sezione dopo il #)

<Link href="/about#team">Team Section</Link>

// ============= Link della History ============== (che non ho capito)

```

### Image 
Un'altro componente built-in pensato per inserire ed ottimizzare (automaticamente) le immagini:

```tsx

<Image src="nome_img.jpg" width={800} height={600} alt="testo alternativo all'immagine"></Image>

```

### Script
Componente built-in che mi permette di inserire script (sia inline che esterni) e dargli delle strategia di caricamento:

```tsx

// Esterni
<Script src="percorso.js" strategy="quandoVieneCaricato" />

//Inline
<Script id="show-banner">
    {`document.getElementById("banner").classList.remove("hidden")`}
</Script>

```

Questi tre componenti si possono anche configurare "inline":

```tsx

<Link
    href="/page"        // string | url object
    replace={false}     // replace invece di push nella history (se true, il nuovo URL sostituisce quello precedente nella cronologia)
    scroll={true}       // controllo scroll automatico
    prefetch={true}     // controllo prefetching (quando clicco sul Link, lo scroll torna automaticamente all'inizio della pagina)
    shallow={false}     // navigazione shallow senza ricarica dei dati (non esegue il data-fetching, quindi refresh dei dati, quando cambia URL)
    locale="en"         // per multi-language (specifica la lingua di destinzaione dei link)
/>


<Image 
    quality={75}            // qualità (1-100)
    priority={false}        // proprità caricamento
    loading="lazy"          // eager | lazy
    sizes={"(max-width-768px) 100vw, 50vw"}
    onLoad={() => {}}       // callaback caricamento
    onError={() => {}}      // callback errore
/>


<Script 
    strategy="afterInteractive"         //beforeInteractive | afterInteractive | lazyOnload | worker
    nonce="random123"                   // per CSP (per la sicurezza)
    onReady={() => {}}                  // callback quando è pronto
    onLoad={() => {}}                   // callback quando caricato
    onError={() => {}}                  // callaback quando da errore

/>



```

Configurazione di <Image> nel file 'next.config.js':

```js

module.exports = {
    images: {
        domain: ['exemple.com'],     //domini permessi
        remotePatterns: [           //pattern più precisi
            {
                protocol: "https",
                hostname: "**.exemple.com",
                port: "",
                pathname: "/images/**",
            },
        ],
        deviceSize: [640, 750, 828, 1080, 1200],    //imposto i brakpoint responsive
        imagesSize: [16, 32, 48, 64, 96],           //dimensioni delle immagini a seconda del breakpoint
        formats: ["image/wabp"],                    //fromati supportati
    }
}

```

## Componenti lato Server
Tutti i componenti che vado a scrivere sono componenti lato server (ovvero che è il Server che renderizza la pagina prima di inviarla al Client). Funziona esattamente al contrario di React, visto che React faceva il rendering sempre lato Client.
- PRO:
    + Buono per il SEO (i crawler di Google vedono la pagina già caricata)
    + Siti meno pesanti da renderizzare
    + Aperto il sito, la pagina viene già caricata mentre il JS (che rende la pagina più interattiva) si sta ancora caricando
    + Reichiede meno prestazione dei dispositivi che aprono il sito
    + Sicurezza dati: chiamare API e usare dati sensibili lato server è molto più sicuro che lato client

- CONTRO:
    + i componenti server-side non possono usare funzioni di gestione di stato --> con la **hydration** si possono "abbellire" i componenti lato client


## Componenti lato Client
Come accenato prima, i componenti lato client si possono realizzare. Una pagina quindi può essere quasi nella sua totalità renderizzata lato server, ad eccezione di alcuni piccoli componenti / funzionamenti che verrano renderizzati successivamente lato client (**hydration**).

Per rendere un componente lato client basta aggiungere:
```tsx
"use client";
```
all'inizio del file.
Di conseguenza questo file può essere trattato come un file React puro (gestione di stato ecc...).



## Route Dinamiche 
Si fa sempre con la gestione delle cartelle / sottocartelle: quando si vuole assegnare all'URL un nome dinamicamente, si mette la variabile tra parentesi quadre:
/src
    /app
        /about
            /[slug]
                page.tsx
            page.tsx

(La gestione in codice chidila a Gemini)

## Route Dinamiche Multiple
Come le Route dinamiche, solo che serve per poter assegnare più di un ULR / percorso nella stessa cartella:
/src
    /app
        /about
            /[...slug]
                page.tsx
            page.tsx

Il *concetto chiave* che porta al Routing Dinamico è la dinamicità di una stesso layout: una pagina può avere la stessa struttura pur avendo contenuti diversi (che vengono assegnati dinamicamente). Per questo dentro alla cartella [slug] c'è solo 1 file page.tsx: in base a che link si schiaccia, [slug] assumerà nomi diversi nell'URL, e la pagina avrà contenuti diversi, pur mantenendo la stessa struttura.

## Route Raggruppate
Posso raggruppare le varie sotto cartelle di *src/app* in maxi-gruppi (catalogarle) creando delle sotto cartelle nominate tra parentesi tonde (per una questione di ordine mentale):
/src
    /app
        /(content)
            /blog
                ....
            /docs
                ...
        /(main)
            ...
        /(marketing)
            /...

Nell'URL non compariranno, sono solo per una questione di organizzazione del progetto.


## Layout di pagina
Il file di default *layout.tsx* è chiamato **root layout**: tutti gli elementi html / componenti che ritorna quel file saranno presenti in tutte le altre pagine del progetto.

Se vado a mettere un file *layout.tsx* nuovo dentro a qualche sottocartella del progetto, tutti i file di quella sottocartella conterrano root layout + il nuovo layout creato lì dentro.
Spesso e volentieri si creano layout "personalizzati" per i raggruppamenti --> nelle (cartelle)

*N.B* Se un layout è client side, lo stato dei componenti del layout è condiviso per tutte le pagine che hanno quel layout. Vuol dire che se cambio lo stato di qualcosa in una pagina, vado in un'altra pagine che lo stello layout e quella cosa ha lo stato già cambiato.


## File Speciali
Oltre al file *page.tsx* nei vari route (sottocartelle), esistono altri tipi di file pensati per essere gestiti da Next: file che gestiti in un certo modo vengono utilizzati con la giusta logia automaticamente da Next.

### error.tsx 
Serve per gestire gli errori che prevalentemente non dipendono da noi (API non invia dati, Token scaduti)

### not-found.tsx 
Serve per gestire la pagina 404 (page not found)

### loading.tsx 
È la pagina che viene caricata prima che venga caricato il contenuto della pagina page.tsx.
















# Cosa serve
- foto (a buso)
- CV 

