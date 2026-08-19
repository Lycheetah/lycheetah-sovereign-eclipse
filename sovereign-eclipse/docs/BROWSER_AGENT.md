# How you edit Sovereign Eclipse with a browser agent

You were right about the loop. One correction: **if the agent is editing the single HTML, there is nothing to compile.** That file *is* the game. Compile (`./build`) is only for when *you* changed `src/` and need a new one-file HTML.

Two lanes. Use one per session. Do not mix them in the same pass.

---

## Lane A — Browser agent (what you described)

The agent only ever sees **one HTML file**.

### 1. Give it a working copy, not the gold master

```text
~/SOVEREIGN-ECLIPSE/archive/forge2752_nine_micro_world_demo.html   ← DO NOT hand this to the agent
~/SOVEREIGN-ECLIPSE/dist/sovereign-eclipse.html                    ← current release
```

Copy the current release to a work name:

```bash
cp ~/SOVEREIGN-ECLIPSE/dist/sovereign-eclipse.html \
   ~/SOVEREIGN-ECLIPSE/dist/WORK.html
```

Hand the agent **`dist/WORK.html`** (or drop that file on the Desktop if the agent wants a short path).

### 2. Agent makes the changes

It edits `WORK.html` only. No `src/`. No `archive/`.

### 3. You test `WORK.html`

Open it in the browser. Undock. Orbit. Shoot. Dock. Hit the world you asked for.

If it is broken: delete `WORK.html`, copy `dist/sovereign-eclipse.html` again, retry. The live release is untouched.

### 4. If it is good — backup old, replace fully

```bash
STAMP=$(date +%Y-%m-%d_%H%M)
mkdir -p ~/SOVEREIGN-ECLIPSE/archive

# keep the previous release
cp ~/SOVEREIGN-ECLIPSE/dist/sovereign-eclipse.html \
   ~/SOVEREIGN-ECLIPSE/archive/release_${STAMP}.html

# replace the live one-file game
cp ~/SOVEREIGN-ECLIPSE/dist/WORK.html \
   ~/SOVEREIGN-ECLIPSE/dist/sovereign-eclipse.html

# Desktop shortcut already points at dist/sovereign-eclipse.html
rm ~/SOVEREIGN-ECLIPSE/dist/WORK.html
```

That is: **test → backup old → replace fully → delete the work copy.**

You do **not** delete `archive/forge2752_nine_micro_world_demo.html`. That is lineage.

### 5. Know what you just did to `src/`

Lane A does **not** update `src/zones/…`. The one-file HTML is now ahead of the modular tree until someone ports the agent’s edits back.

If the session was “deepen Laughing Maw”, the next honest job is to copy that work into:

```text
src/zones/chaos/laughing-maw.js
```

If you skip that, the next `./build` from source will **wipe** the agent’s HTML work.

---

## Lane B — You (or Grok) edit source, then compile

Use this when changing ships, save, combat tables, or several zones at once.

```bash
cd ~/SOVEREIGN-ECLIPSE
# edit src/zones/... or src/ships/...
./build
```

Test `dist/sovereign-eclipse.html`. If good, same backup/replace as step 4 (the build already wrote `dist/sovereign-eclipse.html`, so you only need the archive copy).

---

## What to give the agent in one sentence

> Here is `WORK.html`. It is the entire game. Edit only this file. Do not ask for the source tree. I will test it, then I will archive the old release and replace it with this file.

## What not to do

- Do not let the agent edit `archive/forge2752_…html`
- Do not run `./build` after a Lane A session unless you have already ported the agent’s edits into `src/`
- Do not delete every file in `archive/`
- Do not keep five “latest” HTMLs on the Desktop. One work file. One live release. Archive is the graveyard of known-good builds.
