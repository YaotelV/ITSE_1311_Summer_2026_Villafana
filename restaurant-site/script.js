var DRINK_ITEMS = [
    { name: "Milk", description: "Animal and Human Friendly! Available Hot or Cold.", price: "2.0", categories: ["Breakfast"] },
    { name: "Custom Smoothie", description: "Animal and Human Friendly! Choose from any fruits available!", price: "3.5", categories: ["Breakfast", "Lunch", "Dinner"] },
    { name: "Tea", description: "Available Hot or Iced. Choose from any of our available teas! Available Caffeine Free.", price: "3.5", categories: ["Breakfast", "Lunch", "Dinner"] },
    { name: "Hot Chocolate", description: "Human Friendly only!", price: "3.5", categories: ["Breakfast"] },
    { name: "Coffee", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", categories: ["Breakfast", "Lunch"] },
    { name: "Cappucino", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", categories: ["Breakfast", "Lunch"] },
    { name: "Americano", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", categories: ["Breakfast", "Lunch"] },
    { name: "Latte", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", categories: ["Breakfast", "Lunch"] },
    { name: "Matcha", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", categories: ["Breakfast", "Lunch"] },
    { name: "Apple Juice", description: "Animal and Human Friendly!", price: "2.0", categories: ["Breakfast", "Lunch", "Dinner"] },
    { name: "Watermelon Agua Fresca", description: "Animal and Human Friendly!", price: "2.0", categories: ["Breakfast", "Lunch", "Dinner"] }
];

var FOOD_ITEMS = [
    { name: "Peanut Butter Apple Cake Slice", description: "Animal and Human Friendly!", price: "2.99", categories: ["Breakfast"] },
    { name: "Apple Spice Cupcake", description: "Animal and Human Friendly!", price: "1.5", categories: ["Breakfast"] },
    { name: "Blueberry Muffin", description: "Animal and Human Friendly!", price: "1.0", categories: ["Breakfast"] },
    { name: "Sweet Potato Cupcake", description: "Animal and Human Friendly!", price: "1.0", categories: ["Breakfast"] },
    { name: "Zucchini Chicken Bread Slice", description: "Animal and Human Friendly!", price: "2.5", categories: ["Lunch", "Dinner"] },
    { name: "Bacon Cheddar Sandwich", description: "Animal and Human Friendly!", price: "5.0", categories: ["Lunch", "Dinner"] },
    { name: "Grilled Chicken Sandwich", description: "Animal and Human Friendly!", price: "5.0", categories: ["Lunch", "Dinner"] }
];


function formatUSD(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(Number(value));
}



const categoryFilter = document.getElementById("categoryFilter");
if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
        const selected = this.value;
        buildDrinksMenu(filterItems(DRINK_ITEMS, selected));
        buildFoodMenu(filterItems(FOOD_ITEMS, selected));
    });
}

function filterItems(items, category) {
    if (category === "All") return items;
    return items.filter(item => item.categories.includes(category));
}



function buildDrinksMenu(data) {
    const table = document.getElementById("DrinksTable");
    if (!table) return;

    table.innerHTML = "";

    data.forEach(item => {
        const row = `
        <tr>
            <td>
                ${item.name}<br>
                <label>Qty:</label>
                <select class="qtySelect" data-name="${item.name}" data-price="${item.price}">
                    ${[1,2,3,4,5].map(q => `<option value="${q}">${q}</option>`).join("")}
                </select>
                <button class="addToCartBtn btn btn-sm btn-primary mt-2"
                        data-name="${item.name}"
                        data-price="${item.price}">
                    Add
                </button>
            </td>
            <td>${item.description}</td>
            <td>${formatUSD(item.price)}</td>
            <td>${item.categories.join(", ")}</td>
        </tr>`;

        table.innerHTML += row;
    });

    attachCartEvents();
}

function buildFoodMenu(data) {
    const table = document.getElementById("FoodTable");
    if (!table) return;

    table.innerHTML = "";

    data.forEach(item => {
        const row = `
        <tr>
            <td>
                ${item.name}<br>
                <label>Qty:</label>
                <select class="qtySelect" data-name="${item.name}" data-price="${item.price}">
                    ${[1,2,3,4,5].map(q => `<option value="${q}">${q}</option>`).join("")}
                </select>
                <button class="addToCartBtn btn btn-sm btn-primary mt-2"
                        data-name="${item.name}"
                        data-price="${item.price}">
                    Add
                </button>
            </td>
            <td>${item.description}</td>
            <td>${formatUSD(item.price)}</td>
            <td>${item.categories.join(", ")}</td>
        </tr>`;

        table.innerHTML += row;
    });

    attachCartEvents();
}


buildDrinksMenu(DRINK_ITEMS);
buildFoodMenu(FOOD_ITEMS);


function attachCartEvents() {
    const buttons = document.querySelectorAll(".addToCartBtn");

    buttons.forEach(btn => {
        btn.onclick = function () {
            const name = this.dataset.name;
            const price = Number(this.dataset.price);

            const qtySelect = document.querySelector(`.qtySelect[data-name="${name}"]`);
            const quantity = Number(qtySelect.value);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        };
    });
}


const reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
    reservationForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const errors = [];

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const partySize = document.getElementById("partySize").value.trim();
        const date = document.getElementById("date").value.trim();
        const time = document.getElementById("time").value.trim();
        const seating = document.getElementById("seating").value.trim();
        const dietaryNotes = document.getElementById("dietaryNotes").value.trim();
        const newsletter = document.getElementById("newsletter").checked;

        if (name.length < 2) errors.push("Name must be at least 2 characters.");
        if (!email.includes("@") || !email.includes(".")) errors.push("Email must be a valid email address.");
        if (isNaN(partySize) || Number(partySize) < 1) errors.push("Party size must be at least 1.");
        if (!date) errors.push("Please select a reservation date.");
        if (!time) errors.push("Please select a reservation time.");
        if (!seating) errors.push("Please choose a seating option.");

        const alertContainer = document.getElementById("alertContainer");
        alertContainer.innerHTML = "";

        if (errors.length > 0) {
            const alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.innerHTML = "<strong>Please fix the following errors:</strong><br>" + errors.join("<br>");
            alertContainer.appendChild(alert);
            return;
        }

        const reservation = {
            name,
            email,
            partySize: Number(partySize),
            date,
            time,
            seating,
            dietaryNotes,
            newsletter
        };

        console.log("Reservation Submitted:", reservation);

        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success";
        successAlert.innerHTML = "Reservation submitted successfully!";
        alertContainer.appendChild(successAlert);
    });
}


renderCart();

function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartContainer");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <p class="text-center" style="font-family: Patrick Hand; color: rgb(15,179,197); font-size: 22px;">
                Your cart is empty.
            </p>
        `;
        return;
    }

    let subtotal = 0;

    let html = `
        <table class="table table-bordered bg-white">
            <thead class="table-dark">
                <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Line Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        html += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${lineTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    const taxRate = 0.0825;
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + tax;

    html += `
            </tbody>
        </table>

        <div class="mt-3" style="font-family: Patrick Hand; color: rgb(15,179,197); font-size: 22px;">
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            <p><strong>Tax (8.25%):</strong> $${tax.toFixed(2)}</p>
            <p><strong>Total:</strong> $${finalTotal.toFixed(2)}</p>
        </div>
    `;

    container.innerHTML = html;
}


const cancelBtn = document.getElementById("cancelOrder");
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById("cancelModal"));
        modal.show();
    });
}

const confirmCancelBtn = document.getElementById("confirmCancel");
if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");

        const thankModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
        thankModal.show();

        setTimeout(() => {
            thankModal.hide();
            window.location.href = "../restaurant-site/menu.html";
        }, 2000);
    });
}

const submitBtn = document.getElementById("submitOrder");
if (submitBtn) {
    submitBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");

        const thankModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
        thankModal.show();

        setTimeout(() => {
            thankModal.hide();
            window.location.href = "../restaurant-site/menu.html";
        }, 2000);
    });
}
