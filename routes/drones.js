const express = require("express");
const router = express.Router();

const Drone = require("../models/Drone.model.js");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    
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

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const oneDrone = await Drone.findById(req.params.id)
    res.render("drones/update-form.hbs", {
     oneDrone
    })
  } catch(error){
    next(error)
  }

});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  console.log(req.body)
  const droneId = req.params.id
  const {name, propellers, maxSpeed} = req.body
  try {
    await Drone.findByIdAndUpdate(droneId, {
      name: name,
      propellers: propellers,
      maxSpeed: maxSpeed
    })
    res.redirect("/drones")
    
  } catch(error){
    next(error)
  }


});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    await Drone.findByIdAndDelete(req.params.id)
    console.log(req.params.id)
    console.log("Pedro: hemos borrado el drone")
    res.redirect("/drones")
  } catch (error) {
    next(error)
  }
  
});

module.exports = router;
