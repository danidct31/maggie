export type Locale = "it" | "en";

export const DEFAULT_LOCALE: Locale = "it";
export const LOCALES: Locale[] = ["it", "en"];

export type Dictionary = {
  nav: {
    shop: string;
    vouchers: string;
    aftercare: string;
    supplies: string;
    merch: string;
    bio: string;
    bag: string;
    login: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
  };
  login: {
    eyebrow: string;
    title: string;
    body: string;
    username: string;
    password: string;
    submit: string;
    submitting: string;
    error: string;
    back: string;
  };
  admin: {
    eyebrow: string;
    title: string;
    body: string;
    administration: string;
    logout: string;
  };
  administration: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
    uploadTitle: string;
    uploadBody: string;
    fileLabel: string;
    upload: string;
    uploadOk: string;
    uploadError: string;
    currentFile: string;
    download: string;
    noFile: string;
    linkTitle: string;
    linkBody: string;
    linkLabel: string;
    saveLink: string;
    openLink: string;
    linkOk: string;
    linkError: string;
  };
  hero: {
    alt: string;
    tagline: string;
    ctaVoucher: string;
    ctaMerch: string;
    wallHint: string;
    wallShop: string;
    wallVouchers: string;
    wallAftercare: string;
    wallSupplies: string;
    wallMerch: string;
    wallBio: string;
    wallContact: string;
    wallInstagram: string;
  };
  bio: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    alt: string;
  };
  home: {
    featured: string;
    studioPicks: string;
    viewAll: string;
    why: string;
    whyTitle1: string;
    whyTitle2: string;
    whyBody: string;
  };
  shop: {
    catalog: string;
    title: string;
    blurb: string;
    all: string;
  };
  product: {
    back: string;
    size: string;
    moreIn: string;
    amazonNote: string;
    amazonPending: string;
    addToBag: string;
    addVoucher: string;
    added: string;
    buyAmazon: string;
  };
  bag: {
    title: string;
    close: string;
    empty: string;
    amazon: string;
    studio: string;
    giftCard: string;
    remove: string;
    checkoutAmazon: string;
    amazonPending: string;
    studioNote: string;
    studioTotal: string;
    payStripe: string;
    paying: string;
    payError: string;
    clear: string;
  };
  checkout: {
    eyebrow: string;
    successTitle: string;
    successBody: string;
    cancelTitle: string;
    cancelBody: string;
    back: string;
  };
  giftCards: {
    eyebrow: string;
    title: string;
    body: string;
    addToCart: string;
    addFixed: string;
    added: string;
    customTitle: string;
    customBody: string;
    amountLabel: string;
    amountError: string;
    messageLabel: string;
    messagePlaceholder: string;
    create: string;
    sendToCart: string;
    preview: string;
    previewEmpty: string;
  };
  footer: {
    blurb: string;
    vouchers: string;
    shopAll: string;
    contact: string;
  };
  atlas: {
    eyebrow: string;
    title: string;
    body: string;
    selected: string;
    travel: string;
    send: string;
    home: string;
    shop: string;
    vales: string;
    merch: string;
    aftercare: string;
    supplies: string;
    contact: string;
    blurbHome: string;
    blurbShop: string;
    blurbVales: string;
    blurbMerch: string;
    blurbAftercare: string;
    blurbSupplies: string;
    blurbContact: string;
  };
  categories: Record<string, string>;
  products: Record<string, { name: string; description: string }>;
};

const en: Dictionary = {
  nav: {
    shop: "Shop",
    vouchers: "Gift vouchers",
    aftercare: "Aftercare",
    supplies: "Supplies",
    merch: "Merch",
    bio: "Maggie",
    bag: "Bag",
    login: "Login",
    menu: "Main menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  login: {
    eyebrow: "Studio access",
    title: "Login",
    body: "Sign in to open the Maggie Studio admin area.",
    username: "Username",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in…",
    error: "Wrong username or password.",
    back: "← Back to site",
  },
  admin: {
    eyebrow: "Maggie Studio",
    title: "Admin",
    body: "Private studio tools. Open Administration to share an Excel sheet with your team.",
    administration: "Administration",
    logout: "Log out",
  },
  administration: {
    eyebrow: "Admin",
    title: "Administration",
    body: "Share a spreadsheet in two ways: upload a file here for download, or paste a live Google Sheets / OneDrive link so everyone edits the same sheet.",
    back: "← Back to admin",
    uploadTitle: "Upload Excel",
    uploadBody:
      "Upload .xlsx, .xls, or .csv. Anyone logged into admin can download the latest file — useful for bookings, stock, or voucher lists.",
    fileLabel: "Spreadsheet file",
    upload: "Upload",
    uploadOk: "Spreadsheet uploaded.",
    uploadError: "Upload failed. Try again with an Excel or CSV file.",
    currentFile: "Current file",
    download: "Download",
    noFile: "No file uploaded yet.",
    linkTitle: "Live share link",
    linkBody:
      "Best for teamwork: create a Google Sheet (or Excel Online), set sharing to “anyone with the link”, paste the URL here, then open it anytime from admin.",
    linkLabel: "Sheet URL",
    saveLink: "Save link",
    openLink: "Open sheet",
    linkOk: "Share link saved.",
    linkError: "Could not save the link.",
  },
  hero: {
    alt: "Maggie Studio neon sign on the studio wall",
    tagline: "Gift vouchers and studio merch — give ink, or wear the shop.",
    ctaVoucher: "Buy a gift voucher",
    ctaMerch: "Shop merch",
    wallHint: "Click the objects on the wall to explore",
    wallShop: "Shop",
    wallVouchers: "Gift vouchers",
    wallAftercare: "Aftercare",
    wallSupplies: "Supplies",
    wallMerch: "Merch",
    wallBio: "Meet Maggie",
    wallContact: "Contact",
    wallInstagram: "Instagram",
  },
  bio: {
    eyebrow: "The artist",
    title: "Meet Maggie",
    p1: "Maggie is the hand behind Maggie Studio — custom tattoos, flash, and the warm chaos of a wall that never stops collecting art.",
    p2: "She works with clean lines, strong contrast, and pieces meant to age with you. Sessions are personal: from first sketch on the light pad to the last pass of ink.",
    p3: "Gift a voucher for someone ready for their next piece, or take home a bit of the studio — merch, prints, and aftercare built the same way she tattoos: careful, lasting, no filler.",
    alt: "Maggie working at her studio desk on a light pad",
  },
  home: {
    featured: "Featured",
    studioPicks: "Studio picks",
    viewAll: "View all",
    why: "Why Maggie",
    whyTitle1: "Give ink.",
    whyTitle2: "Take the shop home.",
    whyBody:
      "Gift vouchers for sessions, plus aftercare and supplies — browse on Maggie Studio, then checkout Amazon items only when you are ready.",
  },
  shop: {
    catalog: "Catalog",
    title: "Shop",
    blurb:
      "Gift vouchers from the studio, plus tattoo aftercare and supplies — Amazon examples stay on this site until checkout.",
    all: "All",
  },
  product: {
    back: "← Back to shop",
    size: "Size",
    moreIn: "More in",
    amazonNote: "Sold via Amazon — stay on Maggie Studio until checkout.",
    amazonPending:
      "Example listing (ASIN pending). Replace with a real ASIN when the Amazon shop is ready.",
    addToBag: "Add to bag",
    addVoucher: "Add voucher to bag",
    added: "Added to bag",
    buyAmazon: "Buy on Amazon",
  },
  bag: {
    title: "Bag",
    close: "Close",
    empty: "Empty for now — add vouchers or Amazon studio picks.",
    amazon: "Amazon",
    studio: "Studio",
    giftCard: "Gift card",
    remove: "Remove",
    checkoutAmazon: "Checkout Amazon items",
    amazonPending:
      "Amazon checkout unlocks when real ASINs replace the PENDING placeholders.",
    studioNote: "Gift cards are paid securely with Stripe (card).",
    studioTotal: "Studio total",
    payStripe: "Pay with card",
    paying: "Redirecting to Stripe…",
    payError: "Could not start payment. Check Stripe keys and try again.",
    clear: "Clear bag",
  },
  checkout: {
    eyebrow: "Checkout",
    successTitle: "Payment received",
    successBody:
      "Thanks — your gift card payment went through. Maggie will follow up by email with your voucher details.",
    cancelTitle: "Payment cancelled",
    cancelBody: "No charge was made. Your bag is still here if you want to try again.",
    back: "Back to gift cards",
  },
  giftCards: {
    eyebrow: "Give ink",
    title: "Gift cards",
    body: "Pick a ready amount, or create a personal card with your own value and message.",
    addToCart: "Add to bag",
    addFixed: "Add gift card",
    added: "Added",
    customTitle: "Create your own",
    customBody:
      "Enter any amount and a short note. Create the card to preview it, then send it to your bag.",
    amountLabel: "Amount",
    amountError: "Enter a valid amount (at least €1).",
    messageLabel: "Personalized text",
    messagePlaceholder: "Happy birthday — can’t wait to see your next piece.",
    create: "Create gift card",
    sendToCart: "Send to cart",
    preview: "Your gift card",
    previewEmpty: "Press Create gift card to see it here.",
  },
  footer: {
    blurb:
      "Gift vouchers and tattoo merch from the studio. Give ink — or take a piece of the shop home.",
    vouchers: "Gift vouchers",
    shopAll: "Shop all",
    contact: "Contact",
  },
  atlas: {
    eyebrow: "Atlas of Maggie",
    title: "The studio as a map",
    body: "Every territory is a page. Hover a region, then travel — gift vouchers, aftercare, and Amazon supplies.",
    selected: "Selected territory",
    travel: "Go to",
    send: "Send a message",
    home: "Home",
    shop: "Shop",
    vales: "Vales",
    merch: "Merch",
    aftercare: "Aftercare",
    supplies: "Supplies",
    contact: "Contact",
    blurbHome: "The studio front door",
    blurbShop: "Full catalog floor",
    blurbVales: "Gift voucher counter",
    blurbMerch: "Prints, kits & totes",
    blurbAftercare: "Heal right after ink",
    blurbSupplies: "Studio essentials via Amazon",
    blurbContact: "Book or ask the studio",
  },
  categories: {
    vales: "Gift vouchers",
    aftercare: "Aftercare",
    supplies: "Supplies",
    merch: "Merch",
  },
  products: {
    "vale-50": {
      name: "Gift voucher €50",
      description:
        "A €50 gift voucher for any tattoo session or studio product at Maggie Studio. Valid for 12 months. Delivered by email.",
    },
    "vale-100": {
      name: "Gift voucher €100",
      description:
        "A €100 gift voucher for Maggie Studio — perfect for a small piece or a deposit toward a larger session. Valid for 12 months.",
    },
    "vale-150": {
      name: "Gift voucher €150",
      description:
        "A €150 gift voucher toward custom work, flash, or studio merch. The gift that becomes ink. Valid for 12 months.",
    },
    "healing-balm": {
      name: "Tattoo healing balm",
      description:
        "Fragrance-free healing balm for fresh ink. Amazon example product — browse here, checkout on Amazon when the shop goes live.",
    },
    "second-skin-wrap": {
      name: "Second-skin tattoo wrap",
      description:
        "Breathable protective film for the first days after a session. Placeholder Amazon ASIN until Maggie’s store is connected.",
    },
    "green-soap": {
      name: "Concentrated green soap",
      description:
        "Studio-grade green soap concentrate for cleaning skin during and after tattooing. Amazon example listing.",
    },
    "stencil-transfer-paper": {
      name: "Stencil transfer paper",
      description:
        "Thermal stencil paper for clean transfers from sketch to skin. Example Amazon supply — replace ASIN when live.",
    },
    "nitrile-gloves": {
      name: "Black nitrile gloves (box)",
      description:
        "Powder-free black nitrile gloves — a studio essential. Shown as an Amazon example product for the shop architecture.",
    },
    "flash-sheet-book": {
      name: "Traditional flash sheet book",
      description:
        "Classic tattoo flash reference book for inspiration and wall energy. Amazon example — checkout stays on Amazon.",
    },
    "ink-cap-set": {
      name: "Disposable ink cap set",
      description:
        "Single-use ink caps for clean sessions. Placeholder Amazon product wired into the late-checkout bag flow.",
    },
  },
};

const it: Dictionary = {
  nav: {
    shop: "Shop",
    vouchers: "Buoni regalo",
    aftercare: "Aftercare",
    supplies: "Materiali",
    merch: "Merch",
    bio: "Maggie",
    bag: "Borsa",
    login: "Login",
    menu: "Menu principale",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
  },
  login: {
    eyebrow: "Accesso studio",
    title: "Login",
    body: "Accedi all’area admin di Maggie Studio.",
    username: "Utente",
    password: "Password",
    submit: "Entra",
    submitting: "Accesso…",
    error: "Utente o password non validi.",
    back: "← Torna al sito",
  },
  admin: {
    eyebrow: "Maggie Studio",
    title: "Admin",
    body: "Strumenti privati dello studio. Apri Amministrazione per condividere un foglio Excel con il team.",
    administration: "Amministrazione",
    logout: "Esci",
  },
  administration: {
    eyebrow: "Admin",
    title: "Amministrazione",
    body: "Condividi un foglio in due modi: carica un file da scaricare qui, oppure incolla un link live di Google Fogli / OneDrive così tutti modificano lo stesso foglio.",
    back: "← Torna ad admin",
    uploadTitle: "Carica Excel",
    uploadBody:
      "Carica .xlsx, .xls o .csv. Chi è loggato in admin può scaricare l’ultimo file — utile per prenotazioni, magazzino o buoni.",
    fileLabel: "File foglio",
    upload: "Carica",
    uploadOk: "Foglio caricato.",
    uploadError: "Caricamento non riuscito. Riprova con Excel o CSV.",
    currentFile: "File attuale",
    download: "Scarica",
    noFile: "Nessun file caricato.",
    linkTitle: "Link condiviso live",
    linkBody:
      "Ideale per lavorare in team: crea un Google Sheet (o Excel Online), condividi con “chiunque abbia il link”, incolla l’URL qui e aprilo quando serve.",
    linkLabel: "URL del foglio",
    saveLink: "Salva link",
    openLink: "Apri foglio",
    linkOk: "Link salvato.",
    linkError: "Impossibile salvare il link.",
  },
  hero: {
    alt: "Insegna al neon Maggie Studio sulla parete dello studio",
    tagline: "Buoni regalo e merch dallo studio — regala inchiostro, o porta a casa il negozio.",
    ctaVoucher: "Compra un buono regalo",
    ctaMerch: "Vai al merch",
    wallHint: "Clicca gli oggetti sulla parete per esplorare",
    wallShop: "Shop",
    wallVouchers: "Buoni regalo",
    wallAftercare: "Aftercare",
    wallSupplies: "Materiali",
    wallMerch: "Merch",
    wallBio: "Incontra Maggie",
    wallContact: "Contatti",
    wallInstagram: "Instagram",
  },
  bio: {
    eyebrow: "L’artista",
    title: "Incontra Maggie",
    p1: "Maggie è la mano dietro Maggie Studio — tatuaggi su misura, flash e il caldo caos di una parete che non smette di raccogliere arte.",
    p2: "Lavora con linee pulite, contrasto forte e pezzi pensati per invecchiare con te. Ogni sessione è personale: dal primo schizzo sul light pad all’ultimo passaggio di inchiostro.",
    p3: "Regala un buono a chi è pronto per il prossimo pezzo, o porta a casa un pezzo dello studio — merch, stampe e aftercare fatti come i suoi tatuaggi: precisi, duraturi, senza riempitivi.",
    alt: "Maggie al lavoro alla scrivania dello studio sul light pad",
  },
  home: {
    featured: "In evidenza",
    studioPicks: "Scelte dello studio",
    viewAll: "Vedi tutto",
    why: "Perché Maggie",
    whyTitle1: "Regala inchiostro.",
    whyTitle2: "Porta a casa lo shop.",
    whyBody:
      "Buoni regalo per le sessioni, più aftercare e materiali — sfoglia su Maggie Studio e passa ad Amazon solo quando sei pronto.",
  },
  shop: {
    catalog: "Catalogo",
    title: "Shop",
    blurb:
      "Buoni regalo dallo studio, più aftercare e materiali per tatuaggi — gli esempi Amazon restano qui fino al checkout.",
    all: "Tutti",
  },
  product: {
    back: "← Torna allo shop",
    size: "Taglia",
    moreIn: "Altri in",
    amazonNote: "Venduto tramite Amazon — resti su Maggie Studio fino al checkout.",
    amazonPending:
      "Scheda di esempio (ASIN in attesa). Sostituiscilo con un ASIN reale quando lo shop Amazon sarà pronto.",
    addToBag: "Aggiungi alla borsa",
    addVoucher: "Aggiungi buono alla borsa",
    added: "Aggiunto alla borsa",
    buyAmazon: "Compra su Amazon",
  },
  bag: {
    title: "Borsa",
    close: "Chiudi",
    empty: "Vuota per ora — aggiungi buoni o prodotti Amazon dello studio.",
    amazon: "Amazon",
    studio: "Studio",
    giftCard: "Buono regalo",
    remove: "Rimuovi",
    checkoutAmazon: "Checkout prodotti Amazon",
    amazonPending:
      "Il checkout Amazon si attiva quando gli ASIN PENDING vengono sostituiti con quelli reali.",
    studioNote: "I buoni regalo si pagano in sicurezza con Stripe (carta).",
    studioTotal: "Totale studio",
    payStripe: "Paga con carta",
    paying: "Reindirizzamento a Stripe…",
    payError: "Impossibile avviare il pagamento. Controlla le chiavi Stripe e riprova.",
    clear: "Svuota borsa",
  },
  checkout: {
    eyebrow: "Checkout",
    successTitle: "Pagamento ricevuto",
    successBody:
      "Grazie — il pagamento del buono è andato a buon fine. Maggie ti contatterà via email con i dettagli del voucher.",
    cancelTitle: "Pagamento annullato",
    cancelBody: "Non è stato addebitato nulla. La borsa è ancora lì se vuoi riprovare.",
    back: "Torna ai buoni regalo",
  },
  giftCards: {
    eyebrow: "Regala inchiostro",
    title: "Buoni regalo",
    body: "Scegli un importo pronto, oppure crea un buono personale con importo e messaggio a scelta.",
    addToCart: "Aggiungi alla borsa",
    addFixed: "Aggiungi buono",
    added: "Aggiunto",
    customTitle: "Crea il tuo",
    customBody:
      "Inserisci un importo e un breve messaggio. Crea il buono per vederlo subito, poi invialo alla borsa.",
    amountLabel: "Importo",
    amountError: "Inserisci un importo valido (almeno €1).",
    messageLabel: "Testo personalizzato",
    messagePlaceholder: "Buon compleanno — non vedo l’ora del tuo prossimo pezzo.",
    create: "Crea buono regalo",
    sendToCart: "Invia al carrello",
    preview: "Il tuo buono",
    previewEmpty: "Premi Crea buono regalo per vederlo qui.",
  },
  footer: {
    blurb:
      "Buoni regalo e merch dallo studio. Regala inchiostro — o porta a casa un pezzo del negozio.",
    vouchers: "Buoni regalo",
    shopAll: "Tutto lo shop",
    contact: "Contatti",
  },
  atlas: {
    eyebrow: "Atlante di Maggie",
    title: "Lo studio come mappa",
    body: "Ogni territorio è una pagina. Passa sopra una regione e viaggia — buoni regalo, aftercare e materiali Amazon.",
    selected: "Territorio selezionato",
    travel: "Vai a",
    send: "Invia un messaggio",
    home: "Home",
    shop: "Shop",
    vales: "Buoni",
    merch: "Merch",
    aftercare: "Aftercare",
    supplies: "Materiali",
    contact: "Contatti",
    blurbHome: "La porta dello studio",
    blurbShop: "Il piano del catalogo",
    blurbVales: "Il bancone dei buoni",
    blurbMerch: "Stampe, kit e tote",
    blurbAftercare: "Guarire bene dopo l’inchiostro",
    blurbSupplies: "Essenziali dello studio via Amazon",
    blurbContact: "Prenota o scrivi allo studio",
  },
  categories: {
    vales: "Buoni regalo",
    aftercare: "Aftercare",
    supplies: "Materiali",
    merch: "Merch",
  },
  products: {
    "vale-50": {
      name: "Buono regalo €50",
      description:
        "Un buono regalo da €50 (vale) per qualsiasi sessione o prodotto dello studio Maggie. Valido 12 mesi. Inviato via email.",
    },
    "vale-100": {
      name: "Buono regalo €100",
      description:
        "Un buono da €100 per Maggie Studio — ideale per un piccolo pezzo o un acconto su una sessione più grande. Valido 12 mesi.",
    },
    "vale-150": {
      name: "Buono regalo €150",
      description:
        "Un vale da €150 per lavoro custom, flash o merch dello studio. Il regalo che diventa inchiostro. Valido 12 mesi.",
    },
    "healing-balm": {
      name: "Balsamo cicatrizzante",
      description:
        "Balsamo senza profumo per inchiostro fresco. Prodotto esempio Amazon — sfoglia qui, checkout su Amazon quando lo shop sarà attivo.",
    },
    "second-skin-wrap": {
      name: "Pellicola second skin",
      description:
        "Pellicola protettiva traspirante per i primi giorni dopo la sessione. ASIN Amazon segnaposto finché lo store non è collegato.",
    },
    "green-soap": {
      name: "Green soap concentrato",
      description:
        "Green soap concentrato da studio per pulire la pelle durante e dopo il tatuaggio. Scheda esempio Amazon.",
    },
    "stencil-transfer-paper": {
      name: "Carta transfer per stencil",
      description:
        "Carta termica per trasferire lo schizzo sulla pelle in modo pulito. Fornitura esempio Amazon — sostituisci l’ASIN quando sarà live.",
    },
    "nitrile-gloves": {
      name: "Guanti in nitrile neri (scatola)",
      description:
        "Guanti in nitrile neri senza polvere — essenziale da studio. Mostrato come prodotto esempio Amazon.",
    },
    "flash-sheet-book": {
      name: "Libro di flash tradizionali",
      description:
        "Libro di flash classici per ispirazione e atmosfera da parete. Esempio Amazon — il checkout resta su Amazon.",
    },
    "ink-cap-set": {
      name: "Set di ink cap monouso",
      description:
        "Ink cap monouso per sessioni pulite. Prodotto Amazon segnaposto collegato al flusso di checkout ritardato.",
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { it, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.it;
}
