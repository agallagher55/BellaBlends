const DATA_URL = "../data/products.json";

const CATEGORY_BLURBS = {
  "Baked Biscuits":
    "Oven-baked and crunchy, great for everyday rewards and training.",
  "Dehydrated Treats":
    "Slow-dried, often single-ingredient, and gentle on sensitive stomachs.",
  "Soft Chews":
    "Soft and chewy, easy on puppy and senior teeth alike.",
};

function categoryCardHtml(category, count) {
  const blurb =
    CATEGORY_BLURBS[category] || "A tasty lineup of treats your dog will love.";
  return `
    <div class="market-card">
      <h3 class="market-name">${category}</h3>
      <div class="market-meta">${count} treat${count === 1 ? "" : "s"}</div>
      <p class="market-description">${blurb}</p>
      <a class="btn btn-outline" href="shop.html?category=${encodeURIComponent(category)}">
        View ${category}
      </a>
    </div>
  `;
}

async function loadCategories() {
  const list = document.getElementById("category-list");
  try {
    const response = await fetch(DATA_URL);
    const products = await response.json();

    const counts = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    const categories = Object.keys(counts).sort();
    list.innerHTML = categories.length
      ? categories.map((category) => categoryCardHtml(category, counts[category])).join("")
      : `<p class="empty-state">No product categories yet.</p>`;
  } catch (error) {
    list.innerHTML = `<p class="error-state">Couldn't load product info right now.</p>`;
  }
}

loadCategories();
