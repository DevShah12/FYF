document.addEventListener("DOMContentLoaded", function () {
    const manageOrdersBtn = document.getElementById('manage-orders');
    const manageProductsBtn = document.getElementById('manage-products');
    const manageUsersBtn = document.getElementById('manage-users');

    const ordersSection = document.getElementById('orders-section');
    const productsSection = document.getElementById('products-section');
    const usersSection = document.getElementById('users-section');

    // Sample data for orders, products, and users (this would be dynamic in a real application)
    const orders = [
        { orderId: 1, userName: "John Doe", productName: "T-shirt", price: "$29.99", status: "Shipped" },
        { orderId: 2, userName: "Jane Smith", productName: "Jeans", price: "$49.99", status: "Processing" },
    ];

    const products = [
        { productId: 1, name: "T-shirt", price: "$19.99", stock: 50 },
        { productId: 2, name: "Jeans", price: "$39.99", stock: 30 },
    ];

    const users = [
        { userId: 1, name: "John Doe", email: "john@example.com" },
        { userId: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    // Render Orders in the table
    function renderOrders() {
        const ordersTableBody = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
        ordersTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = ordersTableBody.insertRow();
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.userName}</td>
                <td>${order.productName}</td>
                <td>${order.price}</td>
                <td>${order.status}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
        });
    }

    // Render Products in the table
    function renderProducts() {
        const productsTableBody = document.getElementById('products-table').getElementsByTagName('tbody')[0];
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const row = productsTableBody.insertRow();
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
        });
    }

    // Render Users in the table
    function renderUsers() {
        const usersTableBody = document.getElementById('users-table').getElementsByTagName('tbody')[0];
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = usersTableBody.insertRow();
            row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
        });
    }

    // Switch between the different sections of the Admin Dashboard
    manageOrdersBtn.addEventListener('click', function () {
        ordersSection.style.display = 'block';
        productsSection.style.display = 'none';
        usersSection.style.display = 'none';
    });

    manageProductsBtn.addEventListener('click', function () {
        ordersSection.style.display = 'none';
        productsSection.style.display = 'block';
        usersSection.style.display = 'none';
    });

    manageUsersBtn.addEventListener('click', function () {
        ordersSection.style.display = 'none';
        productsSection.style.display = 'none';
        usersSection.style.display = 'block';
    });

    // Initialize the dashboard by showing the Orders section
    manageOrdersBtn.click();

    // Render the data in the tables
    renderOrders();
    renderProducts();
    renderUsers();
});
