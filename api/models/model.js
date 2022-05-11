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
  _classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Class",
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
  _classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Class",
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
  _classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Class",
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

let Student = mongoose.model("Student", studentSchema);
let _Class = mongoose.model("_Class", _classSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let Setting = mongoose.model("Setting", settingSchema);
let Grade = mongoose.model("Grade", gradeSchema);
let Term = mongoose.model("Term", termSchema);
let SchoolYear = mongoose.model("SchoolYear", schoolYearSchema);
let ReportedSubject = mongoose.model("ReportedSubject", reportedSubjectSchema);
let ReportedTerm = mongoose.model("ReportedTerm", reportedTermSchema);
// let ScoreSubject = mongoose.model("ScoreSubjectSchema", scoreSubjectSchema);
let ScoreSheet = mongoose.model("ScoreSheetSchema", scoreSheetSchema);
let CoEffect = mongoose.model("CoEffectSchema", coEffectSchema);

module.exports = {
  Student,
  _Class,
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
