#!/usr/bin/env python3
"""Static file server for the Bella's Blend storefront.

Serves the same files `python3 -m http.server` would, plus friendly
routes for the shop, markets, and product detail pages and a no-cache
endpoint for products.json.
"""

import json
import os
import http.server
import socketserver
from urllib.parse import urlparse

PORT = int(os.environ.get('PORT', 8000))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_FILE = os.path.join(BASE_DIR, 'data', 'products.json')


class StoreHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/':
            self.path = '/html/index.html'
            return super().do_GET()
        if path == '/shop':
            self.path = '/html/shop.html'
            return super().do_GET()
        if path == '/markets':
            self.path = '/html/markets.html'
            return super().do_GET()
        if path == '/products':
            self.path = '/html/products.html'
            return super().do_GET()
        if path == '/about':
            self.path = '/html/about.html'
            return super().do_GET()
        if path == '/products.json':
            return self.serve_products_json()
        if path.startswith('/product/'):
            product_id = path[len('/product/'):]
            if self.find_product(product_id) is not None:
                self.path = '/html/product-detail.html'
                return super().do_GET()
            self.send_error(404, 'Unknown product: ' + product_id)
            return

        return super().do_GET()

    def find_product(self, product_id):
        try:
            with open(PRODUCTS_FILE, 'r') as f:
                products = json.load(f)
        except OSError:
            return None
        for product in products:
            if str(product.get('id')) == product_id:
                return product
        return None

    def serve_products_json(self):
        try:
            with open(PRODUCTS_FILE, 'rb') as f:
                body = f.read()
        except OSError:
            self.send_error(404, 'products.json not found')
            return

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.end_headers()
        self.wfile.write(body)


class StoreServer(socketserver.TCPServer):
    allow_reuse_address = True


def main():
    os.chdir(BASE_DIR)
    with StoreServer(('', PORT), StoreHandler) as httpd:
        print('Serving at http://localhost:%d' % PORT)
        httpd.serve_forever()


if __name__ == '__main__':
    main()
