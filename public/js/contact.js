(function (){
    "use strict";
    
    let form = document.querySelector('#contat-form');
        document
        .querySelector ("#contact-form-button")
        .addEventListener("click", (event)=> {
            event.preventDefault();
            event.stopPropagation();
           let formValid =true;
            if (!form.checkValidity()) {
            formValid = false;
            }
            form.classList.add('was-validated');
            if (formValid) {
                sendTheEmail ()
            }
          });
    
          function sendTheEmail(){
            console.log ("You clicked the submit button.");
            let firstName = document.querySelector ("#contact-first-name").value; 
            let lastName = document.querySelector ("#contact-last-name").value; 
            let email = document.querySelector ("#contact-mail").value; 
            let message = document.querySelector ("#contact-msg").value; 
            let obj ={
                sub: "Someone submitted a contact form!",
                txt: `${document.querySelector("#contact-first").value}   
                ${document.querySelector("#contact-last").value}
                 sent you a message that reads ${document.querySelector("#contact-question").value }
               . They're email address is 
               ${ document.querySelector("#contact-email-addr").value}`, 
                  
            };
            console.log("First name:" + firstName);
            console.log("Last name:" + lastName);
            console.log("Email:" + email);
            console.log("Message:" + msg);
        }




    })();