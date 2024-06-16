document.getElementById("btn-back").onclick = () => {
    location.href = "../pages/index.html";
};

document.getElementById("close-x").onclick = () => {
    document.getElementById("incorrect").style.display = "none";
};

//provjera ispravnosti emaila i lozinke
function validation(){
    let email = document.getElementById("mail").value;
    let pass = document.getElementById("pass").value;

    localStorage.setItem("email",email);

    console.log(email);

    if(email==="sofa2024" && pass==="1234"){
        console.log(typeof(email));
        return true;
    }else{
        return false;
    }
}

document.getElementById("lgn-btn").onclick = () => {
    let valid = validation();
    console.log(valid);
    if(valid === true){
        location.href = "../pages/menu.html";
    }else{
        document.getElementById("incorrect").style.display = "flex";
        document.getElementById("incorrect").style.alignItems = "center";
        document.getElementById("incorrect").style.gap = "10px";
        document.getElementById("mail").value = '';
        document.getElementById("pass").value = '';
        document.getElementById("robot").value = '';
    }
};


