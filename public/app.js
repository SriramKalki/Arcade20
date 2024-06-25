const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const productList = document.getElementById('product-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const price = parseFloat(priceInput.value);
  const quantity = parseInt(quantityInput.value);

  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, quantity }),
  });

  const product = await response.json();
  addProductToDOM(product);

  nameInput.value = '';
  priceInput.value = '';
  quantityInput.value = '';
});

async function fetchProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  products.forEach(addProductToDOM);
}

function addProductToDOM(product) {
  const li = document.createElement('li');
  li.textContent = `${product.name}: $${product.price.toFixed(2)} (Quantity: ${product.quantity})`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async () => {
    await fetch(`/api/products/${product._id}`, {
      method: 'DELETE',
    });
    li.remove();
  });

  li.appendChild(deleteButton);
  productList.appendChild(li);
}

fetchProducts();
