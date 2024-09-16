import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/Login";
import DashboardHome from "../features/dashboard/DashboardHome";
import { useSelector } from "react-redux";
import SignUp from "../features/auth/SignUp";
import Projects from "../features/dashboard/Projects";
import AddProject from "../features/dashboard/AddProject";
import EditProject from "../features/dashboard/EditProject";
import Estimates from "../features/dashboard/Estimates";
import AddEstimate from "../features/dashboard/AddEstimate";
import EditEstimate from "../features/dashboard/EditEstimate";

const AppRoutes = () => {
	const { isAuthenticated } = useSelector(state => state.auth);
	
	const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null;
	return <Router>
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
				path="/dashboard"
				element={
					<PrivateRoute element={DashboardHome} />
				}
			/>

			<Route
				path="/projects"
				element={
					<PrivateRoute element={Projects} />
				}
			/>

			<Route
				path="/add-project"
				element={
					<PrivateRoute element={AddProject} />
				}
			/>

			<Route
				path="/edit-project/:id"
				element={
					<PrivateRoute element={EditProject} />
				}
			/>

			<Route
				path="/estimates"
				element={
					<PrivateRoute element={Estimates} />
				}
			/>

			<Route
				path="/add-estimate"
				element={
					<PrivateRoute element={AddEstimate} />
				}
			/>

			<Route
				path="/edit-estimate/:id"
				element={
					<PrivateRoute element={EditEstimate} />
				}
			/>
			
			<Route path="/" element={(isAuthenticated || userInfo?.isAuthenticated) ? <Navigate to={"/dashboard"} /> : <Login />} />
		</Routes>
	</Router>
}

export default AppRoutes;
