document.getElementById("profileName").innerHTML = localStorage.getItem("email");

document.getElementById("home-return").onclick = () => {
    location.href = "../pages/menu.html";
};

document.getElementById("logOut").onclick = () => {
    location.href = "../pages/index.html";
    localStorage.clear;
};

function initialDiamonds(){
    let total = localStorage.getItem("totalDiamonds");
    document.getElementById("totalDiamondHeader").innerHTML = total;
}

initialDiamonds();

function heightProfile(){
    
    let height = document.getElementById("profile-container").offsetHeight;
    document.getElementById("home-return").style.height = `${height+11}px`;
    document.getElementById("profil-right-div").style.height = `${height+11}px`;
    document.getElementById("izbornik").style.top = `${height+11}px`;
    
}

heightProfile();

let newSelected;
let lastSelected;
let kategorije = ['sport','history', 'geography', 'vehicles', 'animals', 'computer','music', 'film'];
let pay;

//Polje s objektima kategorija
let categories = [{
    name:"Sport",
    questions:"15",
    price:"160",
    image:"",
    descript:"Sports are fun! Do you realy know everything about sport?"
},{
    name:"History",
    questions:"15",
    price:"250",
    image:"",
    descript:"History is the best mirror of the future."
},{
    name:"Geography",
    questions:"15",
    price:"250",
    image:"",
    descript:"If you're wondering where you'd like to go on your next adventure, open the map and move your finger randomly. It is certainly an exciting adventure."
},{
    name:"Vehicles",
    questions:"15",
    price:"180",
    image:"",
    descript:"What was the first car invented? When and where was the first Formula 1 race held? If you know the answers to the questions, then you are truly a vehicle lover."
},{
    name:"Animals",
    questions:"15",
    price:"200",
    image:"",
    descript:"Monkeys are like people - they sleep, eat, make noise, rest, eat and sleep again."
},{
    name:"Computer science",
    questions:"15",
    price:"300",
    image:"",
    descript:"Computers are part of our everyday life. A mobile phone is nothing but a reduced version of a computer that we can carry with us everywhere."
},{
    name:"Music",
    questions:"15",
    price:"230",
    image:"",
    descript:"Music accompanies us at all times. Whether we wake up to an alarm, eat, cook, drive, entertain or even sleep."
},{
    name:"Film",
    questions:"15",
    price:"230",
    image:"",
    descript:"In films, we recognize ourselves and the environment that surrounds us. We follow the development of the situation and change our moods a large number of times while watching."
}
];


function deselectCategoryCard(deselectCat){
    console.log(deselectCat);
    document.getElementById(`${kategorije[deselectCat]}`).style.border = "solid whitesmoke";
    document.getElementById(`${kategorije[deselectCat]}`).style.backgroundColor = "whitesmoke";
    document.getElementById(`${kategorije[deselectCat]}`).style.boxShadow = "none";
    document.getElementById(`${kategorije[deselectCat]}`).onmouseover = () =>{
        if(newSelected!==deselectCat){
            document.getElementById(`${kategorije[deselectCat]}`).style.boxShadow = '2px 2px gray';
            document.getElementById(`${kategorije[deselectCat]}`).style.border = 'solid #D9D9D9';
            document.getElementById(`${kategorije[deselectCat]}`).style.backgroundColor = '#D9D9D9';
        }
    };
    document.getElementById(`${kategorije[deselectCat]}`).onmouseout = () =>{
        if(newSelected!==deselectCat){
        document.getElementById(`${kategorije[deselectCat]}`).style.border = "solid whitesmoke";
        document.getElementById(`${kategorije[deselectCat]}`).style.backgroundColor = "whitesmoke";
        document.getElementById(`${kategorije[deselectCat]}`).style.boxShadow = "none";
        }
    };
}

function selectedCategoryCard(selectCat){
    let ind = kategorije.indexOf(selectCat);
    newSelected = ind;
    if(newSelected!==lastSelected){
        deselectCategoryCard(lastSelected);
        lastSelected = ind;
    }
        document.getElementById(`${kategorije[ind]}`).style.border = "solid #C8021F";
        document.getElementById(`${kategorije[ind]}`).style.backgroundColor = "#D9D9D9";
        document.getElementById(`${kategorije[ind]}`).style.boxShadow = "2px 2px gray";
}


function initialFirstSelect(){
    lastSelected = 0;
    selectedCategoryCard('sport');
    categoryDescriptSelection(0);
    scaleComplete(categories[0].price);
}

initialFirstSelect();


function categoryDescriptSelection(ind){
    document.getElementById("selCategoryTitle").innerHTML = categories[ind].name;
    document.getElementById("selCategory").innerHTML = categories[ind].name;
    document.getElementById("numQuestion").innerHTML = categories[ind].questions;
    document.getElementById("startPrice").innerHTML = categories[ind].price;
    document.getElementById("categoryDescript").innerHTML = categories[ind].descript;
    document.getElementById("startPriceAlert").innerHTML = categories[ind].price;
}

function scaleComplete(price){
    let add_part = Number(price)/5;
    for(let i=1;i<16;i++){
        document.getElementById(`${i}`).innerHTML = i*add_part;
    }
}

document.getElementById("sport").onclick = () => {
    console.log("sport")
    selectedCategoryCard('sport');
    categoryDescriptSelection(0);
    scaleComplete(categories[0].price);
};

document.getElementById("history").onclick = () => {
    selectedCategoryCard('history');
    categoryDescriptSelection(1);
    scaleComplete(categories[1].price);
};

document.getElementById("geography").onclick = () => {
    selectedCategoryCard('geography');
    categoryDescriptSelection(2);
    scaleComplete(categories[2].price);
};

document.getElementById("vehicles").onclick = () => {
    selectedCategoryCard('vehicles');
    categoryDescriptSelection(3);
    scaleComplete(categories[3].price);
};

document.getElementById("animals").onclick = () => {
    selectedCategoryCard('animals');
    categoryDescriptSelection(4);
    scaleComplete(categories[4].price);
};

document.getElementById("computer").onclick = () => {
    selectedCategoryCard('computer');
    categoryDescriptSelection(5);
    scaleComplete(categories[5].price);
};

document.getElementById("music").onclick = () => {
    selectedCategoryCard('music');
    categoryDescriptSelection(6);
    scaleComplete(categories[6].price);
};

document.getElementById("film").onclick = () => {
    selectedCategoryCard('film');
    categoryDescriptSelection(7);
    scaleComplete(categories[7].price);
};

function transactionPay(pay){
    let total = localStorage.getItem("totalDiamonds");
    total = total - pay;
    localStorage.setItem("totalDiamonds",String(total));
    document.getElementById("totalDiamondHeader").innerHTML = String(total);
}

//buttons
document.getElementById("btn-Start").onclick = () => {
    document.getElementById("btn-Start").style.cursor = "not-allowed";
    document.getElementById("btn-Start").style.opacity = "0.6";
    document.getElementById("alert-div").style.display = "flex";
};

document.getElementById("btn-pay").onclick = () => {
   let strPay = document.getElementById("startPrice").innerText;
   pay = Number(strPay);
   transactionPay(pay);
   document.getElementById("alert-div").style.display = "none";
   document.getElementById("btn-Start").style.cursor = "pointer";
   document.getElementById("btn-Start").style.opacity = "1";
   document.getElementById("totalDiamondPay").innerHTML = "-" + strPay;
   document.getElementById("minusTotal").style.display = "flex";

   setTimeout(() => {
    document.getElementById("minusTotal").style.display = "none";
    location.href = "../pages/quiz.html";
   },2000)
   
};

document.getElementById("btn-canclePay").onclick = () => {
    document.getElementById("alert-div").style.display = "none";
    document.getElementById("btn-Start").style.cursor = "pointer";
    document.getElementById("btn-Start").style.opacity = "1";
};


function izbornikMove(){
    document.getElementById("profil").style.backgroundColor = "#8E0217"
    document.getElementById("izbornik").style.display = 'flex';
    let width = document.getElementById("profil").offsetWidth;
    document.getElementById("izbornik").style.width = `${width}px`;
}

document.getElementById("profil-right-div").onmouseover = () => {
    izbornikMove();
}

document.getElementById("profil-right-div").onmouseout = () => {
    document.getElementById("izbornik").style.display = 'none';
    document.getElementById("profil").style.backgroundColor = "#C8021F";
}

/*

let counter = 0;
document.getElementById("profil").onclick = () => {
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
    
};*/