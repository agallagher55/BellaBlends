# Bella Blends

A website for a handmade dog treats storefront: browse a product catalog
and view details for each treat. Product data is served from a local JSON
file; there's no database or order processing yet.

## Project Structure

```
backend/
  server.py              static file server with friendly routes
  start-server.bat        double-click launcher (Windows)
data/
  products.json          product catalog
  markets.json            upcoming markets/pop-up events
html/
  index.html              home page with featured treats
  shop.html                full catalog with category filters
  product-detail.html      single product view
  products.html             product info: categories and ingredients
  markets.html             upcoming markets
  about.html               about page
static/
  images/                 product/site photos
  js/
    script.js               home page logic
    shop.js                  shop/catalog logic
    product-detail.js        product detail logic
    products-info.js         products info page logic
    markets.js               markets page logic
  styles/
    styles.css               shared styles
```

## Running locally

The pages fetch `data/products.json` at runtime, which requires an HTTP
server (opening the HTML files directly via `file://` will fail due to
browser CORS restrictions on local fetches).

From the project root:

```bash
python3 backend/server.py
```

Or on Windows, double-click `backend/start-server.bat`.

Then visit `http://localhost:8000/`. `/shop`, `/product/<id>`,
`/products`, `/markets`, and `/about` also work as friendly URLs. See
`backend/ROUTES.md` for the full list.

Alternatively, `python3 -m http.server 8000` also works for plain static
serving, but you'll need to use paths like
`http://localhost:8000/html/index.html` directly.

## Deploying (Render)

This repo includes a `render.yaml` Blueprint for [Render](https://render.com):

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. In the Render dashboard, click **New +** → **Blueprint**.
3. Connect your GitHub account/repo and select `BellaBlends`. Render will
   detect `render.yaml` automatically.
4. Confirm the plan (Free) and click **Apply** to create the service.

No build step or dependencies are required - `render.yaml` just runs
`python3 backend/server.py`, which already reads the `PORT` environment
variable Render provides.

Note: the free plan spins the service down after ~15 minutes of
inactivity, so the first request after a lull can take 30-50 seconds to
wake back up. Fine for sharing a low-traffic demo link, not ideal for a
snappy live demo.

## Roadmap

See `todo.txt` for planned features.
