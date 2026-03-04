# Guida Completa: Video to Scroll-Driven Website

Questa guida documenta il workflow completo per creare siti web animati con video scroll-driven, basato sulle tecniche mostrate nel video di riferimento.

---

## Panoramica del Workflow

Il sito NON usa modelli 3D pesanti, ma trasforma un **video in una sequenza di frame** che scorrono sincronizzati con lo scroll dell'utente.

### Stack Tecnologico
- **Kie.ai** - Piattaforma AI per immagini e video
- **Nano Banana 2** - Generazione immagini iper-realistiche
- **Kling 3.0** - Generazione video AI
- **FFmpeg/FFprobe** - Estrazione frame dal video
- **Lenis** - Smooth scroll premium
- **GSAP + ScrollTrigger** - Animazioni scroll-driven
- **Canvas** - Rendering dei frame

---

## FASE 0: Creazione Video con Kie.ai

### 0.1 Registrazione e API Key
1. Vai su https://kie.ai
2. Crea un account
3. Vai su **Account Settings** → copia la tua **API Key**
4. Crea file `.env` nel progetto:
```
KIE_AI_API_KEY=tua-chiave-qui
```

### 0.2 Genera Immagini con Nano Banana 2

Il trucco è generare **2 immagini statiche** (inizio e fine) e poi far creare all'AI la transizione video.

**Regole d'oro per i prompt:**
- Sfondo nero assoluto `#000000`
- "No shadows, no reflections"
- "Plain all-black background"
- Aspect ratio: **16:9**

**Template Start Frame:**
```
"A professional studio-grade close-up of [SOGGETTO IN STATO INIZIALE].
[DETTAGLI SPECIFICI]. Plain all-black background, no shadows, no reflections.
Dramatic professional lighting."
```

**Template End Frame:**
```
"A professional studio-grade close-up of [SOGGETTO IN STATO FINALE].
[DETTAGLI SPECIFICI]. Plain all-black background, no shadows, no reflections.
Dramatic professional lighting."
```

### 0.3 Esempi Prompt per Categorie

**Prodotto Tech (es. cuffie):**
```
Start: "Professional studio image of wireless headphones, folded compact,
on plain all-black background, no shadows, no reflections."

End: "Professional studio image of the same wireless headphones, fully
extended and open, floating at an angle showing premium materials,
on plain all-black background, no shadows, no reflections."
```

**Food (es. pizza):**
```
Start: "Professional close-up of a Neapolitan pizza inside a glowing
wood-fired oven, bubbling mozzarella, orange flames in background.
Plain all-black background around oven opening, no reflections."

End: "Professional close-up of the same pizza on a wooden peel, steam
rising, hands of pizzaiolo visible (no face). Leopard spots on crust.
Plain all-black background, dramatic warm lighting."
```

**Barman/Cocktail:**
```
Start: "Professional close-up of bartender hands placing empty cocktail
glass on dark bar counter. Only hands visible, no face. Plain all-black
background, no shadows, no reflections."

End: "Professional close-up of the same hands presenting finished cocktail
with garnish. Only hands visible, no face. Plain all-black background,
no shadows, no reflections."
```

### 0.4 Crea Video con Kling 3.0

Carica le 2 immagini su Kling 3.0 (disponibile su kie.ai) e usa un prompt che descrive il movimento.

**Template Prompt Video:**
```
"Smooth cinematic transition: [DESCRIVI IL MOVIMENTO DA START A END].
Camera stays [fixed/follows motion]. [DETTAGLI ILLUMINAZIONE].
Black background maintained throughout. Professional lighting."
```

**Parametri consigliati:**
- Durata: 5-8 secondi
- Risoluzione: 1080p o 4K
- Output: MP4

### 0.5 Chiedi a Claude di Scrivere il Prompt

Se non sai come descrivere il movimento, carica le 2 immagini e chiedi:
```
"Ho queste due immagini (inizio e fine). Aiutami a scrivere un prompt
per un'IA video dove voglio che [descrivi movimento]. Mantieni le
istruzioni: no shadows, no reflections, black background."
```

---

## FASE 1: Configurazione Skills

### Struttura Cartelle Richiesta
```
progetto/
├── .claude/
│   └── skills/
│       ├── frontend-design/
│       │   └── SKILL.md
│       └── video-to-website/
│           └── SKILL.md
├── video/
│   └── prodotto.mp4
├── frames/
│   └── (generati automaticamente)
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

### Prompt di Inizializzazione
```
"Imposta questa cartella e usa le skill contenute in .claude/skills per creare il sito."
```

---

## FASE 2: Creazione del Video (Asset Principale)

### Opzione A: AI Image-to-Video
1. **Genera immagini con Nano Banana 2 o simili:**
   - Immagine iniziale: prodotto chiuso/compatto
   - Immagine finale: prodotto aperto/esploso
   - **CRITICO:** Sfondo nero assoluto `#000000`

2. **Crea transizione video con AI:**
   - Strumenti: Kling 3.0, Runway, Pika Labs
   - Durata ideale: 3-10 secondi
   - Output: MP4 o MOV

### Opzione B: Video Esistente
- Usa un video di prodotto già pronto
- Assicurati che lo sfondo sia scuro o uniforme

### Specifiche Video Consigliate
- **Durata:** 3-15 secondi (ottimale 5-8s)
- **Risoluzione:** 1080p o 4K
- **FPS:** 24-60fps
- **Sfondo:** Nero assoluto (#000000) per fusione seamless

---

## FASE 3: Prompt Strategici per Claude

### 3.1 Prompt di Avvio (Plan Mode)
```
"Ho appena inserito un video chiamato [nome_video.mp4]. Aiutami a creare una
landing page di prodotto a pagina singola. Deve essere moderna, professionale
e con animazioni fluide in tutto il design. Tutto il testo deve essere facile
da leggere e lo sfondo del sito deve essere nero assoluto (#000000) in modo
da fondersi perfettamente con lo sfondo del video, facendolo apparire come
un'unica pagina web fluida."
```

### 3.2 Prompt per Layout Apple-Style
```
"Voglio che il video del prodotto sia allineato a destra (occupando circa i
2/3 della pagina) e che tutto il testo sia allineato a sinistra. Questo serve
a dare un maggiore controllo sull'aspetto estetico."
```

### 3.3 Informazioni Branding da Fornire
Quando Claude chiede dettagli, fornisci:

| Campo | Esempio |
|-------|---------|
| **Nome Prodotto** | Obsidian Vortex |
| **Tagline** | "Annihilate everything" |
| **Colore Accento** | Blood red (#ff0000) |
| **Sezioni** | Hero, Features, Stats, CTA |

### 3.4 Prompt Correzioni Animazioni
```
"Ho testato il sito e sembra ottimo, ma ho un feedback: quando scorro verso
il basso, la 'Feature numero 2' non appare finché non è quasi fuori dallo
schermo. Modifica il codice affinché entri in vista un po' prima. Le altre
sezioni funzionano bene."
```

### 3.5 Prompt Apprendimento Continuo
```
"Ottimo lavoro. Assicurati che tutte le correzioni fatte (come il timing
delle animazioni e i colori) siano riflesse e salvate nel file SKILL.md
contenuto nella cartella .claude/skills. In questo modo, la skill diventerà
sempre più intelligente ogni volta che la usiamo."
```

---

## FASE 4: Processo Tecnico (Dietro le Quinte)

### 4.1 Estrazione Frame con FFmpeg
Claude eseguirà automaticamente:
```bash
# Analisi video
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate,nb_frames -of csv=p=0 "video.mp4"

# Estrazione frame (120-300 frame ideali)
ffmpeg -i "video.mp4" -vf "fps=15,scale=1920:-1" -c:v libwebp -quality 80 "frames/frame_%04d.webp"
```

### 4.2 Parametri Estrazione Consigliati
| Durata Video | FPS Estrazione | Frame Totali |
|--------------|----------------|--------------|
| < 5 secondi | 24-30 fps | ~120-150 |
| 5-10 secondi | 15-20 fps | ~150-200 |
| 10-30 secondi | 10-15 fps | ~200-300 |
| > 30 secondi | 5-10 fps | ~300 max |

### 4.3 Canvas Rendering
```javascript
const FRAME_SPEED = 2.0; // 1.8-2.2 consigliato
const IMAGE_SCALE = 0.85; // 0.82-0.90 per padding

ScrollTrigger.create({
  trigger: scrollContainer,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
    const index = Math.floor(accelerated * FRAME_COUNT);
    drawFrame(index);
  }
});
```

---

## FASE 5: Specifiche Design Premium

### 5.1 Sfondo e Fusione
- **Background:** `#000000` (nero assoluto)
- **Canvas:** Fonde seamlessly con lo sfondo
- **Testo:** Colori chiari per contrasto

### 5.2 Layout Raccomandato
```
┌─────────────────────────────────────────────┐
│  HEADER (fixed, blend-mode: difference)     │
├─────────────────────────────────────────────┤
│                                             │
│   ┌──────────┐    ┌──────────────────────┐  │
│   │  TEXT    │    │                      │  │
│   │  LEFT    │    │      VIDEO/CANVAS    │  │
│   │  ~35%    │    │        ~65%          │  │
│   │          │    │                      │  │
│   └──────────┘    └──────────────────────┘  │
│                                             │
├─────────────────────────────────────────────┤
│  FEATURES, STATS, CTA (scroll sections)     │
└─────────────────────────────────────────────┘
```

### 5.3 Checklist Premium (Non-Negoziabile)
- [ ] Lenis smooth scroll attivo
- [ ] Background nero `#000000`
- [ ] Video/canvas allineato a destra (~2/3)
- [ ] Testo allineato a sinistra (~1/3)
- [ ] 4+ tipi di animazione diversi
- [ ] Staggered reveals (label → heading → body)
- [ ] Counter animations per stats
- [ ] Frame speed 1.8-2.2
- [ ] CTA persistente alla fine
- [ ] 800vh+ scroll totale

---

## FASE 6: Pubblicazione (Deployment)

### 6.1 GitHub Setup
```
"Aiutami a connettermi a GitHub e crea un repository chiamato
'[nome-progetto]' per caricare il codice."
```

### 6.2 ATTENZIONE: Frame Mancanti
**CRITICO:** Assicurati che la cartella `frames/` sia inclusa nel repository!

Verifica `.gitignore`:
```gitignore
# NON escludere la cartella frames!
# frames/  <-- RIMUOVI questa riga se presente

node_modules/
.env
*.log
```

### 6.3 Vercel Deployment
1. Collega account Vercel a GitHub
2. Importa il repository
3. Deploy automatico ad ogni push

---

## Troubleshooting Comune

### Frame non caricano
- Servire via HTTP, non `file://`
- Verificare percorsi relativi corretti
- Controllare console per errori 404

### Scroll choppy
- Aumentare valore `scrub` in ScrollTrigger
- Ridurre numero frame
- Verificare Lenis connesso a GSAP

### Video non si fonde con sfondo
- Background deve essere esattamente `#000000`
- Canvas fillStyle deve matchare
- Verificare sample color dai bordi frame

### Animazioni sfasate
- Regolare `data-enter` e `data-leave` nelle sezioni
- Verificare `FRAME_SPEED` (1.8-2.2)
- Controllare scroll container height (800vh+)

---

## Risorse Utili

### Strumenti AI per Video
- **Nano Banana 2** (Kie.ai) - Immagini iper-realistiche
- **Kling 3.0** - Video AI
- **Runway Gen-3** - Video AI
- **Pika Labs** - Video AI

### CDN Libraries
```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

### Comandi FFmpeg Utili
```bash
# Info video
ffprobe -v error -show_format -show_streams video.mp4

# Estrai frame WebP (qualità)
ffmpeg -i video.mp4 -vf "fps=15,scale=1920:-1" -c:v libwebp -quality 85 frames/frame_%04d.webp

# Estrai frame PNG (lossless)
ffmpeg -i video.mp4 -vf "fps=15,scale=1920:-1" frames/frame_%04d.png

# Conta frame estratti
ls frames/ | wc -l
```

---

*Documento creato per riferimento futuro. Aggiornare con correzioni e miglioramenti ad ogni progetto.*
