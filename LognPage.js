
        let users = JSON.parse(localStorage.getItem("users")) || [];

        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleBtn = document.querySelector('.toggle-password');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🔒';
               
                console.log(users);

            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        if (sessionStorage.getItem("isLoggedIn") === null) { 
            sessionStorage.setItem("isLoggedIn", JSON.stringify(false));
        }
        


        function signIn(){
            let found=false;
        users.forEach(element => {
            if(element.Email===document.getElementById("email").value&&element.Password===document.getElementById("password").value){
                alert("Welcome back!");
                found=true;
                isLoggedIn=true;
                console.log(isLoggedIn)
                sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
                sessionStorage.setItem("loggedInUser", JSON.stringify(element));

            }
        });
        if(!found){
            alert("There is no such user, sign up!")
        }
        }
      