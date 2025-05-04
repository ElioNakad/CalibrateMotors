function showCarDetails(title, price, year, power, fuel, image, location, description, email, phone) {
    let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")); 
    if (isLoggedIn) {
        const modal = document.getElementById('carModal');
        const modalContent = modal.querySelector('.modal-content');
        
        document.querySelector('.modal-title').textContent = decodeURIComponent(title);
        document.getElementById('modal-year').textContent = year;
        document.getElementById('modal-price').textContent = price + "$";
        document.getElementById('modal-power').textContent = power + "HP";
        document.getElementById('modal-fuel').textContent = fuel;

        document.getElementById('modal-description').textContent = 
            decodeURIComponent(description) + 
            `\n\nOwner Email: ${email} \nOwner Phone: ${phone}`;
        if(location!=="other"){
            document.getElementById('modal-description').textContent+="\nLocation: "+location;
        }

        modalContent.style.backgroundImage = `url('${decodeURIComponent(image)}')`;
        
        // Clear the previous modal footer content
        const modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = '';
        
        // Check if the car belongs to current user, regardless of which view they're in
        if (loggedInUser && email === loggedInUser.Email) {
            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'modal-btn modal-btn-primary';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function() {
                deleteCar(title);
                closeModal();
            };
            modalFooter.appendChild(deleteBtn);
        } else {
            // Add the regular buttons for non-user cars
            const scheduleTest = document.createElement('button');
            scheduleTest.className = 'modal-btn modal-btn-secondary';
            scheduleTest.id = 'scheduleTest';
            scheduleTest.textContent = 'Schedule Test Drive';
            scheduleTest.onclick = function() {
                alert('Test drive scheduling feature coming soon!');
            };
            
            const inquireBtn = document.createElement('button');
            inquireBtn.className = 'modal-btn modal-btn-primary';
            inquireBtn.id = 'inquireBtn';
            inquireBtn.textContent = 'Inquire Now';
            inquireBtn.onclick = function() {
                alert('Inquiry form will be available soon!');
            };
            
            modalFooter.appendChild(scheduleTest);
            modalFooter.appendChild(inquireBtn);
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const modalInfo = modal.querySelector('.modal-info');
        modalInfo.classList.remove('fade-in');
        void modalInfo.offsetWidth;
        modalInfo.classList.add('fade-in');
    } else {
        alert('You have to log in in order to view the car details');
    }
}

// Function to delete a car from inventory
function deleteCar(carTitle) {
    // Find the car index in the array
    const carIndex = cars.findIndex(car => car.title === carTitle);
    
    if (carIndex !== -1) {
        // Remove the car from the array
        cars.splice(carIndex, 1);
        
        // Update local storage
        localStorage.setItem("cars", JSON.stringify(cars));
        
        // Refresh the display
        updateDisplay();
        
        alert('Car successfully deleted from your inventory!');
    }
}

function closeModal() {
    const modal = document.getElementById('carModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; 
}

let cars = JSON.parse(localStorage.getItem("cars")) || [];
const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
let userCarsOnly = false;

document.addEventListener("DOMContentLoaded", () => {
    const carsGrid = document.querySelector(".cars-grid");
    const searchInput = document.getElementById("searchInput");
    const makeFilter = document.getElementById("makeFilter");
    const priceFilter = document.getElementById("priceFilter");
    const showAllBtn = document.getElementById("showAllBtn");
    const showMyCarsBtn = document.getElementById("showMyCarsBtn");
    
    function populateMakeFilter() {
        const makes = new Set();
        
        cars.forEach(car => {
            const make = car.title.split(' ')[0];
            if (make) makes.add(make);
        });
        
        const sortedMakes = Array.from(makes).sort();
        
        sortedMakes.forEach(make => {
            const option = document.createElement("option");
            option.value = make;
            option.textContent = make;
            makeFilter.appendChild(option);
        });
    }
    
    function filterCars() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedMake = makeFilter.value.toLowerCase();
        const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : Infinity;
        const showOnlyUserCars = userCarsOnly;
        
        return cars.filter(car => {
            const matchesSearch = car.title.toLowerCase().includes(searchTerm);
            
            const make = car.title.split(' ')[0].toLowerCase();
            const matchesMake = !selectedMake || make === selectedMake;
            
            const matchesPrice = car.price <= maxPrice;
            
            const matchesUser = !showOnlyUserCars || car.user?.Email === loggedInUser?.Email;
            
            return matchesSearch && matchesMake && matchesPrice && matchesUser;
        });
    }
    
    function createCarCard(car) {
        const carCard = document.createElement("div");
        carCard.className = "car-card";
        
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.title}" class="car-img">
            <div class="car-info">
                <h3 class="car-title">${car.title}</h3>
                <p class="car-price">${car.price}$</p>
                <div class="car-specs">
                    <div class="car-spec"><strong>${car.year}</strong><span>Year</span></div>
                    <div class="car-spec"><strong>${car.power}</strong><span>Power</span></div>
                    <div class="car-spec"><strong>${car.fuel}</strong><span>Fuel</span></div>
                </div>
                <button class="car-btn">View Details</button>
            </div>
        `;
        
        const viewBtn = carCard.querySelector('.car-btn');
        viewBtn.addEventListener('click', () => {
            showCarDetails(
                car.title,
                car.price,
                car.year,
                car.power,
                car.fuel,
                car.image,
                car.location,
                car.description,
                car.user?.Email || "",
                car.user?.Phone || ""
            );
        });
        
        return carCard;
    }
    
    function updateDisplay() {
        const filteredCars = filterCars();
        
        carsGrid.innerHTML = "";
        
        if (filteredCars.length === 0) {
            const noCarsMessage = document.createElement("div");
            noCarsMessage.className = "no-cars-message";
            noCarsMessage.textContent = "No cars match your search criteria.";
            carsGrid.appendChild(noCarsMessage);
        } else {
            filteredCars.forEach(car => {
                const carCard = createCarCard(car);
                carsGrid.appendChild(carCard);
            });
        }
    }
    
    // Make updateDisplay available globally for the delete function to call
    window.updateDisplay = updateDisplay;
    
    populateMakeFilter();
    updateDisplay();
    
    searchInput.addEventListener("input", updateDisplay);
    makeFilter.addEventListener("change", updateDisplay);
    priceFilter.addEventListener("input", updateDisplay);
    
    showAllBtn.addEventListener("click", () => {
        userCarsOnly = false;
        updateDisplay();
    });
    
    showMyCarsBtn.addEventListener("click", () => {
        let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")); 
        if(isLoggedIn){ 
            userCarsOnly = true;
            updateDisplay();
        } else {
            alert('you have to logIn in order to view your cars');
        }
    });
});