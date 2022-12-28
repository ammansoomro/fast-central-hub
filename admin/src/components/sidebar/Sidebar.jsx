import "./sidebar.css";
import {
  LineStyle,
} from "@material-ui/icons";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <div className="MenuItem">
              <Link to="/courses" className="link">
                <li className="sidebarListItem">
                  <img src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png" alt="" className="sidebarIcon" />
                  Courses
                </li>
              </Link>
              <Link to="/newcourse" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
            <div className="MenuItem">
              <Link to="/teachers" className="link">
                <li className="sidebarListItem">
                  <img src="https://cdn-icons-png.flaticon.com/512/3410/3410674.png" alt="" className="sidebarIcon" />
                  Teachers
                </li>
              </Link>
              <Link to="/newteacher" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
            <div className="MenuItem">
              <Link to="/departments" className="link">
                <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/1570/1570896.png" alt="" className="sidebarIcon" />
                  Departments
                </li>
              </Link>
              <Link to="/newdepartment" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
            <div className="MenuItem">
              <Link to="/materials" className="link">
                <li className="sidebarListItem ">
                <img src="https://cdn-icons-png.flaticon.com/512/2541/2541979.png" alt="" className="sidebarIcon" />
                  Materials
                </li>
              </Link>
              <Link to="/newmaterial" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
            <div className="MenuItem">
              <Link to="/societies" className="link">
                <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/2562/2562464.png" alt="" className="sidebarIcon" />
                  Societies
                </li>
              </Link>
              <Link to="/newsociety" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
            <div className="MenuItem">
              <Link to="/events" className="link">
                <li className="sidebarListItem">
                <img src="https://cdn-icons-png.flaticon.com/512/1968/1968790.png" alt="" className="sidebarIcon" />
                  Events
                </li>
              </Link>
              <Link to="/newevent" className="link">
                <li className="sidebarListItem">
                  <IoAdd className="sidebarPlusIcon" />
                </li>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
