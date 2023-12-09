// ROOM RESERVATION
const singleRoomInput = document.getElementById("num1");
const doubleRoomInput = document.getElementById("num2");
const tripleRoomInput = document.getElementById("num3");
const adultsInput = document.getElementById("adults");
const childrenInput = document.getElementById("children");
const durationInput = document.getElementsByClassName("duration");
const extraBedCheckbox = document.getElementById("extra-bed");
const promoCodeInput = document.getElementById("promo-code");
const currentBookingTable = document.getElementById("current-booking-table");
const bookNowButton = document.getElementById("book-now");
const loyaltyPointsSection = document.getElementById("loyalty-points-section");
const checkLoyaltyButton = document.getElementById("check-loyalty");
const loyaltyPointsDisplay = document.getElementById("loyalty-points");

// ADVENTURE RESERVATION
const adventureAdultsInput = document.getElementById("adventureAdults");
const adventureChildrenInput = document.getElementById("adventureChildren");
const adventurePersonInput = document.getElementById("person");
const adventureGuideYesInput = document.getElementById("yes");
const adventureGuideNoInput = document.getElementById("no");
const bookAdventureButton = document.getElementById("book-adventure");
const checkIn = document.getElementById("check-in");
const checkOut = document.getElementById("check-out")

// Variables
let roomCost = 0;
let foodCost = 0;
let extraBedCost = 0;
let adventureCost = 0;
let adventureAdultsCost = 0;
let adventureChildrenCost = 0;
let guideCost = 0;
let discountAmount = 0;
let totalDays = 0; 

//blocking previous dates
const currentDate = new Date().toISOString().split('T')[0];
checkIn.min = currentDate;
checkOut.min = currentDate;

function updateCurrentBookingTable() {
    const roomTable = document.getElementById("room-table");
    const adventureTable = document.getElementById("adventure-table");

    // Room Table
    roomTable.innerHTML = `
        <tr>
            <th>Room Type</th>
            <th>Quantity</th>
            <th>Cost</th>
        </tr>
        <tr>
            <td>Single Room</td>
            <td>${singleRoomInput.value}</td>
            <td>${(singleRoomInput.value * 25000).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Double Room</td>
            <td>${doubleRoomInput.value}</td>
            <td>${(doubleRoomInput.value * 35000).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Triple Room</td>
            <td>${tripleRoomInput.value}</td>
            <td>${(tripleRoomInput.value * 40000).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Children Food Cost</td>
            <td>${childrenInput.value}</td>
            <td>${(childrenInput.value * 5000).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Extra Bed</td>
            <td>${extraBedCheckbox.checked ? "1" : "0"}</td>
            <td>${(extraBedCheckbox.checked ? 8000 : 0).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Duration</td>
            <td>${totalDays}</td>
            <td></td>
        </tr>
         <tr>
            <td>Discount</td>
            <td></td>
            <td>${discountAmount.toFixed(2)} LKR</td>
        </tr>
        <tr>
            <th>Total Cost</th>
            <th></th>
            <th>${calculateTotalCost().toFixed(2)} LKR</th>
        </tr>
    `;

    // Adventure Table
    adventureTable.innerHTML = `
        <tr>
            <th>Adventure Cost</th>
            <th>Quantity</th>
            <th>Cost</th>
        </tr>
        <tr>
            <td>Adults</td>
            <td>${adventureAdultsInput.value}</td>
            <td>${(parseInt(adventureAdultsInput.value) * adventureAdultsCost).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Children</td>
            <td>${adventureChildrenInput.value}</td>
            <td>${(parseInt(adventureChildrenInput.value) * adventureChildrenCost).toFixed(2)} LKR</td>
        </tr>
        <tr>
            <td>Guide Cost</td>
            <td>${adventureGuideYesInput.checked ? (parseInt(adventureAdultsInput.value) + parseInt(adventureChildrenInput.value)) : "0"}</td>
            <td>${guideCost.toFixed(2)} LKR</td>
        </tr>
        <tr>
            <th>Total Cost</th>
            <th></th>
            <th>${adventureCost.toFixed(2)} LKR</th>
        </tr>
    `;
}

//calculation for number of dates
function updateTotalCost(){
    const checkInDate = new Date(checkIn.value);
    const checkOutDate = new Date(checkOut.value);
    
    totalDays = Math.round(Math.abs((checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)));

    updateCurrentBookingTable();
}

checkIn.addEventListener("input", updateTotalCost);
checkOut.addEventListener("input", updateTotalCost);

function roomChange() {
    roomCost =
        singleRoomInput.value * 25000 +
        doubleRoomInput.value * 35000 +
        tripleRoomInput.value * 40000;

    foodCost = parseInt(childrenInput.value) * 5000;

    extraBedCost = extraBedCheckbox.checked ? 8000 : 0;

    // Update adventure cost based on user selection
    updateCurrentBookingTable();
}

//total cost for room reservations
function calculateTotalCost() {
    return (roomCost + foodCost + extraBedCost - discountAmount) * totalDays;
}

//total cost for adventure reservations
function updateAdventureCost() {
    const personType = adventurePersonInput.value;
    const guideNeeded = adventureGuideYesInput.checked;

    if (personType === "foreign") {
        adventureAdultsCost =  10000;
        adventureChildrenCost =  5000;
        guideCost = guideNeeded ? ((parseInt(adventureAdultsInput.value) * 1000) + (parseInt(adventureChildrenInput.value)) * 500) : 0;
    } else {
        adventureAdultsCost =  5000;
        adventureChildrenCost = 2000;
        guideCost = guideNeeded ? ((parseInt(adventureAdultsInput.value) * 1000) + (parseInt(adventureChildrenInput.value)) * 500) : 0;
    }

    adventureCost = (parseInt(adventureAdultsInput.value) * adventureAdultsCost) + (parseInt(adventureChildrenInput.value) * adventureChildrenCost) + guideCost;

    updateCurrentBookingTable();
}

function applyDiscount() {
    const promoCode = promoCodeInput.value.trim().toUpperCase();

    if (promoCode === "PROMO123") {
        // Apply a 5% discount
        discountAmount = calculateTotalCost() * 0.05;
    } else {
        discountAmount = 0;
    }

    updateCurrentBookingTable();
}

// Event listeners for input changes
document.querySelectorAll(".room-input").forEach((input) => {
    input.addEventListener("input", roomChange);
});

childrenInput.addEventListener("input", function () {
    updateCurrentBookingTable();
    roomChange();
});

extraBedCheckbox.addEventListener("change", function (){
    updateCurrentBookingTable();
    roomChange();
})

adventureGuideYesInput.addEventListener("change", function (){
    updateCurrentBookingTable();
    updateAdventureCost();
})

adventureGuideNoInput.addEventListener("change", function (){
    updateCurrentBookingTable();
    updateAdventureCost();
})

// Event listener for "Book Now" button and form validation
bookNowButton.addEventListener("click", function () {
    if (checkIn.value &&
        checkOut.value &&
        Name.value &&
        Email.value &&
        Phone.value ){
        const alertMessage = `Overall Booking Cost: ${calculateTotalCost().toFixed(2)} LKR`;
        alert(alertMessage);
    } else {
         alert("Kindly ensure all fields are completed!");
    }
});

// Variables for form validation
const Name = document.getElementById("firstname");
const Email = document.getElementById("email");
const Phone = document.getElementById("phone");

// Event listener for "Book Adventure" button and form validation
bookAdventureButton.addEventListener("click", function () {
    if (Name.value &&
        Email.value &&
        Phone.value ) {
        const adventureAlert = `Thank You for your Booking!\n Adults Adventure Cost: ${adventureAdultsCost.toFixed(2)} LKR\n Children Adventure Cost: ${adventureChildrenCost.toFixed(2)} LKR\n Guide Cost: ${guideCost.toFixed(2)} LKR\n Overall Adventure Cost: ${adventureCost.toFixed(2)} LKR`;

        // Reloads the entire page
        location.reload();
        alert(adventureAlert);
    } else {
        alert("Kindly ensure all fields are completed!");
    }
});

// Event listener for "Check Loyalty" button
checkLoyaltyButton.addEventListener("click", function () {
    const numberOfRooms = parseInt(singleRoomInput.value) + parseInt(doubleRoomInput.value) + parseInt(tripleRoomInput.value);

    let loyaltyPoints = "No Loyalty Points";

    if (numberOfRooms > 3) {
        loyaltyPoints = numberOfRooms * 20;
    }

    // Store loyalty points in local storage
    localStorage.setItem('loyaltyPoints', loyaltyPoints);

    // Display loyalty points in the loyalty points section
    loyaltyPointsDisplay.textContent = loyaltyPoints.toString();
});

// Event listeners for adventure input changes
document.querySelectorAll(".adventure-input").forEach((input) => {
    input.addEventListener("input", updateAdventureCost);
});

// Event listener for promo code input
promoCodeInput.addEventListener("input", applyDiscount);

const addToFavoritesButton = document.getElementById("add-to-favorites");

addToFavoritesButton.addEventListener("click", function () {

    const favouriteMessage = `Added to Favourites!`;
    alert(favouriteMessage);

    const favoriteBookingData = [];

    const bookingData = {
        "Number of Single Rooms": singleRoomInput.value,
        "Number of Double Rooms": doubleRoomInput.value,
        "Number of Triple Rooms": tripleRoomInput.value,
        "Number of Adults": adultsInput.value,
        "Number of Children": childrenInput.value,
        "Duration": totalDays,
        "Extra bed": extraBedCheckbox.checked,
        "Promo Code": promoCodeInput.value,
        "Number of Adults for Adventure": adventureAdultsInput.value,
        "Number of Children for Adventure": adventureChildrenInput.value,
        "Foreign/Local": adventurePersonInput.value,
        "Guide for Adventure": adventureGuideYesInput.checked,
        "Check In Date": checkIn.value,
        "Check Out Date": checkOut.value,
    };

    favoriteBookingData.push(bookingData);

    localStorage.setItem('favoriteBooking', JSON.stringify(favoriteBookingData));

    console.log(localStorage);
});