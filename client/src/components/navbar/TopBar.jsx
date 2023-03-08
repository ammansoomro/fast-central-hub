import { Link } from "react-router-dom";
// import SearchBar from "../Search/Search";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Nav, Search, Navlist } from "./Style";
function Navbar() {
  const { dispatch } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const location = useLocation();



  useEffect(() => {
    // Get access token from local storage
    if (JSON.parse(localStorage.getItem("user")) === null) {
      setLoggedIn(false)
    }
    else {
      setLoggedIn(true)
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, [
    isSticky
  ]);

  return (
    <Nav
      className={isSticky ? 'sticky' : ''}
    >
      <div className="Name">
        <Link to="/">
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/en/e/e4/National_University_of_Computer_and_Emerging_Sciences_logo.png" alt="" />
            <h1>FastCentralHub</h1>
          </div>
        </Link>
      </div>
      <Search>
        <Navlist>
          <Link to="/courses">
            <li>Courses</li>
          </Link>
          <Link to="/faculty">
            <li>Faculty</li>
          </Link>
          <Link to="/departments">
            <li>Departments</li>
          </Link>
          <Link to="/societies">
            <li>Societies</li>
          </Link>
          <Link to="/projects">
            <li>Projects</li>
          </Link>
          <Link to="/announcements">
            <li>Announcements</li>
          </Link>
          {/* If Logged in Show this else dont */}
          {
            loggedIn
            && (
              <div>
                <button type="submit" onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}>
                  Log out
                </button>
              </div>
            )
          }
        </Navlist>
        {/* If location is this don't render */}
        {/* {
          location.pathname !== "/" ? null : <SearchBar />
        } */}
      </Search>
    </Nav>
  );
}
export default Navbar;