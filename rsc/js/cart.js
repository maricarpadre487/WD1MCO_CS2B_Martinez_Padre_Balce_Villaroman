// simple add to cart (saved in localStorage so it stays when you refresh)
let cart = JSON.parse(localStorage.getItem("hxhCart")) || [];
function save() {
  localStorage.setItem("hxhCart", JSON.stringify(cart));
  render();
}
function render() {
  const body = document.getElementById("cartBody");
  let total = 0,
    qty = 0;
  body.innerHTML = cart.length ? "" : "<p>Your cart is empty.</p>";
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    qty += item.qty;
    body.innerHTML += `<div class="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>${item.name}<br><small>PHP ${item.price} x ${item.qty}</small></div>
      <div><button class="btn btn-sm btn-secondary" onclick="chg(${i},-1)">-</button>
      <button class="btn btn-sm btn-secondary" onclick="chg(${i},1)">+</button></div></div>`;
  });
  document.getElementById("count").textContent = qty;
  document.getElementById("total").textContent = total;
}
function chg(i, n) {
  cart[i].qty += n;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save();
}
document.querySelectorAll(".add").forEach((btn) =>
  btn.addEventListener("click", () => {
    const name = btn.dataset.name,
      price = Number(btn.dataset.price);
    const found = cart.find((c) => c.name === name);
    if (found) found.qty++;
    else cart.push({ name, price, qty: 1 });
    save();
  }),
);
document.getElementById("clear").onclick = () => {
  cart = [];
  save();
};
document.getElementById("checkout").onclick = () => {
  if (cart.length) {
    alert("Thank you! (This is just a school project, no real payment)");
    cart = [];
    save();
  }
};
render();
