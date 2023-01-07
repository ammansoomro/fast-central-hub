import styled from "styled-components";
import { Link } from "react-router-dom";
// import SearchBar from "../Search/Search";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
            {/* If Logged in Show this else dont */}
            {
              loggedIn
              && (
                <li>
                  <button type="submit" onClick={() => {
                    dispatch({ type: "LOGOUT" });
                  }}>
                    Log out
                  </button>
                </li>
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
const Search = styled.div`
  display: flex;
`;
const Nav = styled.div`
z-index:  100;
top: 0;
  background: #050508;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 5rem;

  /* Check if sticky */
  /* &.sticky {
    position: fixed;
    background: #050508;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  } */


  .logo{
    display: flex;
    padding: 0.5rem;
    h1 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Signika', sans-serif;
      font-size: 2.0rem;
      letter-spacing: 0.2rem;
      color: #3991dd;
      font-weight: 500; 
    }
    img{
      width: 40px;
      margin-right: 10px;
      margin-left: -50px;
    }
  }
  @media (max-width: 768px) 
  {
    .logo{
      h1{
        display: none;
      }
      img{
        width: 30px;
        margin-left: -40px;
      }
    }
  }
`;

const Navlist = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    font-family: 'Signika', sans-serif;
    padding-right: 1rem;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all ease 0.8s;
  }
  li:hover {
    color: #3991dd;
  }
  button {
    background: #3991dd;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all ease 0.6s;
    text-align: center;
  }
  button:hover {
    /* Make the buttonn a little bigger */
    transform: scale(1.1);
    /* Little darker and glowy */
    box-shadow: 0 0 2px #3991dd, 0 0 20px #3991dd, 0 0 30px #3991dd;
  }

  @media (max-width: 768px) {
    li {
      font-size: 0.7rem;
      padding: 0.5rem;
    }
    button {
      display: none;
      padding: 0.3rem 0.5rem;
      font-size: 0.8rem;
      text-align: center;

    }
  }
`;


export default Navbar;