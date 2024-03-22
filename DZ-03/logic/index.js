document.getElementById("btn-lgn").onclick = () => {
    location.href = "../pages/login.html";
};

//inicijalizacija ukupnih dijamanata na pocetku
function initialDiamonds(){
    localStorage.setItem("totalDiamonds","1250");
}

initialDiamonds();
