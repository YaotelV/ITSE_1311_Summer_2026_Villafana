var DRINK_ITEMS = [
{ name: "Milk", description: "Animal and Human Friendly! Available Hot or Cold.", price: "2.0", category: "Breakfast"},
{ name: "Custom Smoothie", description: "Animal and Human Friendly! Choose from any fruits available!", price: "3.5", category: "Breakfast"},
{ name: "Tea", description: "Available Hot or Iced. Choose from any of our available teas! Available Caffeine Free.", price: "3.5", category: "Breakfast"},
{ name: "Hot Chocolate", description: "Human Friendly only!", price: "3.5", category: "Breakfast"},
{ name: "Coffee", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", category: "Breakfast"},
{ name: "Cappucino", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", category: "Breakfast"},
{ name: "Americano", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", category: "Breakfast"},
{ name: "Latte", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", category: "Breakfast"},
{ name: "Matcha", description: "Human Friendly only! Available Hot or Iced.", price: "5.5", category: "Breakfast"},
{ name: "Apple Juice", description: "Animal and Human Friendly!", price: "2.0", category: "Lunch"},
{ name: "Watermelon Agua Fresca", description: "Animal and Human Friendly!", price: "2.0", category: "Lunch"} ];

var FOOD_ITEMS = [
{ name: "Peanut Butter Apple Cake Slice", description: "Animal and Human Friendly! We also sell whole cakes too! Ask cashier for more info.", price: "2.99", category: "Breakfast"},
{ name: "Apple Spice Cupcake", description: "Animal and Human Friendly!", price: "1.5", category: "Breakfast"},
{ name: "Blueberry Muffin", description: "Animal and Human Friendly!", price: "1.0", category: "Breakfast"},
{ name: "Sweet Potato Cupcake", description: "Animal and Human Friendly!", price: "1.0", category: "Breakfast"},
{ name: "Zucchini Chicken Bread Slice", description: "Animal and Human Friendly! We also sell whole loaves too! Ask cashier for more info.", price: "2.5", category: "Lunch"},
{ name: "Bacon Cheddar Sandwich", description: "Animal and Human Friendly!", price: "5.0", category: "Dinner"},
{ name: "Grilled Chicken Sandwich", description: "Animal and Human Friendly!", price: "5.0", category: "Dinner"} ];

function formatUSD(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(Number(value));
}

buildDrinksMenu(DRINK_ITEMS)

buildFoodMenu(FOOD_ITEMS)


function buildDrinksMenu(data) {
    var table = document.getElementById('DrinksTable');
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
        <td>${data[i].name}</td>
        <td>${data[i].description}</td>
        <td>${formatUSD(data[i].price)}</td>
        <td>${data[i].category}</td>
        </tr>`

        table.innerHTML += row
    }
}

function buildFoodMenu(data) {
    var table = document.getElementById('FoodTable');
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
        <td>${data[i].name}</td>
        <td>${data[i].description}</td>
        <td>${formatUSD(data[i].price)}</td>
        <td>${data[i].category}</td>
        </tr>`

        table.innerHTML += row;
    }
}

document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const errors = [];

    // Collect values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const partySize = document.getElementById("partySize").value.trim();
    const date = document.getElementById("date").value.trim();
    const time = document.getElementById("time").value.trim();
    const seating = document.getElementById("seating").value.trim();
    const dietaryNotes = document.getElementById("dietaryNotes").value.trim();
    const newsletter = document.getElementById("newsletter").checked;


    if (name.length < 2) {
        errors.push("Name must be at least 2 characters.");
    }

    if (!email.includes("@") || !email.includes(".")) {
        errors.push("Email must be a valid email address.");
    }

    if (isNaN(partySize) || Number(partySize) < 1) {
        errors.push("Party size must be at least 1.");
    }

    if (!date) {
        errors.push("Please select a reservation date.");
    }

    if (!time) {
        errors.push("Please select a reservation time.");
    }

    if (!seating) {
        errors.push("Please choose a seating option.");
    }

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