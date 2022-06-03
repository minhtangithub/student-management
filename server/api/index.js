const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const settingRoute = require("./routes/setting");
const studentRoute = require("./routes/student");
const gradeRoute = require("./routes/grade");
const classRoute = require("./routes/cClass");
const classListRoute = require("./routes/classList");
const subjectRoute = require("./routes/subject");
const termRoute = require("./routes/term");
const schoolYearRoute = require("./routes/schoolYear");
const scoreSubjectRoute = require("./routes/scoreSubject");
const scoreSchoolYearRoute = require("./routes/scoreSchoolYear");
const coEffRoute = require("./routes/coEff");
const reportedSubjectRoute = require("./routes/reportedSubject");
const reportedTermRoute = require("./routes/reportedTerm");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
dotenv.config();
app.use(express.json());

//ROUTES
app.use("/api/setting", settingRoute);
app.use("/api/student", studentRoute);
app.use("/api/grade", gradeRoute);
app.use("/api/class", classRoute);
app.use("/api/classList", classListRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/coEff", coEffRoute);
app.use("/api/term", termRoute);
app.use("/api/schoolYear", schoolYearRoute);
app.use("/api/scoreSubject", scoreSubjectRoute);
app.use("/api/scoreSchoolYear", scoreSchoolYearRoute);
app.use("/api/reportedSubject", reportedSubjectRoute);
app.use("/api/reportedTerm", reportedTermRoute);

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
