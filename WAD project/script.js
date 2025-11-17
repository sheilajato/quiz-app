// Example API: Crypto prices
const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

let data = [];

// Fetch Data
async function loadData() {
  const res = await fetch(API_URL);
  const json = await res.json();

  // Format simple data
  data = [
    { name: "BTC", value: json.bpi.USD.rate_float },
    { name: "GBP", value: json.bpi.GBP.rate_float },
    { name: "EUR", value: json.bpi.EUR.rate_float }
  ];

  renderTable(data);
  renderKPIs();
  renderChart();
}

loadData();

// Render Table
function renderTable(list) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  list.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.value.toFixed(2)}</td>
      </tr>
    `;
  });
}

// KPI values
function renderKPIs() {
  document.getElementById("totalValue").innerText = data.length;
  document.getElementById("catAValue").innerText = data[0].value.toFixed(2);
  document.getElementById("catBValue").innerText = data[1].value.toFixed(2);
}

// Chart.js
function fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderTable(data);
    renderKPIs();
    renderChart();
  });


// Search Filter
document.getElementById("search").addEventListener("keyup", (e) => {
  const text = e.target.value.toLowerCase();

  const filtered = data.filter(item => 
    item.name.toLowerCase().includes(text)
  );

  renderTable(filtered);
});

// Reset Button
document.getElementById("resetBtn").onclick = () => {
  document.getElementById("search").value = "";
  renderTable(data);
};