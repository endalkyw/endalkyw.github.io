# Endalk Y. Gebru

Personal academic website: https://endalkyw.github.io

A static, responsive, single-page site. HTML contains all content; a small vanilla
JavaScript file adds the figure lightbox. No build step or third-party dependencies.
The desktop layout pairs a sticky profile sidebar with a research-first reading
column. Serif headings and muted green accents sit on a warm white background.
Publications use compact venue/content rows, followed by project rows with figures
beside the descriptions and education/experience. On phones the profile moves above the content
and entries stack. The top navigation scrolls to sections and highlights the
current section, including the final section at the bottom of the page.
Project previews retain hover and enlargement behavior without surrounding cards.

- `index.html`: profile, five publications/manuscripts, experience, education, and twelve projects.
- `main.css`: responsive layout, hover/focus states, reduced-motion and print styles.
- `site.js`: scroll-position navigation and accessible native-dialog figure viewer
  (zoom, full-size links, keyboard navigation, Escape, backdrop, focus restoration).
- `images/avatar.png`: existing profile picture, unchanged.
- `images/projects/`: project figures and explicitly labeled placeholders for upcoming figures.
- `images/projects/sources/`: the ten supplied PNGs, preserved unchanged.
- `Endalk_Gebru_CV.pdf`: downloadable CV.

## Adding project figures

Every project is present in the HTML even without JavaScript. Replace a placeholder
with the real figure when ready. SVG, PNG, JPEG, and WebP work:

1. Save the figure in `images/projects/` using the matching project slug below.
2. In that project's `.figure-preview` link in `index.html`, update both `href`
   and the child image's `src` to the figure path. The link can point to a higher
   resolution image than the thumbnail if desired.
3. Replace the image `alt` text and link `data-caption` with a description of the
   real figure. Remove the "Figure coming soon" wording for that project.
4. Add `has-figure` to the project's article class for a larger preview, and set
   the image's natural `width` and `height` plus `loading="lazy"`.
5. Update the section's coming-soon note once all figures are available.

The supplied figures map to HISIM/chiplet optimization, 94 GHz PA/LNA design,
Nanohmics readout layout, logic locking, and the biquad filter. The two composite
SVGs embed the original PNGs without redrawing or modifying the scientific data:

- `logic-locking-figures.svg`: a 2×2 plate; unlocked left (`xor_c880_1.png`
  above `xor_c880_3.png`), locked right (`xor_c880_2.png` above `xor_c880_4.png`).
  This ordering is inferred from the added graph nodes and waveform differences.
- `biquad-filter-figures.svg`: `filter.png` and `ota.png` on the left,
  `response.png` on the right.

| Project | Figure basename |
| --- | --- |
| Chiplet-based GPT-2 inference | `chiplet-gpt2` |
| 94 GHz PA and LNA | `rf-pa-lna` |
| Diffusion models | `diffusion-ood` |
| Readout IC layout automation | `roic-layout` |
| Logic locking | `logic-locking` |
| Biquad filter | `biquad-filter` |
| Static timing analysis | `static-timing` |
| FastPlace | `fastplace` |
| Floorplanning | `floorplanning` |
| Visible light communication thesis | `visible-light` |
| Microprocessor | `microprocessor` |
| FinFET lookup tables | `finfet-lut` |

The project list combines the latest CV, the earlier CV's biquad project, the
undergraduate thesis, and the original site's FinFET lookup-table work. The HISIM
workload-mapping entry and the updated chiplet optimization entry are the same
project and appear once. Manuscripts retain their supplied submission status.

## Logo sources

Logos identify former/current affiliations, not endorsements. Existing University
of Minnesota and Addis Ababa University assets are retained from this repository.
McGill's reverse logo is displayed on a dark background without recoloring it.

- Cadence: https://commons.wikimedia.org/wiki/File:Cadence-Logo.svg
  (Cadence Design Systems; public-domain text logo, trademark retained).
- McGill: https://www.mcgill.ca/sites/all/themes/coltrane19/dist/mcgill-logo-red-reverse.db74b099.svg
  (official university website asset, unchanged).

## Preview and publishing

Serve this directory with any static HTTP server, for example
`python -m http.server 8000`, then visit http://localhost:8000.
GitHub Pages publishes pushes to `main`.
