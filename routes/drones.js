const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model.js");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .select({ name: 1 })
    .then((response) => {
      console.log(response);
      res.render("./drones/list.hbs", {
        allDrones: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("./drones/create-form.hbs");
});

router.post("/drones/create/", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  console.log(req.body);
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
    .then((response) => {
      console.log(`Dron creado ${response.name}`);
      res.redirect("/drones");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
