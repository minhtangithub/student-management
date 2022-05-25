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
  cClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CClass",
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

//gradeSchema
const gradeSchema = new mongoose.Schema({
  gradeName: {
    type: Number,
    required: true,
    unique: true,
  },
  cClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CClass",
    },
  ],
});

//classSchema
const cClassSchema = new mongoose.Schema({
  nameClass: {
    type: String,
    required: true,
    unique: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  schoolYears: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolYear",
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
});

// //Bảng điểm môn
// const scoreSubjectSchema = new mongoose.Schema({
//   _classes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "_Class",
//     },
//   ],
//   subjects: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subject",
//     },
//   ],
//   terms: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Term",
//     },
//   ],
//   schoolYears: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SchoolYear",
//     },
//   ],
// });

//Bảng điểm
const scoreSheetSchema = new mongoose.Schema({
  cClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CClass",
    },
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  fifMinutesScore: Number, // 15 minutes score
  aLessonScore: Number, // a lesson score
  finalScore: Number, // final score
  mediumScore: Number, // medium score
});

//Hệ số môn học
const coEffectSchema = new mongoose.Schema({
  nameCoEff: {
    type: String,
    required: true,
    unique: true,
  },
  Value: {
    type: Number,
  },
});

const termSchema = new mongoose.Schema({
  nameTerm: {
    type: String,
    required: true,
    unique: true,
  },
  cClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CClass",
    },
  ],
});

const schoolYearSchema = new mongoose.Schema({
  nameSchYear: {
    type: String,
    required: true,
    unique: true,
  },
});

const reportedSubjectSchema = new mongoose.Schema({
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  cClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CClass",
    },
  ],
  totalStudents: {
    type: Number,
  },
  passed: {
    type: Number,
  },
  rate: {
    type: Number,
  },
});

const reportedTermSchema = new mongoose.Schema({
  terms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Term",
    },
  ],
  schoolYears: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schoolYear",
  },
  cClasses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CClass",
    },
  ],
  totalStudents: {
    type: Number,
  },
  passed: {
    type: Number,
  },
  rate: {
    type: Number,
  },
});

let Setting = mongoose.model("Setting", settingSchema);
let Student = mongoose.model("Student", studentSchema);
let Grade = mongoose.model("Grade", gradeSchema);
let CClass = mongoose.model("CClass", cClassSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let Term = mongoose.model("Term", termSchema);
let SchoolYear = mongoose.model("SchoolYear", schoolYearSchema);
let ReportedSubject = mongoose.model("ReportedSubject", reportedSubjectSchema);
let ReportedTerm = mongoose.model("ReportedTerm", reportedTermSchema);
// let ScoreSubject = mongoose.model("ScoreSubjectSchema", scoreSubjectSchema);
let ScoreSheet = mongoose.model("ScoreSheetSchema", scoreSheetSchema);
let CoEffect = mongoose.model("CoEffectSchema", coEffectSchema);

module.exports = {
  Student,
  CClass,
  Subject,
  Setting,
  Grade,
  Term,
  SchoolYear,
  ReportedSubject,
  ReportedTerm,
  ScoreSheet,
  CoEffect,
};
