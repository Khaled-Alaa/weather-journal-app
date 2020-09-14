const routes = function (app) {
  // GET route
  app.get("/all", function sendData(request, response) {
    response.send(projectData);
  });

  // POST route
  app.post("/addData", function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.city = request.body.city;
    projectData.feelings = request.body.feelings;
    response.end();
  });
};

module.exports = routes;
