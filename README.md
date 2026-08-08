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
html/
  index.html              home page with featured treats
  shop.html                full catalog with category filters
  product-detail.html      single product view
static/
  js/
    script.js               home page logic
    shop.js                  shop/catalog logic
    product-detail.js        product detail logic
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

Then visit `http://localhost:8000/`. `/shop` and `/product/<id>` also
work as friendly URLs.

Alternatively, `python3 -m http.server 8000` also works for plain static
serving, but you'll need to use paths like
`http://localhost:8000/html/index.html` directly.

## Roadmap

See `todo.txt` for planned features.
