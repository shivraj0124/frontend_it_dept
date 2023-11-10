import React from "react"
import './stylesheet.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast';
import {UserProvider } from './Components/Admin/ContextP'
import Home from "./Components/HomeComponents/Home"
import FacultyDetails from "./Components/NavComponents/FacultyDetails"
import Curriculum from "./Components/NavComponents/Curriculum"
import Contact from "./Components/NavComponents/Contact"
import Layout from "./Components/Layout"
import Login from "./Components/LoginSignUp/Login"
import AddFaculty from "./Components/Admin/AddFaculty"
import Dashboard from "./Components/Admin/Dashboard"
import Sidebar from "./Components/Admin/Sidebar"
import AddNotes from "./Components/Admin/AddNotes"
import AddQP from "./Components/Admin/AddQP"
import AddTT from "./Components/Admin/AddTT"
import AddNotice from "./Components/Admin/AddNotice"
import ManageFaculty from "./Components/Admin/ManageFaculty"
// import 'react-toastify/dist/ReactToastify.css';
import ManageNotes from "./Components/Admin/ManageNotes"
import ManageQP from "./Components/Admin/ManageQP"
import ManageNotice from "./Components/Admin/ManageNotice"
import ManageTimeTable from "./Components/Admin/ManageTimeTable"
import AddAchievement from "./Components/Admin/AddAchievement"
import ManageAchievements from "./Components/Admin/ManageAchievements"
import StudentSidebar from "./Components/Students/StudentSidebar";
import StudentNotes from "./Components/Students/StudentNotes";
import AddStudent from "./Components/Admin/AddStudent";
import ManageStudents from "./Components/Admin/ManageStudents";
import AdminLogin from "./Components/LoginSignUp/AdminLogin";
import FacultyLogin from "./Components/LoginSignUp/FacultyLogin";
import LoginForm from "./Components/LoginSignUp/LoginForm";
import StudentQuesPaper from "./Components/Students/StudentQuesPaper";
import TimeTable from "./Components/Students/TimeTable";
import FacultySidebar from "./Components/Faculty/FacultySidebar";
import FAddNotes from "./Components/Faculty/FAddNotes";
import FAddQP from "./Components/Faculty/FAddQP";
import FManageNotes from "./Components/Faculty/FManageNotes";
import FManageQP from "./Components/Faculty/FManageQP";
import FAddNotice from "./Components/Faculty/FAddNotice";
import FManageNotices from "./Components/Faculty/FManageNotices";
import StudentNotices from "./Components/Students/StudentNotices";
import MiniphotoG from "./Components/HomeComponents/MiniphotoG"
import PhotoGallery from "./Components/Admin/PhotoGallery";
import AcademicAchievements from "./Components/Admin/AcademicAchievements";
import AdminProfile from "./Components/Admin/AdminProfile";
import FacultyProfile from "./Components/Faculty/FacultyProfile";
import StudentProfile from "./Components/Students/StudentProfile";
import TestUpload from "../src/Components/TestUpload"
function App() {
  
  return (
    <>
      <UserProvider >
      <BrowserRouter >
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route exact path="/" element={<Home />} ></Route>
              <Route exact path='/FacultyDetails' element={<FacultyDetails />}></Route>
            <Route exact path='/Curriculum' element={<Curriculum />}></Route>
            <Route exact path='/Contact' element={<Contact />}></Route>
              <Route exact path='/MiniphotoG' element={<MiniphotoG />}></Route>
            <Route exact path='/Login' element={<LoginForm />}></Route>
            <Route exact path='/Student-Login' element={<Login />}></Route>
            <Route exact path='/Faculty-Login' element={<FacultyLogin />}></Route>
            <Route exact path='/Admin-Login' element={<AdminLogin />}></Route>
            <Route exact path='/Excel-upload' element={<TestUpload/>}></Route>
          </Route>

          <Route path='/Admin' element={<Sidebar />}>
            <Route exact path='/Admin/Profile' element={<AdminProfile/>}></Route>
            <Route exact path='/Admin/Dashboard' element={<Dashboard/>}></Route>
            <Route exact path='/Admin/AddStudent' element={<AddStudent />}></Route>
            <Route exact path='/Admin/ManageStudent' element={<ManageStudents />}></Route>
            <Route exact path='/Admin/AddFaculty' element={<AddFaculty />}></Route>
            <Route exact path='/Admin/ManageFaculty' element={<ManageFaculty/>}></Route>
            <Route exact path='/Admin/AddNotes' element={<AddNotes />}></Route>
            <Route exact path='/Admin/ManageNotes' element={<ManageNotes />}></Route>
            <Route exact path='/Admin/AddQP' element={<AddQP/>}></Route>
            <Route exact path='/Admin/ManageQP' element={<ManageQP />}></Route>
            <Route exact path='/Admin/AddTimeTable' element={<AddTT/>}></Route>
            <Route exact path='/Admin/ManageTimeTable' element={<ManageTimeTable />}></Route>
            <Route exact path='/Admin/AddNotice' element={<AddNotice />}></Route>
            <Route exact path='/Admin/ManageNotice' element={<ManageNotice />}></Route>
            <Route exact path='/Admin/AddAchievement' element={<AddAchievement />}></Route>
            <Route exact path='/Admin/ManageAchievements' element={<ManageAchievements />}></Route>
            <Route exact path='/Admin/PhotoGallery' element={<PhotoGallery />}></Route>
            <Route exact path='/Admin/AcademicAchievements' element={<AcademicAchievements />}></Route>
          </Route>
          <Route path='/Student' element={<StudentSidebar/>}>
              <Route exact path="/Student/Notes" element={<StudentNotes/>}></Route>
              <Route exact path="/Student/Profile" element={<StudentProfile/>}></Route>
              <Route exact path="/Student/QuestionP" element={<StudentQuesPaper/>}></Route>
              <Route exact path="/Student/TimeTable" element={<TimeTable/>}></Route>
              <Route exact path="/Student/Notices" element={<StudentNotices/>}></Route>
          </Route>
          <Route path='/Faculty' element={<FacultySidebar/>}>
              <Route exact path='/Faculty/Profile' element={<FacultyProfile/>} ></Route>  
              <Route exact path='/Faculty/AddNote' element={<FAddNotes/>} ></Route>  
              <Route exact path='/Faculty/ManageNotes' element={<FManageNotes/>} ></Route>  
              <Route exact path='/Faculty/AddQuestionPaper' element={<FAddQP/>} ></Route>  
              <Route exact path='/Faculty/ManageQuestionPapers' element={<FManageQP/>} ></Route>  
              <Route exact path='/Faculty/AddNotice' element={<FAddNotice/>} ></Route>  
              <Route exact path='/Faculty/ManageNotices' element={<FManageNotices/>} ></Route>  
          </Route>
        </Routes>

      </BrowserRouter>
      <Toaster />
      </UserProvider>
    </>
  )
}

export default App
