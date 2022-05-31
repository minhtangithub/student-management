import React from "react";
import { Homepage } from "../pages/Homepage";
import { Setting } from "../pages/Setting";
import { Add } from "../pages/add/Add";
import { AddClass } from "../pages/add/AddClass";
import { CreateClass } from "../pages/add/CreateClass";
import { AddStudent } from "../pages/add/AddStudent";
import { ClassList } from "../pages/setting-page/ClassList";
import { SubjectList } from "../pages/setting-page/SubjectList";
import { SettingList } from "../pages/setting-page/SettingList";
import { Search } from "../pages/search/Search";
import { Score } from "../pages/score/Score";
import { CreateScore } from "../pages/score/CreateScore";
import { Report } from "../pages/report/Report";
import { ReportSubject } from "../pages/report/ReportSubject";
import { CreateReportSubject } from "../pages/report/create-report/CreateReportSubject";
import { ReportTerm } from "../pages/report/ReportTerm";
import { CreateReportTerm } from "../pages/report/create-report/CreateReportTerm";
import { NotFound } from "../pages/NotFound";

import { Switch, Route } from "react-router-dom";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage}></Route>
      <Route path="/setting" exact component={Setting}></Route>
      <Route path="/setting/class-list" component={ClassList}></Route>
      <Route path="/setting/subject-list" component={SubjectList}></Route>
      <Route path="/setting/setting-list" component={SettingList}></Route>
      <Route path="/add" exact component={Add}></Route>
      <Route path="/add/add-student" component={AddStudent}></Route>
      <Route path="/add/add-class" exact component={AddClass}></Route>
      <Route
        path="/add/add-class/:className/:grade/:schoolYear"
        component={CreateClass}
      ></Route>
      <Route path="/search" component={Search}></Route>
      <Route path="/score" exact component={Score}></Route>
      <Route
        path="/score/:className/:subject/:term/:schoolYear"
        component={CreateScore}
      ></Route>
      <Route path="/report" exact component={Report}></Route>
      <Route
        path="/report/report-subject"
        exact
        component={ReportSubject}
      ></Route>
      <Route
        path="/report/report-subject/:subject/:term/:schoolYear"
        component={CreateReportSubject}
      ></Route>
      <Route path="/report/report-term" exact component={ReportTerm}></Route>
      <Route
        path="/report/report-term/:term/:schoolYear"
        component={CreateReportTerm}
      ></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  );
};
