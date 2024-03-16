document.getElementById("profileName").innerHTML = localStorage.getItem("email");

document.getElementById("home-return").onclick = function(){
    location.href = "../pages/menu.html";
};

document.getElementById("logOut").onclick = function(){
    location.href = "../pages/index.html";
    localStorage.clear;
};

document.getElementById("quizGame").onclick = function(){
    location.href = "../pages/categories.html";
};

document.getElementById("user-name").innerHTML = localStorage.getItem("email");

let counter = 0;

document.getElementById("profil").onclick = function(){
    ++counter;
    if(counter%2==0){
        document.getElementById("izbornik").style.display = 'none';
        document.getElementById("profil").style.backgroundColor = "#C8021F"
    }else{
        document.getElementById("profil").style.backgroundColor = "#8E0217"
        document.getElementById("izbornik").style.display = 'flex';
        let width = document.getElementById("profil").offsetWidth;
        document.getElementById("izbornik").style.width = `${width}px`;
        console.log(document.getElementById("profil").offsetWidth);
    }
    
};