const mongoose = require("mongoose");

//Định nghĩa một cài đặt
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

//Định nghĩa một học sinh
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
});

//Định nghĩa một khối
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

//Định nghĩa một lớp học
const cClassSchema = new mongoose.Schema({
  nameClass: {
    type: String,
    required: true,
    // unique: true,
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
  // term: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Term",
  // },
  schoolYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolYear",
  },
});

//danh sách các lớp học
const classListSchema = new mongoose.Schema({
  idClass: {
    type: String,
    required: true,
    unique: true,
  },
  nameClass: {
    type: String,
    required: true,
    unique: true,
  },
});

//Định nghĩa một môn học
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
  //hệ số môn
  // coEffSubject: {
  //   type: Number,
  //   required: true,
  // },
});

//điểm 1 môn học của 1 học sinh --> dùng cho trang nhập điểm
const scoreSubjectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  cClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CClass",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
  scoreDetails: [
    {
      scoreName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      coEff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CoEff",
      },
    },
  ],
  avgScore: {
    type: Number,
    // required: true,
  },
});

// const scoreTermSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
//   },
//   cClass: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CClass",
//   },
//   scoreSubjects: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ScoreSubject",
//     },
//   ],
//   termAvgScore: {
//     type: Number,
//     required: true,
//   },
// });

//điểm theo năm học của học sinh --> dùng cho trang tra cứu
const scoreSchoolYearSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  cClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CClass",
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
  scoreTerms: [
    {
      scoreSubjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ScoreSubject",
        },
      ],
      termAvgScore: {
        type: Number,
        required: true,
      },
    },
  ],
  schoolYearAvgScore: {
    type: Number,
    required: true,
  },
});

//chi tiết điểm
// const scoreDetailSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
//   },
//   cClass: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CClass",
//   },
//   score: {
//     type: Number,
//     required: true,
//   },
//   coEffect: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "CoEffect",
//   },
// });

//Hệ số môn học
const coEffSchema = new mongoose.Schema({
  nameCoEff: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
    unique: true,
  },
});

//Định nghĩa học kỳ
const termSchema = new mongoose.Schema({
  nameTerm: {
    type: String,
    required: true,
    unique: true,
  },
});

//Định nghĩa năm học
const schoolYearSchema = new mongoose.Schema({
  nameSchYear: {
    type: String,
    required: true,
    unique: true,
  },
});

//Dữ liệu chứa báo cáo một môn học
const reportedSubjectSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  // grade: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Grade",
  // },
  cClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CClass",
  },
  totalStudents: {
    type: Number,
  },
  passed: {
    type: Number,
  },
  rate: {
    type: String,
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
  schoolYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SchoolYear",
  },
});

//Dữ liệu chứa báo cáo một học kỳ
const reportedTermSchema = new mongoose.Schema({
  cClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CClass",
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Term",
  },
  schoolYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schoolYear",
  },
  totalStudents: {
    type: Number,
  },
  passed: {
    type: Number,
  },
  rate: {
    type: String,
  },
});

let Setting = mongoose.model("Setting", settingSchema);
let Student = mongoose.model("Student", studentSchema);
let Grade = mongoose.model("Grade", gradeSchema);
let CClass = mongoose.model("CClass", cClassSchema);
let ClassList = mongoose.model("ClassList", classListSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let CoEff = mongoose.model("CoEff", coEffSchema);
let ScoreSubject = mongoose.model("ScoreSubject", scoreSubjectSchema);
let ScoreSchoolYear = mongoose.model("ScoreSchoolYear", scoreSchoolYearSchema);
let Term = mongoose.model("Term", termSchema);
let SchoolYear = mongoose.model("SchoolYear", schoolYearSchema);
let ReportedSubject = mongoose.model("ReportedSubject", reportedSubjectSchema);
let ReportedTerm = mongoose.model("ReportedTerm", reportedTermSchema);

module.exports = {
  Setting,
  Student,
  Grade,
  CClass,
  ClassList,
  Subject,
  ScoreSubject,
  ScoreSchoolYear,
  CoEff,
  Term,
  SchoolYear,
  ReportedSubject,
  ReportedTerm,
};
