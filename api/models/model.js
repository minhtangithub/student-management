const mongoose = require("mongoose");

//studentSchema
const studentSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: String,
  address: String,
  gender: String,
  _class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_Class",
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

//classSchema
const _classSchema = new mongoose.Schema({
  nameClass: {
    type: String,
    required: true,
    unique: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

//subjectSchema
const subjectSchema = new mongoose.Schema({
  idSubject: {
    type: String,
    required: true,
    unique: true,
  },
  nameSubject: {
    type: String,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  fifMinutesScore: Number, // 15 minutes score
  aLessonScore: Number, // a lesson score
  finalScore: Number, // final score
});

//settings
const settingSchema = new mongoose.Schema({
  maxNum: {
    type: Number,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
  //max Standard Score
  maxStSc: {
    type: Number,
    require: true,
  },
  //max Semester:
  maxSem: {
    type: Number,
    required: true,
  },
});

let Student = mongoose.model("Student", studentSchema);
let _Class = mongoose.model("_Class", _classSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let Setting = mongoose.model("Setting", settingSchema);

module.exports = { Student, _Class, Subject, Setting };
