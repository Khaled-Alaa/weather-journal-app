/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let key = "&appid=5d4580b67e0d7a721a96b71f0135bbb3";
let apiUrl = "http://localhost:3000";

// Create a new date instance dynamically with JS
let todayDate = new Date();
let month = todayDate.getMonth() + 1;
// because January month is = 0
let newDate = month + "." + todayDate.getDate() + "." + todayDate.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const postCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeather(baseURL, postCode, key).then(function (data) {
    postData(`${apiUrl}/addData`, {
      temperature: Math.round(data.main.temp - 273.15) + "&#8451",
      // to make the temperature in celsius and the number be integer
      date: newDate,
      feelings: feelings,
      city: data.name + " City",
    }).then(function () {
      updateUI();
    });
  });
}
// Async GET
const getWeather = async (baseURL, postCode, key) => {
  const response = await fetch(baseURL + postCode + ",us" + key);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST
const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await request.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Update UI
const updateUI = async () => {
  const request = await fetch(`${apiUrl}/all`);
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("city").innerHTML = allData.city;
    document.getElementById("content").innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
