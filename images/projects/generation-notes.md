# Project image updates

Generated with the built-in imagegen tool on 2026-10-10.

## HISIM heading edit

The website uses `hisim-clean.svg`. It embeds the original supplied PNG and
overlays only the upper-right heading region from the edited image. The rest of
the original scientific figure remains unchanged. The supplied original remains
in `sources/HISIM.png`.

Prompt:

Use case: precise-object-edit. Edit target: the supplied HISIM scientific slide. Remove ONLY the red heading 'Design Space latency' at the upper right, replacing those text pixels with plain white background. Preserve the exact original dimensions, composition, all other text, all numerical values, all scientific scatter plot data, diagrams and table content. Do not redraw or reinterpret any other element. The upper-left 'Optimization in different scenarios' heading must remain. The white area where the upper-right heading was should simply be blank.

## Diffusion illustration

`diffusion-ood-illustration.png` is an explanatory illustration, not experimental
results or a depiction of a verified project-specific pipeline.

Prompt:

Use case: scientific-educational. Asset type: a polished landscape 16:9 academic presentation slide, used as a research project figure on a minimal portfolio website. Primary request: a very descriptive, visually compelling conceptual illustration titled 'Diffusion models for out-of-distribution inference'. White background, crisp professional sans-serif typography, charcoal text, muted teal and slate-blue diagrams with restrained amber indicating distribution shift, generous but efficient spacing. Three clearly aligned stages left to right: '1  Training distribution', '2  Distribution shift', '3  Diffusion-based inference'. Stage 1: an elegant schematic feature-space scatter cloud of teal dots inside a light teal contour, with three small generic clean signal/image sample tiles below; caption 'Learn structure from observed samples'. Stage 2: same teal reference contour with a separated amber cluster of new samples outside the training region; a slim arrow bridges distribution gap; caption 'Evaluate inputs beyond the training distribution'. Stage 3: a horizontal sequence of four square image-like tiles transitioning from random noise to a structured smooth grayscale field, with thin arrows indicating iterative denoising; caption 'Explore how learned priors generalize'. Connect the stages with clear restrained arrows. Across lower quarter, a subtle divider and three concise research questions with tiny simple icons: 'What changes under a shift?' / 'Which structure is retained?' / 'When does inference fail?'. Small unobtrusive footer: 'Conceptual project illustration'. This is an explanatory schematic, not experimental results: no numerical metrics, benchmark claims, accuracy curves, fake plots with scales, circuit images or assertions about methods actually used in the project. Use only the exact quoted labels, correctly spelled and legible. Clean slide composition with visual hierarchy, high quality diagrammatic imagery, no logos, no decorative 3D, no title repetition. Render as one finished research-slide illustration.
