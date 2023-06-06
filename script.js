function priceSilver(event) {
  // Update price input with silver color price
  let priceSClickResult = document.querySelector(".price-input");
  priceSClickResult.innerHTML = "699";
}

// Add event listener to silver color button
let priceSClick = document.querySelector("#silver-color");
priceSClick.addEventListener("click", priceSilver);

function priceBlack(event) {
  // Update price input with black color price
  let priceBClickResult = document.querySelector(".price-input");
  priceBClickResult.innerHTML = "R699";
}

// Add event listener to black color button
let priceBClick = document.querySelector("#black-color");
priceBClick.addEventListener("click", priceBlack);

function priceRosegold(event) {
  // Update price input with rosegold color price
  let priceRClickResult = document.querySelector(".price-input");
  priceRClickResult.innerHTML = "899";
}

// Add event listener to rosegold color button
let priceRClick = document.querySelector("#rosegold-color");
priceRClick.addEventListener("click", priceRosegold);

// Get the cart items container
const cartItemsContainer = document.getElementById("cart-items");

// Function to update the order summary
function updateOrderSummary() {
  const cartItems = cartItemsContainer.getElementsByClassName("cart-item");
  let subtotal = 0;

  // Calculate the subtotal
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const totalElement = item.querySelector(".total");
    const total = parseInt(totalElement.textContent);
    subtotal += total;
  }

  // Update the subtotal and total in the order summary
  const subtotalElement = document.querySelector(
    "#orderSummary-display tbody tr:nth-child(1) td:nth-child(2)"
  );
  const totalElement = document.querySelector(
    "#orderSummary-display tbody tr:nth-child(3) td:nth-child(2)"
  );
  const shippingElement = document.getElementById("shipping");

  // Calculate the shipping cost based on the subtotal
  let shippingCost = 0;
  if (subtotal > 0) {
    shippingCost = 100; // Set a default shipping cost
  }

  // Update the shipping cost in the order summary
  shippingElement.textContent = `R${shippingCost}`;

  // Update the subtotal and total in the order summary
  subtotalElement.textContent = `R${subtotal}`;
  totalElement.textContent = `R${subtotal + shippingCost}`;

  // You can add additional logic to calculate shipping based on different conditions

  // Update the order summary
  updateOrderSummary();
}

// Function to add an item to the cart
function addToCart(button) {
  // Get the selected color and price
  const selectedColor = document.querySelector(
    'input[name="color"]:checked'
  ).value;
  const price = parseInt(
    document.querySelector('input[name="color"]:checked').getAttribute("number")
  );

  // Create a new row for the cart item
  const newRow = document.createElement("tr");

  let selectedColorImage = ""; // Variable to store the image source
  if (selectedColor === "silver-brown") {
    selectedColorImage = "images/brown.png";
  } else if (selectedColor === "black-red") {
    selectedColorImage = "images/black.png";
  } else if (selectedColor === "rose gold") {
    selectedColorImage = "images/rose_gold.jpg";
  }

  let productName = document.getElementById("product").textContent;

  newRow.className = "cart-item";
  newRow.innerHTML = `
    <td><img src="${selectedColorImage}" alt="Product Image" class="product-image" /></td>
    <td>${productName}<br/>Colour: ${selectedColor}</td>
    <td>${price}</td>
    <td> 
      <button class="subtract-button" onclick="subtractFromCart(this)">-</button>
     <span class="quantity">1</span>
      <button class="add-button" onclick="addToCartFromCart(this)">+</button>
    </td>
    <td class="total">${price}</td>
    <td><button class="delete-button" onclick="deleteFromCart(this)">x</button></td>
  `;

  // Append the new row to the cart items container
  cartItemsContainer.appendChild(newRow);

  // Update the order summary
  updateOrderSummary();
}

// Call the addToCart() function when the "Add to Cart" button is clicked
document
  .querySelector(".addCart-button")
  .addEventListener("click", function () {});

// Function to subtract an item from the cart
function subtractFromCart(button) {
  const quantityElement = button.parentNode.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  const price = parseInt(button.parentNode.previousElementSibling.textContent);
  const totalElement = button.parentNode.nextElementSibling;
  let total = parseInt(totalElement.textContent);

  if (quantity > 0) {
    quantity--;
    total -= price;
    quantityElement.textContent = quantity;
    totalElement.textContent = total;
  }

  // Update the order summary
  updateOrderSummary();
}

// Function to add an item from the cart
function addToCartFromCart(button) {
  const quantityElement = button.parentNode.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  const priceElement = button.parentNode.previousElementSibling;
  const price = parseInt(priceElement.textContent);
  const totalElement = button.parentNode.nextElementSibling;
  let total = parseInt(totalElement.textContent);

  quantity++;
  total += price;

  quantityElement.textContent = quantity;
  totalElement.textContent = total;

  // Update the order summary
  updateOrderSummary();
}

// Function to delete an item from the cart
function deleteFromCart(button) {
  const row = button.parentNode.parentNode;
  row.remove();
  updateOrderSummary();
}

// Call the updateOrderSummary() function on page load to initialize the order summary
updateOrderSummary();
