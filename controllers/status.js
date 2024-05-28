const express = require("express");
const router = express.Router();

const Status = require("../models/status.js");

router.get("/new", (req, res) => {
    res.render("status/new.ejs");
  });

  router.post("/", async (req, res) => {
    try {

        if (!req.body.name.trim()) {
            throw new Error("Invalid input: The name field cannot be empty!");
          }

      await Status.create(req.body);
      res.redirect("/status");
    } catch (error) {
    //   console.log(error.message); // Logs the error message
      res.render("error.ejs", {error: error.message})
    }
  });

router.post("/", async (req, res) => {
  await Status.create(req.body);
  res.redirect("/status");
});



router.get("/", async (req, res) => {
  const foundStatus = await Status.find();
  res.render("status/index.ejs", { status: foundStatus });
});

module.exports = router;