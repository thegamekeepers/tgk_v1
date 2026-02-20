# The Game Keeper 🎲

A living encyclopedia of board games from across history and culture — built by a father and son.

---

## Project Structure

```
boardgames-world/
├── index.html              ← Homepage (list of all games)
├── css/
│   └── main.css            ← All shared styles
├── js/
│   └── main.js             ← Shared JavaScript
├── games/
│   ├── _template.html      ← COPY THIS to add a new game
│   ├── mancala.html        ← Example game page
│   ├── senet.html          ← (create when ready)
│   └── ...
├── demos/
│   ├── mancala.html        ← Playable Mancala demo
│   └── ...
└── images/
    └── games/              ← Put game images here
```

---

## How to Add a New Game

1. **Copy the template:**
   ```
   games/_template.html → games/your-game-name.html
   ```

2. **Fill in the content** — every section marked `<!-- CHANGE -->` needs updating.

3. **Add it to the homepage** — open `index.html` and copy one of the `.game-card` blocks inside `<div class="games-grid">`. Update the title, description, region, date, and link.

4. **If you have a demo**, create `demos/your-game-name.html` and uncomment the demo link in the sidebar.

5. **Push to GitHub** → Netlify will automatically redeploy.

---

## How to Add a Playable Demo

Demos live in the `/demos` folder. Each demo is a standalone HTML file with all CSS and JavaScript inside it (no external dependencies needed).

A demo should:
- Link back to its game page (`../games/game-name.html`)
- Be playable on mobile and desktop
- Include a brief how-to-play note

The Mancala demo (`demos/mancala.html`) is a good reference to copy from.

---

## Deploying to Netlify

1. Push this folder to a GitHub repository
2. Log in to [netlify.com](https://netlify.com)
3. Click **"Add new site" → "Import an existing project"**
4. Connect GitHub and choose this repository
5. Build command: *(leave blank — this is a plain HTML site)*
6. Publish directory: `.` (or the root folder)
7. Click **Deploy**

After the first deploy, every `git push` automatically updates the live site.

---

## Tips

- Keep game pages factual and cite sources where possible
- For "Did You Know?" boxes, try to find something genuinely surprising
- The `_template.html` file starts with `_` so it stays at the top of the folder and is easy to find
- Game pages use a two-column layout on desktop and single-column on mobile automatically
