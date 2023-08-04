// const circles = document.querySelectorAll(".circle");
// const infoText = document.getElementById("infoText");
// const clearButton = document.getElementById("clearButton");

// function handleCircleClick(event) {
//   const clickedCircle = event.target;
//   const pointName = clickedCircle.getAttribute("data-point");

//   if (clickedCircle.classList.contains("selected")) {
//     clickedCircle.classList.remove("selected");
//     clickedCircle.removeAttribute("data-tooltip");
//   } else {

//     clickedCircle.classList.add("selected");
//     const pointNumber = pointName.slice(1);
//     clickedCircle.setAttribute("data-tooltip", pointNumber);
//   }

//   updateInfoText();
// }

// function updateInfoText() {
//   const selectedCircles = document.querySelectorAll(".circle.selected");
//   const selectedPoints = Array.from(selectedCircles).map((circle) =>
//     circle.getAttribute("data-point")
//   );
//   infoText.textContent = selectedPoints.join(", ");
// }

// circles.forEach((circle) => {
//   circle.addEventListener("click", handleCircleClick);
// });

// function handleClearClick() {

//   circles.forEach((circle) => {
//     circle.classList.remove("selected");
//     circle.removeAttribute("data-tooltip");
//   });

//   infoText.textContent = "";
// }

// clearButton.addEventListener("click", handleClearClick);

// Получаем все элементы с классом "circle"
const circles = document.querySelectorAll(".circle");
const clearButton = document.getElementById("clearButton");
const apiURL = "https://myfailemtions.npkn.net/b944ff/";

// Массив для хранения выбранных позиций
const selectedPositions = [];

// Функция для обработки клика на круг
function handleCircleClick(event) {
  const clickedCircle = event.target;
  const pointName = clickedCircle.getAttribute("data-point");

  // Если позиция уже выбрана, убираем ее из массива выбранных
  if (selectedPositions.includes(pointName)) {
    clickedCircle.classList.remove("selected");
    selectedPositions.splice(selectedPositions.indexOf(pointName), 1);
  } else {
    // Иначе добавляем позицию в массив выбранных
    clickedCircle.classList.add("selected");
    selectedPositions.push(pointName);
  }
}

// Добавляем обработчик клика на каждый круг
circles.forEach((circle) => {
  circle.addEventListener("click", handleCircleClick);
});

// Функция для обработки клика на кнопку "Очистить"
function handleClearClick() {
  // Очищаем выделение всех кругов
  circles.forEach((circle) => {
    circle.classList.remove("selected");
  });

  // Очищаем массив выбранных позиций
  selectedPositions.length = 0;
}

// Добавляем обработчик клика на кнопку "Очистить"
clearButton.addEventListener("click", handleClearClick);

// Функция для отправки POST-запроса на API
function sendPostRequest(url, data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from API:", data);
    })
    .catch((error) => {
      console.error("Error sending request:", error);
    });
}

// Добавляем обработчик клика на кнопку "Отправить"
const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", () => {
  sendPostRequest(apiURL, selectedPositions);
});
