class User {
    constructor(FirstName, LastName, Email, Phone, Password) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Phone = Phone;
        this.Password = Password;
    }
}
let users = JSON.parse(localStorage.getItem("users")) || [];

if (users.length === 0) {
    users.push(new User("Elio", "Nakad", "elionakad05@gmail.com", "76441471", "El12345$"));
    localStorage.setItem("users", JSON.stringify(users));
}



let validPassword = false;
let validMatchingPassword = false;

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🔒';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function toggleConfirmPassword() {
    const confirmInput = document.getElementById('confirmPassword');
    const toggleBtn = confirmInput.nextElementSibling;
    
    if (confirmInput.type === 'password') {
        confirmInput.type = 'text';
        toggleBtn.textContent = '🔒';
    } else {
        confirmInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('passwordStrength');
    
    let strength = 0;
      // Check length
    if (password.length >= 8) {
        strength += 25;
    }
    
    
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 25;
    }
    
    
    if (password.match(/\d/)) {
        strength += 25;
    }
    
  
    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 25;
    }
    
    
    strengthBar.style.width = strength + '%';
    
    
    if (strength <= 25) {
        strengthBar.style.backgroundColor = '#dc3545'; 
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#ffc107'; 
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#17a2b8'; 
    } else {
        strengthBar.style.backgroundColor = '#28a745';
        validPassword = true;
    } 
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('passwordMatchMessage');
    
    if (confirmPassword === '') {
        message.textContent = '';
        validMatchingPassword = false;
        return;
    }
    
    if (password === confirmPassword) {
        message.textContent = 'Passwords match';
        message.style.color = '#28a745';
        validMatchingPassword = true;
    } else {
        message.textContent = 'Passwords do not match';
        message.style.color = '#dc3545';
        validMatchingPassword = false;
    }
}

function isValidName(name) {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
}
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        return false;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].Email === email) {
            return false; 
        }
    }
    return true;
}
function isValidPhoneNumber(phone) {
    const regex = /^\+?\d{7,15}$/;
    return regex.test(phone.replace(/[\s\-]/g, ""));
}

function createAcc(event) {
    event.preventDefault();
    console.log("Form submission triggered");
    
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    
    console.log("Form data:", {
        firstName, lastName, email, phone,
        validPassword, validMatchingPassword
    });
    
    if (!firstName || !lastName || !email || !phone || !password ) {
        alert("Please fill in all required fields");
        return;
    }
    
    if(
       !isValidName(firstName) ||
       !isValidName(lastName) || 
       !isValidPhoneNumber(phone) || 
       !validPassword || 
       !validMatchingPassword) {
        alert("Incorrect format. Please check your inputs.");
    } else
       if(!isValidEmail(email) ) {
        alert("This email is already in use");
       }
        else{
        const newUser = new User(firstName, lastName, email, phone, password);
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        console.log("New user added:", newUser);
        console.log("All users:", users);
        
        alert("You are officially signed in!");
        
        document.getElementById("signupForm").reset();
        validPassword = false;
        validMatchingPassword = false;
    }


}

function socialSignup(platform) {
    console.log(`Attempting to sign up with ${platform}`);
    alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} signup functionality would be implemented here.`);
}
