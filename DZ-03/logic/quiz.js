function cnfButtonOn(){
    document.getElementById("cnf-btn").disabled = false;
    document.getElementById("cnf-btn").style.opacity = "1";
}

function cnfButtonOff(){
    document.getElementById("cnf-btn").disabled = true;
    document.getElementById("cnf-btn").style.opacity = "0.2";
}

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

/*FETCH QUESTIONS and ANSWERS*/
let questions;
let correctAnsID;
let counter = 0;
const category = localStorage.getItem("categoryId");


//API Documentation: Code 5: Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds
async function fetchQuestionsAndAnswers(catId, difficulty) {
    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${catId}&difficulty=${difficulty}`;
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        questions = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
}

function showQuestionsAndAnswers(){
    const questDiv = document.getElementById("quest-p");
    questDiv.innerHTML = questions.results[0].question;

    correctAnsID = Math.floor(Math.random() * (5 - 1) + 1);
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


//answer clicked
let isClicked = false;
let whoClicked = "";
let selectedAnswer;

document.getElementById("div-aw1").onclick = () => {
    if(whoClicked!=="div-aw1" && isClicked){
        document.getElementById(`${whoClicked}`).style.backgroundColor = "whitesmoke";
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

//confirm clicked
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
        await fetchQuestionsAndAnswers(catId, difficulty);
        document.getElementById("next-btn").disabled = false;
        document.getElementById("next-btn").style.opacity = "1";
    },4000) //5s-1s for response

    //checking selected answer
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
        document.getElementById("next-btn").style.display = "flex";
        if(counter === 16){
            document.getElementById("next-btn").style.display = "none";
            let lastTotal = localStorage.getItem("totalDiamonds");
            totalSum = newTotal + Number(lastTotal);
            localStorage.setItem("totalDiamonds",String(totalSum));
            document.getElementById("end-btn").style.display = "flex";
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

        if(counter > 5){//red zone left
            let lastTotal = localStorage.getItem("totalDiamonds");
            totalSum = newTotal + Number(lastTotal);
            localStorage.setItem("totalDiamonds",String(totalSum));
        }else{
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

//next question
document.getElementById("next-btn").onclick = () => {
    showQuestionsAndAnswers();
    if(counter < 6){
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

//ending quiz after winning or losing
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
