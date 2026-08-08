const DATA_URL = "../data/products.json";

function productCardHtml(product) {
  return `
    <a class="product-card" href="product-detail.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <span class="product-name">${product.name}</span>
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
    </a>
  `;
}

async function loadFeaturedProducts() {
  const grid = document.getElementById("featured-grid");
  try {
    const response = await fetch(DATA_URL);
    const products = await response.json();
    const featured = products.filter((product) => product.featured);
    grid.innerHTML = featured.map(productCardHtml).join("");
  } catch (error) {
    grid.innerHTML = `<p class="error-state">Couldn't load treats right now.</p>`;
  }
}

loadFeaturedProducts();
