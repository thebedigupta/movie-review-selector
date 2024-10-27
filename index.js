import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const apiKey = process.env.API_KEY; // API Key from OMDB

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  console.log(req.body);
  try {
    const result = await axios.get(
      `https://www.omdbapi.com/?t=${req.body.mname}&plot=${req.body.plot}&type=${req.body.type}&apikey=${apiKey}`
    );
    console.log(result.data);
    res.render("index", { data: result.data });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server was started at ${PORT}`);
});
