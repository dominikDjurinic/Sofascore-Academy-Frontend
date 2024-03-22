document.getElementById("profileName").innerHTML = localStorage.getItem("email");   

document.getElementById("home-return").onclick = () => {
    location.href = "../pages/menu.html";
};

function heightProfile(){
    let height = document.getElementById("profile-container").offsetHeight;
    console.log(height)
    document.getElementById("home-return").style.height = `${height+11}px`;
    document.getElementById("profil-right-div").style.height = `${height+11}px`;
    document.getElementById("izbornik").style.top = `${height+11}px`;
}

heightProfile();

function initialDiamonds(){
    let total = localStorage.getItem("totalDiamonds");
    document.getElementById("totalDiamondHeader").innerHTML = total;
    document.getElementById("totalDiamondHello").innerHTML = total;
}

initialDiamonds();

document.getElementById("logOut").onclick = () => {
    location.href = "../pages/index.html";
    localStorage.clear;
};

document.getElementById("quizGame").onclick = () => {
    location.href = "../pages/categories.html";
};

//postavljanje emaila korisnika u pozdravnu poruku
document.getElementById("user-name").innerHTML = localStorage.getItem("email");

//prikaz izbornika profila
function izbornikMove(){
    document.getElementById("profil").style.backgroundColor = "#8E0217"
    document.getElementById("izbornik").style.display = 'flex';
    let width = document.getElementById("profil").offsetWidth;
    document.getElementById("izbornik").style.width = `${width}px`;
    console.log(document.getElementById("profil").offsetWidth);
}

document.getElementById("profil-right-div").onmouseover = () => {
    izbornikMove();
}

document.getElementById("profil-right-div").onmouseout = () => {
    document.getElementById("izbornik").style.display = 'none';
    document.getElementById("profil").style.backgroundColor = "#C8021F";
}