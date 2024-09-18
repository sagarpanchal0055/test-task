import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import FullScreenLoader from "../components/FullScreenLoader";
import NotFoundPage from "../features/NotFoundPage";

const Login = lazy(() => import("../features/auth/Login"));
const SignUp = lazy(() => import("../features/auth/SignUp"));
const ForgotPassword = lazy(() => import("../features/auth/ForgotPassword"));
const DashboardHome = lazy(() => import("../features/dashboard/DashboardHome"));
const Projects = lazy(() => import("../features/dashboard/Projects"));
const AddProject = lazy(() => import("../features/dashboard/AddProject"));
const EditProject = lazy(() => import("../features/dashboard/EditProject"));
const Estimates = lazy(() => import("../features/dashboard/Estimates"));
const AddEstimate = lazy(() => import("../features/dashboard/AddEstimate"));
const EditEstimate = lazy(() => import("../features/dashboard/EditEstimate"));

const AppRoutes = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;

  return (
    <Router>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route
            path="/login"
            element={(isAuthenticated || userInfo?.isAuthenticated) ? <Navigate to={"/dashboard"} /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={(isAuthenticated || userInfo?.isAuthenticated) ? <Navigate to={"/dashboard"} /> : <SignUp />}
          />
          <Route
            path="/forgot-password"
            element={(isAuthenticated || userInfo?.isAuthenticated) ? <Navigate to={"/dashboard"} /> : <ForgotPassword />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={DashboardHome} />}
          />
          <Route
            path="/projects"
            element={<PrivateRoute element={Projects} />}
          />
          <Route
            path="/projects/add-project"
            element={<PrivateRoute element={AddProject} />}
          />
          <Route
            path="/projects/edit-project/:id"
            element={<PrivateRoute element={EditProject} />}
          />
          <Route
            path="/estimates"
            element={<PrivateRoute element={Estimates} />}
          />
          <Route
            path="/estimates/add-estimate"
            element={<PrivateRoute element={AddEstimate} />}
          />
          <Route
            path="/estimates/edit-estimate/:id"
            element={<PrivateRoute element={EditEstimate} />}
          />
          <Route
            path="/"
            element={(isAuthenticated || userInfo?.isAuthenticated) ? <Navigate to={"/dashboard"} /> : <Login />}
          />
					<Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
