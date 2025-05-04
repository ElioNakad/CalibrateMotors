// Car descriptions object
const carDescriptions = {
    "Audi RS e-tron GT": "The Audi RS e-tron GT represents the pinnacle of electric performance with its stunning design and exceptional capabilities. This all-electric grand tourer combines breathtaking acceleration with luxurious comfort. With dual electric motors producing 637 horsepower, it delivers supercar-level performance while maintaining the practicality of a four-door coupe. The interior features sustainable materials and cutting-edge technology, making it not just a performance vehicle but a statement in sustainable luxury.",
    "BMW XM": "The BMW XM is a high-performance luxury SUV that represents BMW's flagship M division. This hybrid powerhouse combines a twin-turbocharged V8 engine with electric motor assistance to produce 644 horsepower. The bold, distinctive exterior design makes a powerful statement, while the interior offers a driver-focused cockpit with premium materials and advanced technology. As BMW's first standalone M model since the legendary M1, the XM delivers exceptional performance along with the versatility of an SUV and improved efficiency through its hybrid technology.",
    "Mercedes-AMG GT 63": "The Mercedes-AMG GT 63 epitomizes the perfect balance of luxury and high-performance engineering. This four-door coupe features a handcrafted 4.0-liter V8 biturbo engine delivering 577 horsepower for breathtaking acceleration and response. The sophisticated exterior design combines athletic proportions with elegant details, while the interior showcases premium materials and the latest MBUX infotainment system. With its adaptive suspension and all-wheel drive system, the AMG GT 63 offers exceptional handling and comfort, making it the ideal grand tourer for those who refuse to compromise.",
    "Porsche Taycan Turbo S": "The Porsche Taycan Turbo S represents the future of electric performance vehicles with Porsche's legendary engineering excellence. This all-electric sports car delivers an astounding 750 horsepower in overboost mode, with instant torque providing supercar acceleration. The sleek, aerodynamic design is unmistakably Porsche, while incorporating futuristic elements that highlight its electric nature. Inside, the cockpit features a curved digital instrument display and multiple touchscreens. With its 800-volt architecture allowing for ultra-fast charging and innovative two-speed transmission, the Taycan Turbo S proves that the electric future of performance cars is here."
};

const DEFAULT_DESCRIPTION = "This luxury vehicle combines exceptional performance with sophisticated design. Featuring cutting-edge technology and premium materials throughout the cabin, this car delivers an unparalleled driving experience.";

// Function to determine if the device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Close mobile menu when link is clicked
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobileDevice() && navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Add scroll event for navbar
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }
        }
    });
});

// Function to show car details with responsive adjustments
function showCarDetails(title, price, year, power, fuel, image) {
    let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")); 
    
    if(isLoggedIn){ 
        const modal = document.getElementById('carModal');
        const modalContent = modal.querySelector('.modal-content');
        const modalInfo = modal.querySelector('.modal-info');
        
        const description = carDescriptions[title] || DEFAULT_DESCRIPTION;
        
        document.querySelector('.modal-title').textContent = title;
        document.getElementById('modal-year').textContent = year;
        document.getElementById('modal-price').textContent = price;
        document.getElementById('modal-power').textContent = power;
        document.getElementById('modal-fuel').textContent = fuel;
        document.getElementById('modal-description').textContent = description;
        
        // Adjust background image for mobile
        if (isMobileDevice()) {
            // For mobile, use a solid color background instead of image
            modalContent.style.backgroundImage = 'none';
            modalContent.style.backgroundColor = '#121212';
            
            // Adjust modal info max height for better mobile viewing
            modalInfo.style.maxHeight = '80vh';
        } else {
            // For desktop, use the image background
            modalContent.style.backgroundImage = `url('${image}')`;
            modalContent.style.backgroundColor = '';
            modalInfo.style.maxHeight = '90vh';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
        
        modalInfo.classList.remove('fade-in');
        void modalInfo.offsetWidth; 
        modalInfo.classList.add('fade-in');
        
        // Add touch swipe to close on mobile
        addSwipeToCloseModal();
    } else {
        alert('You have to log in first in order to view the car details');
    }
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Add touch swipe functionality to close modal on mobile
function addSwipeToCloseModal() {
    if (!isMobileDevice()) return;
    
    const modal = document.getElementById('carModal');
    let touchStartY = 0;
    let touchEndY = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});
    
    modal.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        
        // If swiped down for more than 100px, close the modal
        if (touchEndY - touchStartY > 100) {
            closeModal();
        }
    }, {passive: true});
}

// Handle window resize events
window.addEventListener('resize', function() {
    const modal = document.getElementById('carModal');
    if (modal && modal.style.display === 'block') {
        // Reapply styling for the current viewport size
        const modalContent = modal.querySelector('.modal-content');
        const modalInfo = modal.querySelector('.modal-info');
        
        if (isMobileDevice()) {
            modalContent.style.backgroundImage = 'none';
            modalContent.style.backgroundColor = '#121212';
            modalInfo.style.maxHeight = '80vh';
        } else {
            // Get the current car image (we need to extract this from the style)
            const bgImage = modalContent.style.backgroundImage;
            modalContent.style.backgroundImage = bgImage;
            modalContent.style.backgroundColor = '';
            modalInfo.style.maxHeight = '90vh';
        }
    }
});

// Add filter functionality for car listings
function filterCars() {
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (!priceFilter || !typeFilter || !searchInput) return;
    
    const cards = document.querySelectorAll('.car-card');
    const searchText = searchInput.value.toLowerCase();
    const maxPrice = priceFilter.value ? parseInt(priceFilter.value) : Infinity;
    const type = typeFilter.value;
    
    cards.forEach(card => {
        const title = card.querySelector('.car-title').textContent.toLowerCase();
        const priceText = card.querySelector('.car-price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));
        const carType = card.dataset.type;
        
        const matchesSearch = title.includes(searchText);
        const matchesPrice = price <= maxPrice;
        const matchesType = type === 'all' || carType === type;
        
        if (matchesSearch && matchesPrice && matchesType) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}