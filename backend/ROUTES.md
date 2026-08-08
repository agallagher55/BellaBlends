# Routes

Routes served by `backend/server.py`. All other paths fall through to
`http.server`'s default static file handling (relative to the project
root), so anything under `html/`, `static/`, or `data/` is reachable
directly by its file path too.

| Method | Path              | Description                                                                 |
|--------|-------------------|-------------------------------------------------------------------------------|
| GET    | `/`               | Home page (`html/index.html`)                                                 |
| GET    | `/shop`           | Product catalog with category filters (`html/shop.html`)                     |
| GET    | `/product/<id>`   | Single product view (`html/product-detail.html`). 404s if `<id>` doesn't exist in `data/products.json` |
| GET    | `/products`       | Product info page: categories and ingredient philosophy (`html/products.html`) |
| GET    | `/markets`        | Upcoming markets/pop-up events (`html/markets.html`)                          |
| GET    | `/about`          | About page (`html/about.html`)                                                |
| GET    | `/products.json`  | Product catalog data, served with `Cache-Control: no-store, no-cache, must-revalidate` |

## Notes

- The server is read-only - there are no POST routes yet. Ordering/cart
  endpoints will be documented here once added (see `todo.txt`).
- `/product/<id>` validates the ID against `data/products.json` before
  serving the page; the client-side JS (`static/js/product-detail.js`)
  reads the `id` query param separately to render the product.
