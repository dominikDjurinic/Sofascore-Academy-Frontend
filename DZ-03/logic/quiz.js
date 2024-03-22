//dopusten button confirm
function cnfButtonOn(){
    document.getElementById("cnf-btn").disabled = false;
    document.getElementById("cnf-btn").style.opacity = "1";
}

//onemogucen button confirm
function cnfButtonOff(){
    document.getElementById("cnf-btn").disabled = true;
    document.getElementById("cnf-btn").style.opacity = "0.2";
}

//osnovne postavke divova odgovora
function defaultAnswers(){
    document.getElementById("div-aw1").style.backgroundColor = "whitesmoke";
    document.getElementById("div-aw2").style.backgroundColor = "whitesmoke";
    document.getElementById("div-aw3").style.backgroundColor = "whitesmoke";
    document.getElementById("div-aw4").style.backgroundColor = "whitesmoke";
    document.getElementById("div-aw1").style.pointerEvents = "auto";
    document.getElementById("div-aw2").style.pointerEvents = "auto";
    document.getElementById("div-aw3").style.pointerEvents = "auto";
    document.getElementById("div-aw4").style.pointerEvents = "auto";
    document.getElementById("abcd-1").style.backgroundColor = "#FF3F5B";
    document.getElementById("abcd-2").style.backgroundColor = "#23CE14";
    document.getElementById("abcd-3").style.backgroundColor = "#58A8E6";
    document.getElementById("abcd-4").style.backgroundColor = "#FF9314";
}

/**FETCH QUESTIONS and ANSWERS  - dohvat pitanja i odgovora**/
let questions;
let correctAnsID;
let counter = 0;
const category = localStorage.getItem("categoryId");


//dohvacanje jednog pitanja (amount=1) po pozivu funkcije,
//u odabranoj kategoriji (category=${catId}) i odredene tezine (difficulty=${difficulty})
async function fetchQuestionsAndAnswers(catId, difficulty) {    //asinkrona funkcija

    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${catId}&difficulty=${difficulty}`;

    try {   //try-catch blok detektira neuspješne Promise (errors)
      const response = await fetch(url);    //await - pauzira izvođenje async funkcije fetchQuestionsAndAnswers() dok se ne dohvate podaci s API-ja
      if (response.status === 200) {
        questions = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
}

//prikaz dohvacenih podataka iz API-ja na stranici
function showQuestionsAndAnswers(){
    const questDiv = document.getElementById("quest-p");
    questDiv.innerHTML = questions.results[0].question;

    correctAnsID = Math.floor(Math.random() * (5 - 1) + 1);   //nasumican odabir div-a u kojeg postavljamo ispravan odgovor
    console.log(`aw${correctAnsID}`);
    console.log(questions.results[0]);
    document.getElementById(`aw${correctAnsID}`).innerHTML = questions.results[0].correct_answer;
    ansCount = -1;
    for(let i=1;i<5;i++){
        if(i!=correctAnsID){
            ++ansCount;
            document.getElementById(`aw${i}`).innerHTML = questions.results[0].incorrect_answers[ansCount];
        }
    }
}

//inicijalizacija kviza
async function initial(){
    ++counter;
    let catId = Number(category)
    await fetchQuestionsAndAnswers(catId, "easy");
    showQuestionsAndAnswers();
    document.getElementById("catNameQuiz").innerHTML = localStorage.getItem("categoryName");
    document.getElementById(`${Number(counter)}`).style.backgroundColor = "#C8021F";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("end-btn").style.display = "none";
    document.getElementById("cnf-btn").disabled = true;
    document.getElementById("cnf-btn").style.opacity = "0.2";
}

initial();


//odabrani odgovor
let isClicked = false;
let whoClicked = "";
let selectedAnswer;

document.getElementById("div-aw1").onclick = () => {
    if(whoClicked!=="div-aw1" && isClicked){                        //provjera je li bio neki odgovor prethodno odabran
        document.getElementById(`${whoClicked}`).style.backgroundColor = "whitesmoke";  //ukoliko je slijedi zamjena odgovora
    }
    whoClicked = "div-aw1"; isClicked = true;
    selectedAnswer = 1;
    document.getElementById("div-aw1").style.backgroundColor = "#FF3F5B";
    cnfButtonOn();    
}

document.getElementById("div-aw2").onclick = () => {
    if(whoClicked!=="div-aw2" && isClicked){
        document.getElementById(`${whoClicked}`).style.backgroundColor = "whitesmoke";
    }
    whoClicked = "div-aw2"; isClicked = true;
    selectedAnswer = 2;
    document.getElementById("div-aw2").style.backgroundColor = "#23CE14";
    cnfButtonOn();
}

document.getElementById("div-aw3").onclick = () => {
    if(whoClicked!=="div-aw3" && isClicked){
        document.getElementById(`${whoClicked}`).style.backgroundColor = "whitesmoke";
    }
    whoClicked = "div-aw3"; isClicked = true;
    selectedAnswer = 3;
    document.getElementById("div-aw3").style.backgroundColor = "#58A8E6";
    cnfButtonOn();
}

document.getElementById("div-aw4").onclick = () => {
    if(whoClicked!=="div-aw4" && isClicked){
        document.getElementById(`${whoClicked}`).style.backgroundColor = "whitesmoke";
    }
    whoClicked = "div-aw4"; isClicked = true;
    selectedAnswer = 4;
    document.getElementById("div-aw4").style.backgroundColor = "#FF9314";
    cnfButtonOn();
}

let add_part = localStorage.getItem("add_part");
let newTotal = 0; 
let lastTotal = localStorage.getItem("totalDiamonds");

//zamjena odgovora moguca je do pristiska na button confirm
document.getElementById("cnf-btn").onclick = () => {
    document.getElementById("next-btn").disabled = true;
    document.getElementById("next-btn").style.opacity = "0.2";

    setTimeout(async () => {      //API Documentation: Code 5: Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds
        let catId = Number(category)
        let difficulty;
        ++counter;
        if(counter < 6){
            difficulty = "easy";
        }else if(counter >= 6 && counter < 11){
            difficulty = "medium";
        }else{
            difficulty = "hard";
        }
        await fetchQuestionsAndAnswers(catId, difficulty);  //po pritisku na confirm poziva se funkcija fetchQuestionsAndAnswers() za dohvat sljedećeg pitanja
        document.getElementById("next-btn").disabled = false;
        document.getElementById("next-btn").style.opacity = "1";
    },4000) //5s-1s for response

    //provjera ispravnosti odabranog odgovora
    /*CORRECT ANSWER*/
    if (selectedAnswer === correctAnsID){
        document.getElementById(`div-aw${selectedAnswer}`).style.backgroundColor = "#27905B";
        document.getElementById(`abcd-${selectedAnswer}`).style.backgroundColor = "#27905B";
        document.getElementById("responseAlert-div").style.display = "flex";
        document.getElementById("responseAlert-div").style.backgroundColor = "#8FD0AF";
        document.getElementById("icon-check").innerHTML = "done";
        document.getElementById("icon-check").style.color = "#27905B";
        document.getElementById("checkResponse").innerHTML = "Correct answer";
        document.getElementById(`ch${selectedAnswer}`).innerHTML = "done";
        document.getElementById(`ch${selectedAnswer}`).style.color = "#27905B";

        newTotal = counter*add_part;
        document.getElementById("totalDiamond").innerHTML = String(counter*add_part);
        document.getElementById("totalPlus").innerHTML = String(add_part);
        document.getElementById("totalPlush").style.color = "black";
        document.getElementById("diamondPlus").style.color = "#4584B6";

        if(counter === 16){
            document.getElementById("next-btn").style.display = "none";
            totalSum = newTotal + Number(lastTotal);
            localStorage.setItem("totalDiamonds",String(totalSum));
            document.getElementById("end-btn").style.display = "flex";
        }else{
            document.getElementById("next-btn").style.display = "flex";
        }
    }else{/*INCORRECT ANSWER*/
        document.getElementById(`div-aw${correctAnsID}`).style.backgroundColor = "#27905B";//8FD0AF
        document.getElementById(`abcd-${correctAnsID}`).style.backgroundColor = "#27905B";
        document.getElementById(`div-aw${selectedAnswer}`).style.backgroundColor = "#C8021F";
        document.getElementById(`abcd-${selectedAnswer}`).style.backgroundColor = "#C8021F";
        
        document.getElementById("responseAlert-div").style.display = "flex";
        document.getElementById("responseAlert-div").style.backgroundColor = "#EEC0C7";
        document.getElementById("icon-check").innerHTML = "close";
        document.getElementById("icon-check").style.color = "#C8021F";
        document.getElementById("checkResponse").innerHTML = "Incorrect answer";
        document.getElementById(`ch${selectedAnswer}`).innerHTML = "close";
        document.getElementById(`ch${selectedAnswer}`).style.color = "#C8021F";

        if(counter > 5){                //napustena crvena zona - rjeseno prvih 5 easy pitanja za ostvarenje dobiti
            let lastTotal = localStorage.getItem("totalDiamonds");
            totalSum = newTotal + Number(lastTotal);
            localStorage.setItem("totalDiamonds",String(totalSum));   //dodavanje ostvarenog iznosa ukupnom iznosu korisnika
    }else{                              //inace 0 dobiti
            newTotal = 0;
        }
        document.getElementById("end-btn").style.display = "flex";
    }

    document.getElementById("cnf-btn").style.display = "none";
    document.getElementById("div-aw1").style.pointerEvents = "none";
    document.getElementById("div-aw2").style.pointerEvents = "none";
    document.getElementById("div-aw3").style.pointerEvents = "none";
    document.getElementById("div-aw4").style.pointerEvents = "none";
}

//pritisak na button next question
document.getElementById("next-btn").onclick = () => {
    showQuestionsAndAnswers();      //unos prethodno dohvacenih podataka (pitanja i ponudenih odgovora)
    if(counter < 6){                        //postavljanje vrijednosti trake za praćenje napretka u rjesavanju
        document.getElementById(`${Number(counter)}`).style.backgroundColor = "#C8021F";
    }else if(counter < 11){
        document.getElementById(`${Number(counter)}`).style.backgroundColor = "#ECC629";
    }else{
        document.getElementById(`${Number(counter)}`).style.backgroundColor = "#27905B";
    }

    document.getElementById("numQuest").innerHTML = String(counter);
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("cnf-btn").style.display = "initial";
    cnfButtonOff();
    defaultAnswers();
    document.getElementById("responseAlert-div").style.display = "none";
    for(let i=1;i<5;i++){
        document.getElementById(`ch${i}`).style.color = "white";
    }
    document.getElementById("totalPlush").style.color = "whitesmoke";
    document.getElementById("diamondPlus").style.color = "whitesmoke";
    
}

//zavrsetak kviza pobjedom ili gubitkom
document.getElementById("end-btn").onclick = () => {
    document.getElementById("congratAlert").style.display = "flex";
    document.getElementById("quiz-body").style.opacity = "0.4";
    document.getElementById("wonDiamonds").innerHTML = String(newTotal);
}

document.getElementById("btn-ok").onclick = () => {
    location.href = '../pages/categories.html';
}

document.getElementById("btn-end").onclick = () => {
    document.getElementById("quitAlert").style.display = "flex";
    document.getElementById("quiz-body").style.opacity = "0.4";
};

document.getElementById("btn-endQuiz").onclick = () => {
    localStorage.setItem("totalDiamonds",String(lastTotal));
    document.getElementById("quitAlert").style.display = "none";
    document.getElementById("quiz-body").style.opacity = "1";
    location.href = '../pages/categories.html';
};

document.getElementById("btn-cancleEnd").onclick = () => {
    document.getElementById("quitAlert").style.display = "none";
    document.getElementById("quiz-body").style.opacity = "1";
};

document.getElementById("btn-pay").onclick = () => {
    document.getElementById("inst-div").style.display = "none";
    document.getElementById("quiz-body").style.opacity = "1";
};

document.getElementById("btn-canclePay").onclick = () => {
    document.getElementById("inst-div").style.display = "none";
    document.getElementById("quiz-body").style.opacity = "1";
    location.href = '../pages/categories.html';
};
