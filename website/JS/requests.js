var requests = (function () {
  // Async POST
  const submitData = async (url = "", data = {}) => {
    const request = await fetch(url, {
      method: "POST",
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

  // Async GET
  const getTemp = async (baseURL, postCode, key) => {
    const response = await fetch(baseURL + postCode + ",us" + key);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    submitData,
    getTemp,
  };
})();
