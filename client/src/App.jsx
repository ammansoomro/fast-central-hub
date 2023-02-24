import "./app.scss"
import { Route, Routes, useLocation,useNavigate } from 'react-router-dom'
import { CoursePage, CourseList, DepartmentPage, DepartmentList, TeacherPage, TeacherList, SocietyPage, SocietyList, Material, Home, PageNotFound, ProjectList, Login,Navbar, Footer,Register,Project} from "./pages/ExportAll";
import {AuthContext}  from "./authContext/AuthContext"
import {useContext,useEffect} from "react"
import { Navigate } from "react-router-dom"
const App = () => {
  const {user} = useContext(AuthContext);
  const location = useLocation();
  const history = useNavigate();
  useEffect(() => {
    if(!user){
      // If location is login goto /login if location is register goto /register
      if(location.pathname === "/login" || location.pathname === "/register"){
        history(location.pathname)
      }
      else{
        history("/login")
      }
    }
  }, [user,history,location.pathname])

  return (
    <div className="app">
      {/* Don't Show NavBar if location is /login */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}
      {/* <Navbar/> */}
      <Routes location={location} key={location.path}>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {
          user && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/faculty" element={<TeacherList />} />
              <Route path="/teacher/:id" element={<TeacherPage />} />
              <Route path="/societies" element={<SocietyList />} />
              <Route path="/society/:id" element={<SocietyPage />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/department/:id" element={<DepartmentPage />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/course/:id/teacher/:teacher_id" element={<Material />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )
        }
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </div>
  );
};

export default App;