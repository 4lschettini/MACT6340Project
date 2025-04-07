import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";
import cors from "cors";

let projects = []; // Default to an empty array

const app = express();
const port = 3000;

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// Establish database connection when the app starts
(async () => {
  try {
    console.log("Connecting to the database...");
    await db.connect();
    console.log("Database connected successfully.");
    projects = await db.getAllProjects();
    console.log("Projects loaded:", projects);
  } catch (err) {
    console.error("Error during app initialization:", err);
  }
})();

app.get("/", (req, res, next) => {
  try {
    if (projects.length === 0) {
      throw new Error("No projects found in the database.");
    }
    let featuredRand = Math.floor(Math.random() * projects.length);
    res.render("index.ejs", { featuredProject: projects[featuredRand] });
  } catch (err) {
    console.error("Error in / route:", err);
    next(err);
  }
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projectArray: projects });
});

app.get("/project/:id", (req, res, next) => {
  try {
    let id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1 || id > projects.length) {
      throw new Error("No project with that ID");
    }
    res.render("project.ejs", { project: projects[id - 1], which: id });
  } catch (err) {
    console.error("Error in /project/:id route:", err);
    next(err);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
  try {
    await utils.sendMessage(req.body.sub, req.body.txt);
    res.send({ result: "success" });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.send({ result: "failure" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  let msg = err.message;
  if (msg !== "No project with that ID") {
    msg =
      "There was an internal error. Apologies. We are working on cleaning up the mess.";
  }
  res.render("error.ejs", { msg: msg });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
