const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");

// express app setup
const PORT = 3000;

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    // res.send("App Work");
    res.render("index.ejs")
});

app.listen(PORT, () => {
    console.log(`server is running on : http://localhost:${PORT}/`);
});