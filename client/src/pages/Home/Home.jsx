import "./home.scss"
import TeacherList from "../../components/list/TeacherList/TeacherList"
import CourseList from "../../components/list/CourseList/CourseList"
import DepartmentList from "../../components/list/DepartmentList/DepartmentList"
import SocietyList from "../../components/list/SocietyList/SocietyList"
import Heading from "../../components/heading/Heading"
import { motion } from "framer-motion";
const Home = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="home"
    >
      {/* If Screen size if small or mobile, don't show Featured */}
      {
        // window.innerWidth > 480 && <Featured />
      }
      <Heading />
      <TeacherList />
      <SocietyList />
      <DepartmentList />
      <CourseList />
    </motion.div>
  )
}

export default Home;