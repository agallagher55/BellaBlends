const DATA_URL = "../data/products.json";

let allProducts = [];
let activeCategory = "All";

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

function renderFilterBar(categories) {
  const filterBar = document.getElementById("filter-bar");
  const allCategories = ["All", ...categories];
  filterBar.innerHTML = allCategories
    .map(
      (category) => `
        <button class="filter-btn${category === activeCategory ? " active" : ""}" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  filterBar.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilterBar(categories);
      renderGrid();
    });
  });
}

function renderGrid() {
  const grid = document.getElementById("product-grid");
  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  grid.innerHTML = filtered.length
    ? filtered.map(productCardHtml).join("")
    : `<p class="empty-state">No treats found in this category.</p>`;
}

async function loadProducts() {
  const grid = document.getElementById("product-grid");
  try {
    const response = await fetch(DATA_URL);
    allProducts = await response.json();
    const categories = [...new Set(allProducts.map((product) => product.category))];
    renderFilterBar(categories);
    renderGrid();
  } catch (error) {
    grid.innerHTML = `<p class="error-state">Couldn't load treats right now.</p>`;
  }
}

loadProducts();
