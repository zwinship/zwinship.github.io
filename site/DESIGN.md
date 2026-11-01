# DESIGN.md

Direction for zwinship.github.io, transcribed from Zach's answers (Nov 2026). The site is filtered with
[anti-slop](https://github.com/miqdadbadjuber/anti-slop); this file is the direction that filter sits on.

## Identity

- Mood: cartographic, like a well-made city atlas or planning document. Precise, quiet, plenty of white space.
- Spatial interest is the core of Zach's work (urban and transportation economics, boundary designs on street
  networks), so the one piece of visual identity is a real street map.
- Audience: recruiters, academics and peers who want to find research, software, CV and contact quickly.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

## Palette

| Role | Value | Why |
|---|---|---|
| Paper | `#FAF8F3` | warm white, reads as printed map paper rather than a screen default |
| Ink | `#1B1A17` | near-black text, softer than pure black on warm paper |
| Ink 2 | `#5E5951` | secondary text (6.5:1 on paper, 6.0:1 on the software band) |
| Rule | `#D8D2C6` | hairlines and map streets |
| Accent | `#57068C` | NYU violet. Used for the congestion-zone boundary on the map, link underlines on hover, and the current nav item. Nowhere else. |

Light only. Reason: the identity is printed paper and ink; a dark map would be a different object.

## Type

- Headings: Instrument Sans (variable). Grotesks are the convention for map labels; its slightly narrow
  widths set titles and labels compactly.
- Text: Newsreader (variable). Built for long reading on screens; gives paragraphs an academic register.
- Code: the system monospace stack, only inside real code samples.
- No wide-tracked uppercase labels, except street labels on the map (cartographic convention).

## Motif

The map: Midtown Manhattan's street network from NYC's street centerline file, drawn in hairlines, with
60th Street (the northern edge of the congestion relief zone in NBER WP 35414) as the single violet line.
The violet line is the only place the accent appears at full strength.

## Motion

Hover states, and one height transition when a project row opens. The boundary line draws once on load
(skipped under reduced motion). No loops, no scroll-triggered fades.
