
class Car{
    constructor(title, price, year, power, fuel, image,location,description,user){
        this.title=title;
        this.price=price;
        this.year=year;
        this.power=power;
        this.fuel=fuel;
        this.image=image;
        this.location=location;
        this.description=description;
        this.user=user;
    }
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    }

    function isValidFullName(name) {
    const regex = /^[A-Za-z]+ [A-Za-z]+$/;
    return regex.test(name);
    }

    function isValidPhoneNumber(phone) {
    const regex = /^\+?\d{7,15}$/;
    return regex.test(phone.replace(/[\s\-]/g, ""));
    }

    function isValidCarInfo(str) {
        const regex = /^[A-Za-z]+,\s[A-Za-z0-9\- ]+,\s(19|20)\d{2}$/;
        return regex.test(str);
    }
      

    function isNumber(str) {
        return !isNaN(str) && str.trim() !== '';
    }


    let cars = JSON.parse(localStorage.getItem("cars")) || [];



    function scheduleApp(event){
        event.preventDefault();
        let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")); 
        console.log("is logged in:"+isLoggedIn); 

        if(!isNumber(document.getElementById("price").value)||!isNumber(document.getElementById("power").value)
            ||!isValidCarInfo(document.getElementById("name").value))
        {
           alert("Incorrect format!")
        }else
        if(!isLoggedIn){
            alert("You have to Log In your account in order to sell a car!")
        }
        else{
            const input = document.getElementById("name").value;

            const parts = input.split(",").map(item => item.trim());

            const make = parts[0]+" "+parts[1];
            const year = parts[2];
            const price=document.getElementById("price").value;
            const power=document.getElementById("power").value;
            const fuel = document.getElementById("fuel").value;
            const file = document.getElementById("fileInput").files[0];
            const image = file.name;
            const location = document.getElementById("location").value;
            const description=document.getElementById("description").value;
            const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
            cars.push(new Car(make, price, year, power, fuel, image, location, description, loggedInUser));
                        localStorage.setItem("cars", JSON.stringify(cars));
            console.log(cars);



            alert("Your car was successfully added to our inventory!")
        }
    }
    const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result; 
        };
        reader.readAsDataURL(file); 
    }
});



