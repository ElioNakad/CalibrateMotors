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


    function scheduleApp(event){
        let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn")); 
        console.log("is logged in:"+isLoggedIn); 
        
        if(isLoggedIn){ 
        event.preventDefault();
        if(!isValidEmail(document.getElementById("email").value)||!isValidFullName(document.getElementById("name").value)
           ||!isValidPhoneNumber(document.getElementById("phone").value))
        {
           alert("Incorrect format!")
        }
        else{
            alert("Message sent successfully!")
        }
        }else{
            alert('you have to logIn in order to contact us!')
        }
    }