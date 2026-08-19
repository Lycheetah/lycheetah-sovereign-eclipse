# HOW TO USE SOVEREIGN ECLIPSE

Two things. Do not mix them up.

| What | Path | Use it for |
|---|---|---|
| **Source** | Desktop `SOVEREIGN-ECLIPSE` | editing, forging, agents |
| **One-file game** | Desktop `sovereign-eclipse.html` | play, share, browser agent |

`src/` is truth. `dist/` is the dumb portable copy. Never hand-edit `dist/`.

---

## 1. Play the one-file game (browser agent / share)

Open this file:

```
/home/guestpc/Desktop/sovereign-eclipse.html
```

or

```
/home/guestpc/sovereign-eclipse/dist/sovereign-eclipse.html
```

Needs internet once (Three.js CDN). No server. No `src/` folder. That’s the “here bro, here’s the whole game” file.

After you change source, you **must rebuild** or this file is stale:

```
cd ~/SOVEREIGN-ECLIPSE
./build
```

That overwrites `dist/sovereign-eclipse.html` (and the Desktop shortcut points at it).

---

## 2. Play the modular tree (dev)

```
bash ~/Desktop/PLAY-SOVEREIGN-ECLIPSE.sh
```

Then open **http://127.0.0.1:8765/**

Needs a local server. `file://` will not load the modules.

---

## 3. Edit the right file

| You want to… | Touch only |
|---|---|
| Deepen Grave Choir | `src/zones/deep-current/grave-choir.js` |
| Deepen Laughing Maw | `src/zones/chaos/laughing-maw.js` |
| Cold Cathedral | `src/zones/erebos/cold-cathedral.js` |
| Aether / Black Sun / Pilgrim / Cinder / Orison / Carnival | matching file under `src/zones/` |
| Ships / races / 252 hulls | `src/ships/` |
| Research / materials | `src/progression/` |
| Save | `src/core/save.js` |
| Capacitor table | `src/combat/capacitor.js` |
| Camera / flight / HUD / undock | `src/main.js` — protected, do not rewrite |

Then `./build` if you need the one-file HTML again.

---

## 4. Rollback

Last known-good monolith:

```
~/SOVEREIGN-ECLIPSE/archive/forge2752_nine_micro_world_demo.html
```

That file is lineage. Do not develop in it.

---

## 5. Git (you fire this)

Repo: https://github.com/Lycheetah/lycheetah-sovereign-eclipse

Local is wired to `origin`. No commit/push until you say so.

---

Law: `STONE.md`. Board: `PHASE.md`.

Browser-agent loop (test → backup old → replace fully): `docs/BROWSER_AGENT.md`
