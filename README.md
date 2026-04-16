# Yoga with Suyal Website

Responsive static website for a yoga instructor offering:
- Online and offline classes
- 3-day model (Mon-Wed-Fri or Tue-Thu-Sat)
- 5-day model (Mon-Fri)
- Weekend-only model (Sat-Sun)

## Project Structure

- `index.html` - main website page
- `404.html` - custom not found page
- `assets/css/styles.css` - site styling and responsive layout
- `assets/js/main.js` - nav, dynamic programs UI, and CTA sync
- `assets/js/form.js` - inquiry form validation + mailto submission
- `robots.txt` and `sitemap.xml` - basic SEO files
- `netlify.toml` - deployment config for Netlify

## Local Preview

Use any static server from this directory. Example:

```bash
python3 -m http.server 5500
```

Then open `http://localhost:5500`.

## Manual Inquiry Flow

The contact form validates required fields, then opens a prefilled email draft to:

`hello@yogawithsuyal.com`

This matches manual booking mode (no payment gateway/backend).

## Customization Checklist

- Update business name, phone, email, and studio address in `index.html`
- Update session prices and details in `assets/js/main.js`
- Replace canonical URL in `index.html`, `robots.txt`, and `sitemap.xml`
- Optionally replace Google Fonts and color variables in `assets/css/styles.css`

## Deploy (Netlify)

1. Create a new site from this folder
2. Build command: _(leave blank for static site)_
3. Publish directory: `.`
4. Deploy

After deployment:
- Set your final custom domain
- Update canonical/sitemap/robots URLs to the final domain
