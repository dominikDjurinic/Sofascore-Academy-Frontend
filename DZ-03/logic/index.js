document.getElementById("btn-lgn").onclick = () => {
    location.href = "../pages/login.html";
};

function initialDiamonds(){
    localStorage.setItem("totalDiamonds","1250");
}

initialDiamonds();
