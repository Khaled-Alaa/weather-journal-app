const config = {
  apiURL: "https://api.openweathermap.org/data/2.5/weather?zip=",
  apiKey: "&appid=5d4580b67e0d7a721a96b71f0135bbb3",
  serverUrl: "http://localhost:3000",
};

(function (requests, config) {
  /* Config Obj */

  // Create a new date instance dynamically with JS
  let todayDate = new Date();
  let month = todayDate.getMonth() + 1;
  // because January month is = 0
  let newDate =
    month + "." + todayDate.getDate() + "." + todayDate.getFullYear();

  document.getElementById("generate").addEventListener("click", handleOnClick);

  function handleOnClick() {
    const postCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    requests
      .getTemp(config.apiURL, postCode, config.apiKey)
      .then(function (data) {
        requests
          .submitData(`${config.serverUrl}/addData`, {
            temperature: Math.round(data.main.temp - 273.15) + "&#8451",
            // to make the temperature in celsius and the number be integer
            date: newDate,
            feelings: feelings,
            city: data.name + " City",
          })
          .then(function () {
            updateScreen();
          });
      });
  }

  // Update UI
  const updateScreen = async () => {
    const request = await fetch(`${config.serverUrl}/all`);
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
})(window.requests, config);
