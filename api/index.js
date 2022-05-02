const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const studentRoute = require("./routes/student");
const _classRoute = require("./routes/_class");
const subjectRoute = require("./routes/subject");

dotenv.config();
app.use(express.json());

//ROUTES
app.use("/api/students", studentRoute);
app.use("/api/classes", _classRoute);
app.use("/api/subjects", subjectRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});
