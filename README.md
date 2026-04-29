# Alix Chaput Architecture

Portfolio website for the architect Alix Chaput.

**→ Live site:** https://ohchanwu.github.io/AlixChaputArchitecture/

## About this project

This was my first real web project, built in mid-2025. I wrote the HTML, CSS, and JavaScript by hand — no frameworks, no build step, no dependencies — as a deliberate practice exercise.

## Features

- **Light / dark mode** toggle
- **Seven project pages**, each with its own image gallery
- **Responsive navigation** — main nav bar on desktop, hamburger menu on smaller screens
- **Custom typography** using Bahnschrift, DIN Pro, and Fenwick

## Stack

Plain HTML, CSS, and vanilla JavaScript. Hosted on GitHub Pages.

## What I learned

- **WebP isn't a free win for photos.** Converting JPEGs to WebP can produce _larger_ files for photographic content — I discovered this only after a bulk conversion bloated the repo.
- **Safari renders subtly differently from Chrome.** A layout glitch that surfaced only in Safari pushed me to make cross-browser testing part of the regular loop, not a final-pass check.
- **Image weight is where the real perf gains are.** What design tools export is usually far heavier than what should ship; resizing and compressing images is essential.
- **Cut scope when the cost outweighs the payoff.** The site was originally planned as bilingual — `/en/` still holds the partial English version. Alix and I decided late that translating everything wasn't worth the effort for this audience, so the live site ships in French only.

## License

© Alix Chaput Architecture. All rights reserved.

This is client work, published here as a portfolio piece. The code, design, written content, and project imagery are not licensed for reuse.
