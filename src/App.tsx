import React from "react";
import { Route, Routes } from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import PrivateRoute from "./utils/PrivateRoute";
import Toolbar from "@mui/material/Toolbar";
import NavBar from "./components/NavBar/NavBar";

// Public routes
import HomepageCarousel from "./components/HomepageCarousel/HomepageCarousel";
import Workouts from "./pages/Workouts/Workouts";
import Pricing from "./pages/Pricing/Pricing";
import Schedule from "./pages/Schedule/Schedule";
import ClassDetails from "./pages/ClassDetails/ClassDetails";
import Instructors from "./pages/Instructors/Instructors";
import InstructorProfile from "./pages/Instructors/InstructorProfile";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";

// Private routes
import Reviews from "./pages/Reviews/Reviews";
import Transactions from "./pages/Transactions/Transactions";
import Bookings from "./pages/Bookings/Bookings";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";

const App = () => {
  const methods = useForm();

  return (
    <>
        <Toolbar/>
        <NavBar />

        <FormProvider {...methods}>
            <Routes>
                <Route path="/" element={<HomepageCarousel/>} />
                <Route path="/workouts" element={<Workouts/>} />
                <Route path="/pricing" element={<Pricing/>} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/class/:id" element={<ClassDetails/>} />
                <Route path="/instructors" element={<Instructors/>} />
                <Route path="/instructor/:name" element={<InstructorProfile/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<CreateAccount/>} />

                <React.Fragment>
                    <Route path="/reviews" element={
                                  <PrivateRoute>
                                      <Reviews/>
                                  </PrivateRoute>} />
                    <Route path="/transactions" element={
                                  <PrivateRoute>
                                      <Transactions/>
                                  </PrivateRoute>} />
                    <Route path="/bookings" element={
                                  <PrivateRoute>
                                      <Bookings/>
                                  </PrivateRoute>} />
                    <Route path="/profile" element={
                                  <PrivateRoute>
                                      <Profile/>
                                  </PrivateRoute>} />
                </React.Fragment>
            </Routes>
        </FormProvider>
        <Footer/>
    </>
  );
};

export default App;
