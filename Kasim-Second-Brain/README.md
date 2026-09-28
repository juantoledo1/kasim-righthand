---
title: Kasim Second Brain — Starter README
type: moc
tags: [kasim, second-brain, starter, navigation]
source: derived
status: starter
---

# Kasim Second Brain — Starter README

This is a **starter Second Brain** for **Kasim Aslam**, the sample founder used for the Pareto Talent bootcamp (Day 3 homework). It is a plain folder of Markdown notes that organizes everything we know about Kasim — who he is, what he sells, who works with him, his company history, his frameworks, his media, and his interview material — so the next Right Hand can pick it up **cold** and start useful in minutes.

## What this is (and is not)

- **It is:** a structured, source-backed set of notes. Every fact comes from the intake files (`textWeb.md`, `trasnscription.md`, `KasimFrameworks.md`, `links.md`).
- **It is not:** a finished encyclopedia. Several files are deliberate starters with noted gaps. Nothing here is invented — if the sources do not say it, the note says so.

## Folder map

| Folder | What lives there |
|---|---|
| `00-MOC.md` | Root Map of Content — index to every folder |
| `01-Identity-Offer/` | Who Kasim is; what he sells and his offers |
| `02-Team-People/` | Key people around Kasim (including the unnamed Pareto Talent partner) |
| `03-Company-History/` | Documented company timeline and track record |
| `04-Strategy-Frameworks/` | His frameworks (3X Freedom, Scale vs Non-Scale, Give First…, Dream 100, Problem→Need→Solution) |
| `05-Books-Media/` | YouTube, podcasts, articles, online presence |
| `06-Call-Transcripts/` | Long-form interview material (Scaling in the Age of AI) |
| `07-SOPs/` | Empty placeholder for future standard operating procedures |

## How to navigate

1. **Start at [`00-MOC.md`](00-MOC.md)** — the root map. It links to every folder's `_MOC.md`.
2. **Open the `_MOC.md` in the folder you need.** Each `_MOC.md` is a short index: one line per document inside that folder.
3. **Read the document.** Documents are short, structured summaries — headers, bullets, key quotes.

Think of it as: **root map → folder map → document.**

## Conventions

- **YAML frontmatter on every file.** Fields: `title`, `type` (identity | offer | team | history | framework | media | transcript | sop | moc), `tags`, `source` (which intake file the content came from, or `derived`), and `status` (all `starter` for now).
- **Link as you write.** When a document touches material covered elsewhere, it carries a relative Markdown link (e.g. `[Identity & Bio](identity-bio.md)` or `../04-Strategy-Frameworks/kasim-frameworks.md`). Links are not sprinkled everywhere — only where they genuinely help a reader keep going.
- **Source attribution.** The `source` frontmatter field tells you which intake file a document was built from. `derived` means it is navigation/meta content (README, MOCs).
- **Never invent.** Facts, numbers, names, dates, and prices that are not in the intake files are omitted, or explicitly marked as not in the sources.

## Source material (the intake)

- `textWeb.md` — Kasim's authority hub: identity, bio, track record, companies, services, offers, testimonials, media list, online presence, FAQ.
- `trasnscription.md` — raw transcript of Kasim's interview ("Scaling in the Age of AI" / direct mail / Dream 100 / Scale vs Non-Scale).
- `KasimFrameworks.md` — structured summary of his frameworks.
- `links.md` — two source links (YouTube video + kasimaslam.com).

## Note to the next Right Hand

This brain is intentionally a **starter**. When you pick it up:

1. Read this file, then `00-MOC.md`.
2. Trust the frontmatter `source` field — if you need to verify a claim, go back to the intake file named there.
3. Grow it: add people as they are named, expand the company history as you learn it, drop new transcripts into `06-Call-Transcripts/`, and start writing SOPs in `07-SOPs/`. Update the folder `_MOC.md` whenever you add a file — the maps are the navigation spine.
