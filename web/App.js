// Função para embaralhar arrays
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Configurando retorno do objeto
const urlParams = new URLSearchParams(window.location.search);
const simuladoFile = urlParams.get('simulado');
let requestURL = `./${simuladoFile + ".json"}`;
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

let title = document.querySelector("title")
title.textContent = "Simulado " + simuladoFile.substring(3)

request.onload = function () {
  let quests = request.response
  showContent(quests)
  //console.log(quests["quests"])
}
//----

let currentQuestionIndex = 0
let section = document.querySelector("section")
section.setAttribute("class", "main")

const showContent = (jsonObj) => {
  let content = jsonObj["quests"]
  // shuffleArray(content)  //Embaralhar questões

  let menuTime = document.createElement("div")
  let menuTimebutom = document.createElement("a")
  let menuTimeTime = document.createElement("div")

  menuTime.setAttribute("class", "menuTime")
  menuTimebutom.textContent = "Sair"
  menuTimebutom.setAttribute("href", "/")
  menuTimebutom.setAttribute("class", "btnMenu")
  menuTimeTime.setAttribute("id", "timer")

  menuTime.appendChild(menuTimebutom)
  menuTime.appendChild(menuTimeTime)
  section.appendChild(menuTime)

  let duration = 60 * 40 // Converter para segundos
  display = document.querySelector('#timer') // selecionando o timer
  startTimer(duration, display) // iniciando o timer

  content.forEach((question, index) => {
    // Embaralhar opções
    shuffleArray(question.options)

    let myDivQuest = document.createElement("div")
    myDivQuest.setAttribute("class", "question hidden")
    myDivQuest.setAttribute("id", "question" + index)

    let mySpan = document.createElement("span")
    mySpan.setAttribute("id", "result" + (index + 1))

    let myH2 = document.createElement("h2")
    myH2.textContent = (index + 1) + ". " + question.quest
    myH2.appendChild(mySpan)
    myDivQuest.appendChild(myH2)

    if (question.img != "") {
      let myImg = document.createElement("img")
      myImg.setAttribute("src", question.img)
      myDivQuest.appendChild(myImg)
    }

    question.options.forEach((option, j) => {
      let myDivOption = document.createElement("div")
      let myInput = document.createElement("input")
      let myLabel = document.createElement("label")

      myDivOption.setAttribute("class", "myDivOption")

      myInput.setAttribute("type", "radio")
      myInput.setAttribute("name", "option" + index)
      myInput.setAttribute("value", option)
      myInput.setAttribute("id", "option" + index + "_" + j)

      myLabel.setAttribute("for", "option" + index + "_" + j)
      myLabel.textContent = option

      myDivOption.appendChild(myInput)
      myDivOption.appendChild(myLabel)
      myDivQuest.appendChild(myDivOption)
    })

    section.appendChild(myDivQuest)
  })

  document.getElementById("question0").classList.remove("hidden")
}

const startTimer = (duration, display) => {
  let timer = duration, minutes, seconds
  setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds
    display.textContent = minutes + ":" + seconds
    if (--timer < 0) {
      timer = duration
    }
  }, 1000)
}

let clicked = false
const showResult = () => {
  if (!clicked) {
    let quests = request.response.quests
    let score = 0
    let totalQuestions = quests.length

    for (let i = 0; i < quests.length; i++) {
      let options = document.getElementsByName("option" + i)
      let result = document.getElementById("result" + (i + 1))
      let correctAnswer = quests[i].correct
      //console.log(correctAnswer)

      for (let option of options) {
        if (option.checked) {
          if (option.value === correctAnswer) {
            score++
            result.innerText = "Correto"
            result.style.color = "green"
          } else {
            result.innerText = "Errado: " + correctAnswer
            result.style.color = "red"
          }
        }
      }
    }

    let resultSection = document.createElement("div")
    resultSection.setAttribute("id", "resultSection")
    resultSection.textContent = `Você acertou ${score} de ${totalQuestions} questões.`

    let btnReload = document.createElement("button")
    btnReload.setAttribute("onclick", "location.reload()")
    btnReload.textContent = "Refazer"
    resultSection.appendChild(btnReload)
    section.appendChild(resultSection)
    clicked = true
  }
}

const nextQuestion = () => {
  let totalQuestions = document.getElementsByClassName("question").length
  if (currentQuestionIndex < totalQuestions - 1) {
    document.getElementById("question" + currentQuestionIndex).classList.add("hidden")
    currentQuestionIndex++
    document.getElementById("question" + currentQuestionIndex).classList.remove("hidden")
  }

  if (currentQuestionIndex === totalQuestions - 1) {
    document.getElementById("nextBtn").classList.add("hidden")
    document.getElementById("finishBtn").classList.remove("hidden")
  }

  if (currentQuestionIndex > 0) {
    document.getElementById("prevBtn").classList.remove("hidden")
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex > 0) {
    document.getElementById("question" + currentQuestionIndex).classList.add("hidden")
    currentQuestionIndex--
    document.getElementById("question" + currentQuestionIndex).classList.remove("hidden")
  }

  if (currentQuestionIndex === 0) {
    document.getElementById("prevBtn").classList.add("hidden")
  }

  if (currentQuestionIndex < document.getElementsByClassName("question").length - 1) {
    document.getElementById("nextBtn").classList.remove("hidden")
    document.getElementById("finishBtn").classList.add("hidden")
  }
};
