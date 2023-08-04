const circles = document.querySelectorAll(".circle");
const clearButton = document.getElementById("clearButton");
const apiURL = "https://myfailemtions.npkn.net/b944ff/";

const selectedPositions = {};

function handleCircleClick(event) {
  const clickedCircle = event.target;
  const pointName = clickedCircle.getAttribute("data-point");

  if (selectedPositions[pointName]) {
    clickedCircle.classList.remove("selected");
    delete selectedPositions[pointName];
  } else {
    clickedCircle.classList.add("selected");
    selectedPositions[pointName] = true;
  }
}

circles.forEach((circle) => {
  circle.addEventListener("click", handleCircleClick);
});

function handleClearClick() {
  circles.forEach((circle) => {
    circle.classList.remove("selected");
  });

  for (const point in selectedPositions) {
    if (selectedPositions.hasOwnProperty(point)) {
      delete selectedPositions[point];
    }
  }
}

clearButton.addEventListener("click", handleClearClick);

function sendPostRequest(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error sending request:", error);
      throw error;
    });
}

const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", () => {
  Promise.all([sendPostRequest(apiURL, selectedPositions)])
    .then((results) => {
      console.log("Results:", results);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
