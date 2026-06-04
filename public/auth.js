function signup() {
    const em = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const cpass = document.getElementById("cpassword").value;
    const fon = document.getElementById("phone").value;
    const name = document.getElementById("name").value;

    if (name && cpass && fon && pass && em) {
        if (pass === cpass) {

            // Declare userID to avoid potential issues
            let userID;

            firebase.auth().createUserWithEmailAndPassword(em, pass)
                .then((userCred) => {
                    userID = userCred.user.uid;

                    return firebase.firestore().collection("Users").doc(userID).set({
                        name: name,
                        phone: fon,
                        email: em,
                    });
                })
                .then(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });

                    Toast.fire({
                        icon: "success",
                        title: "Signed up successfully"
                    }).then(() => {
                        window.location.href = "index.html";
                    });
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    Swal.fire(errorMessage);
                });

        } else {
            Swal.fire("Your passwords don't match");
        }
    } else {
        Swal.fire("Please fill in all the details");
    }
}


function  login(){
    const em =document.getElementById("emailLog").value;
    const pass= document.getElementById("passwordLog").value;

    if(em && pass){
        firebase.auth().signInWithEmailAndPassword(em,pass).then(()=>{
            const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                }).then(()=>{
                    window.location.href='index.html';
                })
        }) .catch((error) => {
             
                Swal.fire("Incorrect Email or Password")
            });

    }else{
        Swal.fire("Email or Password is missing")
    }
    
}