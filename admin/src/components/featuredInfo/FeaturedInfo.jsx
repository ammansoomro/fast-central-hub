import "./featuredInfo.css";
import {useEffect, useState} from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetch("/courses", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();

    const getUsers = async () => {
      try {
        const res = await fetch("/users", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    const getTeachers = async () => {
      const res = await fetch("/facultys",
          {
              method: "GET",
              headers: {
                  token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              }
          });
      const data = await res.json();
      setTeachers(data);
  };
  getTeachers();

  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">{ 
            users.length
          }</span>
          <span className="featuredContentRate">
            -11 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Teachers</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">
            {teachers.length}
          </span>
          <span className="featuredContentRate">
            -5 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Courses</span>
        <div className="featuredContentContainer">
          <span className="featuredContent">
            {courses.length}
          </span>
          <span className="featuredContentRate">
            +2 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
