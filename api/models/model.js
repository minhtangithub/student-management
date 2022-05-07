const mongoose = require("mongoose");

//settings
const settingSchema = new mongoose.Schema({
  idSet: {
    type: String,
    required: true,
    unique: true,
  },
  nameSet: {
    type: String,
    required: true,
    unique: true,
  },
  valueSet: {
    type: Number,
    required: true,
  },
});

//classSchema
const _classSchema = new mongoose.Schema({
  nameClass: {
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
  // fifMinutesScore: Number, // 15 minutes score
  // aLessonScore: Number, // a lesson score
  // finalScore: Number, // final score
});

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

const gradeSchema = new mongoose.Schema({
  gradeName: {
    type: Number,
    required: true,
    unique: true,
  },
  _classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Class",
    },
  ],
});

const termSchema = new mongoose.Schema({
  nameTerm: {
    type: String,
    required: true,
    unique: true,
  },
  _classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Class",
    },
  ],
});

let Student = mongoose.model("Student", studentSchema);
let _Class = mongoose.model("_Class", _classSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let Setting = mongoose.model("Setting", settingSchema);
let Grade = mongoose.model("Grade", gradeSchema);
let Term = mongoose.model("Term", termSchema);

module.exports = { Student, _Class, Subject, Setting, Grade, Term };
