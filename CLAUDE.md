# Animated Website Project

## Skills Disponibili

Questo progetto include le seguenti skills in `.claude/skills/`:

| Skill | Comando | Descrizione |
|-------|---------|-------------|
| **frontend-design** | `/frontend-design` | Crea interfacce distintive, evitando estetica AI generica |
| **video-to-website** | `/video-to-website` | Converte video in siti scroll-driven con GSAP |
| **skill-builder** | `/skill-builder` | Guida creazione nuove skills |
| **excalidraw-diagram** | `/excalidraw-diagram` | Crea diagrammi Excalidraw editabili |
| **nano-banana-images** | `/nano-banana-images` | Genera immagini iper-realistiche via Kie.ai |

## Workflow Video-to-Website

### Prerequisiti
1. **FFmpeg** deve essere installato (vedi sotto)
2. Un file video (MP4/MOV) nella cartella `video/`
3. Sfondo video nero `#000000` per fusione seamless

### Installazione FFmpeg (Windows)

**Opzione 1: Winget (consigliato)**
```powershell
winget install FFmpeg
```

**Opzione 2: Chocolatey**
```powershell
choco install ffmpeg
```

**Opzione 3: Download manuale**
1. Vai su https://ffmpeg.org/download.html
2. Scarica la build per Windows
3. Estrai in `C:\ffmpeg`
4. Aggiungi `C:\ffmpeg\bin` al PATH di sistema

### Uso Tipico

1. Inserisci il video in `video/prodotto.mp4`
2. Avvia Claude Code in questa cartella
3. Usa il prompt:
```
"Ho inserito un video chiamato video/prodotto.mp4. Aiutami a creare una
landing page di prodotto a pagina singola con sfondo nero #000000 che si
fonde con il video. Usa la skill video-to-website."
```

## Struttura Progetto

```
animated-website/
├── .claude/
│   └── skills/
│       ├── frontend-design/
│       ├── video-to-website/
│       └── ...
├── video/           # Inserisci qui i video sorgente
├── frames/          # Frame estratti (generati automaticamente)
├── css/
├── js/
├── index.html
├── CLAUDE.md        # Questo file
└── VIDEO-TO-WEBSITE-GUIDE.md  # Guida dettagliata
```

## Riferimenti

- **Guida completa:** `VIDEO-TO-WEBSITE-GUIDE.md`
- **Skill frontend:** `.claude/skills/frontend-design/SKILL.md`
- **Skill video:** `.claude/skills/video-to-website/SKILL.md`

## Note

- Il sito attuale in `index.html` è una versione sperimentale senza video
- Per creare la versione con video, fornisci un file MP4 e segui il workflow
- Sfondo nero `#000000` è critico per la fusione video-pagina
