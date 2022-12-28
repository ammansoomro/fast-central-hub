import "./home.scss"
// import Navbar from "../../components/navbar/Navbar"
// import Featured from "../../components/featured/Featured"
import TeacherList from "../../components/list/TeacherList/TeacherList"
import CourseList from "../../components/list/CourseList/CourseList"
import Heading from "../../components/heading/Heading"
const Home = () => {
  return (
    <div className="home">
      {/* <Navbar/> */}
      <Heading/>
      {/* <Featured/> */}
      <CourseList/>
      <TeacherList/>
    </div>
  )
}

export default Home;