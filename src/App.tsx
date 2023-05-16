import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/pages/route/ProtectedRoute";
import PublicRoute from "./components/pages/route/PublicRoute";
import Login from "./components/pages/auth/Login";
import ResuableComponents from "./components/pages/ResuableComponents";
import ManageRole from "./components/pages/Manage_Role";
import ManageComponents from "./components/pages/Manage_Components";
import EditManageComponents from "./components/pages/Edit_Manage_Components";
import LogOut from "./components/pages/auth/logOut";
import Search_List from "./components/pages/Search_List";
import View_Component from "./components/pages/View_Component";
import Dashboard from "./components/pages/Dashboard";
import AdminProtectRoute from "./components/pages/route/AdminProtectRoute";
import AssignPermissions from "./components/pages/Assign_Permissions";
import Report from "./components/pages/Report";
import Favourites from "./components/pages/Favourites";
import IssueTracker from "./components/pages/Issue_Tracker";
import AssignedForm from "./components/pages/IssueTracker/AssignedForm";
import ReportedForm from "./components/pages/IssueTracker/ReportedForm";
import AllIssuesForm from "./components/pages/IssueTracker/AllIssuesForm";
import PageNotFound from "./components/pages/Page_NotFound";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AssignPermissions"
            element={
              <AdminProtectRoute>
                <AssignPermissions />
              </AdminProtectRoute>
            }
          />
          <Route
            path="/Manage_Role"
            element={
              <AdminProtectRoute>
                <ManageRole />
              </AdminProtectRoute>
            }
          />

          <Route
            path="/Manage_Components"
            element={
              <ProtectedRoute>
                <ManageComponents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Edit_Components/:id"
            element={
              <ProtectedRoute>
                <EditManageComponents />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/logout" element={<LogOut />} />
          <Route
            path="/reusableComponent"
            element={
              <ProtectedRoute>
                <ResuableComponents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Search_list/:SeachWord"
            element={
              <ProtectedRoute>
                <Search_List />
              </ProtectedRoute>
            }
          />
          <Route
            path="/View_Component/:id"
            element={
              <ProtectedRoute>
                <View_Component />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Issue_Tracker"
            element={
              <ProtectedRoute>
                <IssueTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Issue_Tracker/AllIssues/:id"
            element={
              <ProtectedRoute>
                <AllIssuesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Issue_Tracker/Assigned/:id"
            element={
              <ProtectedRoute>
                <AssignedForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Issue_Tracker/Reported/:id"
            element={
              <ProtectedRoute>
                <ReportedForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
