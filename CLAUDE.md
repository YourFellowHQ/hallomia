# Yourfellow HQ — Hallo Mia site

## Belangrijk: tijdelijke preview-link-fix (vóór upload verwijderen!)
In `assets/site-hm.js` staat onderaan een blok `previewLinkFix` (gemarkeerd met
">>> VERWIJDER DIT BLOK vóór het uploaden <<<"). Dat plakt in de preview
`index.html` achter elke map-link, zodat navigeren werkt in dit voorvertoning-venster.

**Op de live site (GitHub Pages) is dit NIET nodig** — die opent `mia/` vanzelf als
`mia/index.html`. Dus: zodra de gebruiker klaar is om te uploaden, dit `previewLinkFix`-blok
uit `assets/site-hm.js` verwijderen om strakke URL's (`/mia/`) te behouden.

## Structuur
- Statische site, clean-URL mappenstructuur (elke sectie = map met `index.html`).
- Gedeelde stijl: `assets/site.css`. Gedeelde nav/footer: `assets/site-hm.js`.
- Hero-typmachine: `assets/mia-type.js`.
- Eén (witte/lichte) versie per pagina: elke sectie is een map met alleen nog `index.html`,
  de witte uitvoering. De oude donkere versie en de losse `index-light.html`-varianten zijn
  vervallen — de hele site is nu één wit geheel met nette URL's (`/mia/`, `/prijzen/`, ...).
- Wordt via GitHub (repo YourFellowHQ/hallomia) op GitHub Pages gehost.

## SEO (handmatig, geen RankMath — statische site)
- Domein: **https://hallomia.ai/**. Elke pagina heeft in de `<head>` (na de site.css-link):
  meta description, `<link rel="canonical">`, robots, Open Graph + Twitter-tags. Deelafbeelding:
  `assets/og-image.png` (1200×630); logo: `assets/logo.png` (512×512).
- JSON-LD: Organization + WebSite op `index.html`; SoftwareApplication + 3 Offers op `prijzen/`;
  FAQPage op `vragen/`; Blog op `blog/` en BlogPosting op elke `blog/<slug>/`. Bij prijswijziging → de Offer-prijzen in de JSON-LD op prijzen bijwerken.
- `sitemap.xml` + `robots.txt` staan in de root. **Bij een nieuwe pagina:** voeg een `<url>` toe
  aan `sitemap.xml` én plak het meta-blok in de `<head>` van die pagina.
- De homepage (`index.html`) is de witte versie met de vloeiende hero → “Maak kennis met Mia”-overgang.
  `over-ons/index-print.html` is alleen voor PDF-print; niet bedoeld om te indexeren/deployen.
- **Blog**: `blog/index.html` is de blog-overzichtspagina; elke post is `blog/<slug>/index.html` (diepte 2).
  Gedeelde artikel-/indexstijl: `assets/blog.css`. Posts zijn gegenereerd uit Markdown. `assets/site-hm.js`
  is depth-aware (`data-depth="2"` op posts) zodat nav/footer/brand-links vanaf diepte 2 kloppen.
  Nav-volgorde: … Prijzen · **Blog** · Vragen … (in `site-hm.js`).
