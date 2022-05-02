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
  codeSubject: {
    type: String,
    required: true,
    unique: true,
  },
  nameSubject: {
    type: Number,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  ffMinutesScore: Number, // 15 minutes score
  aLessonScore: Number, // a lesson score
  finalScore: Number, // final score
});

let Student = mongoose.model("Student", studentSchema);
let _Class = mongoose.model("_Class", _classSchema);
let Subject = mongoose.model("Subject", subjectSchema);

module.exports = { Student, _Class, Subject };
