// ==========================================================
// cart.js
// Core Cart Business Logic & DOM Manipulation
// ==========================================================

// --- TESTABLE CORE BUSINESS LOGIC ---

/**
 * Calculates the total cost of all items in the cart array.
 * This is the function you should target for your Jest unit tests.
 * @param {Array<{price: number, quantity: number}>} items - List of cart items.
 * @returns {number} The calculated grand total.
 */
export function calculateGrandTotal(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return 0; 
    }
    
    const total = items.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);
    
    return parseFloat(total.toFixed(2));
}


// --- CART DATA MANAGEMENT ---

/**
 * Retrieves the cart from Local Storage.
 * @returns {Array} The cart array.
 */
export function getCart() {
    return JSON.parse(localStorage.getItem('FYF_cart')) || [];
}

/**
 * Saves the cart to Local Storage.
 * @param {Array} cart - The cart array to save.
 */
function saveCart(cart) {
    localStorage.setItem('FYF_cart', JSON.stringify(cart));
}

/**
 * Adds a product to the cart or updates its quantity.
 * This is called by buttons on the product pages.
 * @param {string} id 
 * @param {string} name 
 * @param {number} price 
 */
export function addItemToCart(id, name, price) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    const numericPrice = parseFloat(price);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ id, name, price: numericPrice, quantity: 1 });
    }

    saveCart(cart);
    alert(`${name} added to cart!`);
    updateCartIconCount();
}

/**
 * Updates an item's quantity in the cart.
 */
function updateItemQuantity(id, newQuantity) {
    if (newQuantity < 1) return;
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        renderCart(); // Re-render the cart to update totals
    }
}

/**
 * Removes an item from the cart.
 */
function removeItemFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

/**
 * Clears the entire cart.
 */
function clearCart() {
    localStorage.removeItem('FYF_cart');
    renderCart();
    updateCartIconCount();
}


// --- DOM RENDERING & EVENT HANDLERS ---

/**
 * Updates the quantity displayed next to the cart icon in the header.
 */
export function updateCartIconCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countElements = document.querySelectorAll('#cart-count'); 
    countElements.forEach(element => {
        element.textContent = totalItems;
    });
}

/**
 * Renders the cart data on the cart.html page.
 */
function renderCart() {
    const cart = getCart();
    const tableBody = document.querySelector('#cart-table tbody');
    // ... (elements needed for rendering)

    if (!tableBody) return; // Only run if on cart.html

    const grandTotalElement = document.getElementById('grand-total');
    const totalItemsElement = document.getElementById('total-items');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    tableBody.innerHTML = ''; 

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        document.getElementById('cart-table').style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'none';
        grandTotalElement.textContent = '$0.00';
        totalItemsElement.textContent = '0';
        return;
    }

    emptyMessage.style.display = 'none';
    document.getElementById('cart-table').style.display = 'table';
    document.querySelector('.cart-summary').style.display = 'flex';


    cart.forEach(item => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       data-id="${item.id}" class="quantity-input" style="width: 50px;">
            </td>
            <td>$${subtotal}</td>
            <td><button class="remove-item-btn" data-id="${item.id}">Remove</button></td>
        `;
    });

    const grandTotal = calculateGrandTotal(cart);
    grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalItemsElement.textContent = totalItems;
    
    attachCartListeners();
}

/**
 * Attaches event listeners for cart interaction on the cart.html page.
 */
function attachCartListeners() {
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            const newQuantity = parseInt(e.target.value);
            updateItemQuantity(id, newQuantity);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeItemFromCart(id);
        });
    });

    document.getElementById('checkout-button')?.addEventListener('click', () => {
        alert('Proceeding to checkout! (PHP backend interaction is required here)');
    });
    
    document.getElementById('clear-cart-button')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your entire cart?')) {
            clearCart();
        }
    });
}

// Initialization for cart.html
if (document.querySelector('.cart-container')) {
    document.addEventListener('DOMContentLoaded', renderCart);
}

// We don't initialize the product listeners here, they belong in script.js
// so that script.js can import and use addItemToCart.