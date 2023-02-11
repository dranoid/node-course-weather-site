const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.getElementById("message-1");
const msgTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msgOne.textContent = "";
  msgTwo.textContent = "loading message...";
  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then(({ error, forecast, location }) => {
      if (error) {
        msgTwo.textContent = "";
        msgOne.textContent = "Error: " + error;
        return;
      }
      msgOne.textContent = location;
      msgTwo.textContent = forecast;
    });
  });
});
