// Configurando retorno do objeto
let requestURL = "./data.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  let quests = request.response;
  showContent(quests);
  //console.log(quests["quests"])
};
//----

let currentQuestionIndex = 0;
let section = document.querySelector("section");
section.setAttribute("class", "main");

const showContent = (jsonObj) => {
  let content = jsonObj["quests"];

  content.forEach((question, index) => {
    let myDivQuest = document.createElement("div");
    myDivQuest.setAttribute("class", "question hidden");
    myDivQuest.setAttribute("id", "question" + index);
    
    let mySpan = document.createElement("span");
    mySpan.setAttribute("id", "result" + (index + 1));

    let myH2 = document.createElement("h2");
    myH2.textContent = (index + 1) + ". " + question.quest;
    myH2.appendChild(mySpan);
    myDivQuest.appendChild(myH2);

    question.options.forEach((option, j) => {
      let myDivOption = document.createElement("div");
      let myInput = document.createElement("input");
      let myLabel = document.createElement("label");

      myDivOption.setAttribute("class", "myDivOption");

      myInput.setAttribute("type", "radio");
      myInput.setAttribute("name", "option" + index);
      myInput.setAttribute("value", option);
      myInput.setAttribute("id", "option" + index + "_" + j);

      myLabel.setAttribute("for", "option" + index + "_" + j);
      myLabel.textContent = option;

      myDivOption.appendChild(myInput);
      myDivOption.appendChild(myLabel);
      myDivQuest.appendChild(myDivOption);
    });

    section.appendChild(myDivQuest);
  });

  document.getElementById("question0").classList.remove("hidden");
};

let clicked = false
const showResult = () => {
  if (!clicked) {
    let quests = request.response.quests;
    let score = 0;
    let totalQuestions = quests.length; 
    
    for (let i = 0; i < quests.length; i++) {
      let options = document.getElementsByName("option" + i);
      let result = document.getElementById("result" + (i + 1));
      let correctAnswer = quests[i].correct; // Supondo que o objeto JSON tenha uma propriedade 'correct'
      
      for (let option of options) {
        if (option.checked) {
          if (option.value === correctAnswer) {
            score++;
            result.innerText = "Correto";
            result.style.color = "green";
          } else {
            result.innerText = "Errado";
            result.style.color = "red";
          }
        }
      }
    }
    let resultSection = document.createElement("div");
    resultSection.setAttribute("id", "resultSection");
    resultSection.textContent = `Você acertou ${score} de ${totalQuestions} questões.`;
    section.appendChild(resultSection);

    clicked = true
  }
 
};

const nextQuestion = () => {
  let totalQuestions = document.getElementsByClassName("question").length;
  if (currentQuestionIndex < totalQuestions - 1) {
    document.getElementById("question" + currentQuestionIndex).classList.add("hidden");
    currentQuestionIndex++;
    document.getElementById("question" + currentQuestionIndex).classList.remove("hidden");
  }

  if (currentQuestionIndex === totalQuestions - 1) {
    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("finishBtn").classList.remove("hidden");
  }

  if (currentQuestionIndex > 0) {
    document.getElementById("prevBtn").classList.remove("hidden");
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex > 0) {
    document.getElementById("question" + currentQuestionIndex).classList.add("hidden");
    currentQuestionIndex--;
    document.getElementById("question" + currentQuestionIndex).classList.remove("hidden");
  }

  if (currentQuestionIndex === 0) {
    document.getElementById("prevBtn").classList.add("hidden");
  }

  if (currentQuestionIndex < document.getElementsByClassName("question").length - 1) {
    document.getElementById("nextBtn").classList.remove("hidden");
    document.getElementById("finishBtn").classList.add("hidden");
  }
};