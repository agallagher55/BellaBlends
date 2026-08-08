const DATA_URL = "../data/products.json";

function getProductIdFromUrl() {
  const queryId = new URLSearchParams(window.location.search).get("id");
  if (queryId) {
    return Number(queryId);
  }

  const pathMatch = window.location.pathname.match(/\/product\/(\d+)/);
  return pathMatch ? Number(pathMatch[1]) : NaN;
}

function productDetailHtml(product) {
  const ingredients = product.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");

  return `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <span class="product-category">${product.category}</span>
        <h1>${product.name}</h1>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <div class="ingredient-list">
          <strong>Ingredients</strong>
          <ul>${ingredients}</ul>
        </div>
      </div>
    </div>
  `;
}

async function loadProduct() {
  const container = document.getElementById("product-detail");
  const productId = getProductIdFromUrl();

  try {
    const response = await fetch(DATA_URL);
    const products = await response.json();
    const product = products.find((item) => item.id === productId);

    container.innerHTML = product
      ? productDetailHtml(product)
      : `<p class="error-state">Treat not found.</p>`;
  } catch (error) {
    container.innerHTML = `<p class="error-state">Couldn't load this treat right now.</p>`;
  }
}

loadProduct();
