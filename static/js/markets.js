const DATA_URL = "../data/markets.json";

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function marketCardHtml(market) {
  return `
    <div class="market-card">
      <div class="market-date">${formatDate(market.date)}</div>
      <h3 class="market-name">${market.name}</h3>
      <div class="market-meta">${market.time}</div>
      <div class="market-meta">${market.location} &mdash; ${market.address}</div>
      <p class="market-description">${market.description}</p>
    </div>
  `;
}

async function loadMarkets() {
  const list = document.getElementById("market-list");
  try {
    const response = await fetch(DATA_URL);
    const markets = await response.json();
    const upcoming = markets
      .filter((market) => new Date(market.date + "T23:59:59") >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    list.innerHTML = upcoming.length
      ? upcoming.map(marketCardHtml).join("")
      : `<p class="empty-state">No upcoming markets right now &mdash; check back soon!</p>`;
  } catch (error) {
    list.innerHTML = `<p class="error-state">Couldn't load markets right now.</p>`;
  }
}

loadMarkets();
