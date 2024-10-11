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

let section = document.querySelector("section");
section.setAttribute("class", "main");

const showContent = (jsonObj) => {
  let content = jsonObj["quests"];

  let btn = document.createElement("button");
  btn.setAttribute("onclick", "showResult()");
  btn.textContent = "Finalizar";
  section.appendChild(btn);
  
  for (let i = 0; i < content.length; i++) {
    let number = i + 1;
    
    let myDivQuest = document.createElement("div");
    let myH2 = document.createElement("h2");
    let mySpan = document.createElement("span");

    myDivQuest.setAttribute("class", "myDivQuest");
    mySpan.setAttribute("id", "result" + number);

    myH2.textContent = number + ". " + content[i].quest;
    myH2.appendChild(mySpan);
    myDivQuest.appendChild(myH2);
    let options = content[i].options;
    for (let j = 0; j < options.length; j++) {
      let myDivOption = document.createElement("div");
      let myInput = document.createElement("input");
      let myLabel = document.createElement("label");

      myDivOption.setAttribute("class", "myDivOption");

      myInput.setAttribute("type", "radio");
      myInput.setAttribute("name", "option" + i);
      myInput.setAttribute("value", options[j]);
      myInput.setAttribute("id", "option" + i + "_" + j);

      myLabel.setAttribute("for", "option" + i + "_" + j);
      myLabel.textContent = options[j];

      myDivOption.appendChild(myInput);
      myDivOption.appendChild(myLabel);
      myDivQuest.appendChild(myDivOption);
    }

    section.appendChild(myDivQuest);
  }
};

const showResult = () => {
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
};
