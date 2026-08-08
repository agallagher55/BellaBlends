# Bella Blends

A static website for a handmade dog treats storefront: browse a product
catalog and view details for each treat. No backend yet — product data is
served from a local JSON file.

## Project Structure

```
data/
  products.json        product catalog
html/
  index.html            home page with featured treats
  shop.html             full catalog with category filters
  product-detail.html   single product view
static/
  js/
    script.js            home page logic
    shop.js               shop/catalog logic
    product-detail.js     product detail logic
  styles/
    styles.css            shared styles
```

## Running locally

The pages fetch `data/products.json` at runtime, which requires an HTTP
server (opening the HTML files directly via `file://` will fail due to
browser CORS restrictions on local fetches).

From the project root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/html/index.html`.

## Roadmap

See `todo.txt` for planned features.
