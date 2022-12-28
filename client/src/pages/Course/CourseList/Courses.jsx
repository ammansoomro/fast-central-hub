import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [coursecode, setCoursecode] = useState("All");
  const [search, setSearch] = useState("");
  const [uniquecodes, setUniqueCodes] = useState([]);
  const [courseVotes, setCourseVotes] = useState([]);
  const [courseRating, setCourseRating] = useState([]);
  const SortCoursesOnName = (courses) => {
    courses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return courses;
  };
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get("/courses", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        // Sort Data and Store in Courses
        setCourses(SortCoursesOnName(res.data));

        // Get Unique Course Codes
        const res2 = await axios.get("/courses/uniquecodes", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUniqueCodes(res2.data);

        // Get Course Votes
        const res3 = await axios.get("/courses/votes", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setCourseVotes(res3.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();

    // Get Course Rating
    const getCourseRating = async () => {
      try {
        const res = await axios.get("/courses/rating", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
          }
        })
        setCourseRating(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getCourseRating()
  }, []);

  useEffect(() => {
    const getCourses = async () => {
      try {
        if (coursecode === "All") {
          const res = await axios.get("/courses", {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          // Sort Data and Store in Courses
          setCourses(SortCoursesOnName(res.data));
          return;
        }

        const res = await axios.get(`/courses/searchcode/${coursecode}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        // Sort Data and Store in Courses
        setCourses(SortCoursesOnName(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
  }, [coursecode]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        if (search === "") {
          const res = await axios.get("/courses", {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          // Sort Data and Store in Courses
          setCourses(SortCoursesOnName(res.data));
          return;
        }
        const res = await axios.get(`/courses/search/${search}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        // Sort Data and Store in Courses
        setCourses(SortCoursesOnName(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getCourses();
  }, [search]);

  // If courses is empty, return loading
  if (courses.length === 0 || uniquecodes.length === 0
    || courseVotes.length === 0
  ) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <TopMenu>
        <SelectCourseCode
          className="select"
          value={coursecode}
          onChange={(e) => setCoursecode(e.target.value)}
        >
          <option value="All">All</option>
          {uniquecodes.map((code) => {
            return (
              <option key={code} value={code}>
                {code}
              </option>
            );
          })}
        </SelectCourseCode>
        {/* <SearchBar /> */}
        <Searchbar>
          <input
            className="search__input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Quick Search"
          />
        </Searchbar>
      </TopMenu>
      <Grid>
        {courses.map((course) => {
          return (
            <Card key={course._id}>
              <CardImage>
                <img src={course.courseImage} alt={course.coursecode} />
              </CardImage>
              <CardHover className="body">
                <h2>{course.coursecode}</h2>
                {/* Link to course/:courseId and also pass the current course object, and course id*/}
                <Link
                  to={{
                    pathname: `/course/${course._id}`,
                    course: course,
                  }}
                >
                  <button className="btn">View Course</button>
                </Link>
                <h4>{course.core_elective}</h4>
              </CardHover>
              <CardText>
                <span className="quality"></span>
                <div className="bottom">
                  <div className="coursename">
                    <span>{course.coursecode}</span>
                    <strong>{course.name}</strong>
                  </div>
                  <div className="rating">
                    {/* {
                      // eslint-disable-next-line
                      courseVotes.map((courseVote) => {
                        if (courseVote.course_id === course._id) {
                          if (
                            courseVote.upvote !== 0 &&
                            courseVote.downvote !== 0
                          ) {
                            return (
                              <>
                                {courseVote.upvote}
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                  alt="upvote Logo"
                                />
                                {courseVote.downvote}
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png"
                                  alt="downvote Logo"
                                />
                              </>
                            );
                          } else if (courseVote.upvote !== 0) {
                            return (
                              <>
                                {courseVote.upvote}
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                  alt="upvote Logo"
                                />
                              </>
                            );
                          } else if (courseVote.downvote !== 0) {
                            return (
                              <>
                                {courseVote.downvote}
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png"
                                  alt="downvote Logo"
                                />
                              </>
                            );
                          }
                        }
                      })
                    } */}

                    {
                      // eslint-disable-next-line
                      courseRating.map((rating) => {
                        if (rating.course_id === course._id) {
                          return (
                            <span key={rating._id}>
                              {rating.rating}
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                                alt="Star Logo"
                            />
                            </span>
                          );
                        }
                      }
                      )
                    }
                  </div>
                </div>
              </CardText>
            </Card>
          );
        })}
      </Grid>
    </Wrapper>
  )
};

const Grid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 2.9rem;
`;
// ========== Setting Margin ==========
const Wrapper = styled.div`
  margin: 4rem 8rem;
`;

// ========== Slider Item Card ==========
const Card = styled.div`
  width: 200px;
  height: 270px;
  position: relative;
  transition: all ease 0.3s;
  /* border: 1px solid rgb(255, 255, 255); */
  border-radius: 1.4rem !important;

  &:hover {
    border: 1px solid #3582c6;
  }

  &:hover .body {
    opacity: 1;
  }
`;

// ==========  Card Image ==========
const CardImage = styled.div`
  border-radius: 1.4rem;
  width: 100%;
  height: 100%;

  img {
    border-radius: 1.4rem;

    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

// ==========  Card Text ==========
const CardText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 1.4rem !important;

  background: linear-gradient(
    360deg,
    #161616b9 35%,
    rgba(73, 73, 73, 0.23) 64%
  );
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
  justify-content: space-between;

  // ==========  HD Label Text ==========
  .quality {
    background-color: #e70634;
    color: #080808;
    font-weight: 600;
    padding: 0px 0.5rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border-radius: 4px;
    opacity: 0;
  }
  // ==========  course Name ==========
  .coursename {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .coursename strong {
    font-size: 1rem;
    line-height: 20px;
    margin-top: 5px;
    margin-bottom: 15px;
    color: #dfdfdf;
    letter-spacing: 0.5px;
  }
  // ==========  Rating ==========
  .rating {
    display: flex;
    align-items: center;
    justify-content: flex;
    letter-spacing: 0.1rem;

    img {
      height: 0.9rem;
      width: 1rem;
      object-fit: contain;
      object-position: center;
      margin: 0px 10px;
    }
  }
`;

const CardHover = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transition: 0.5s;
  padding: 10px;
  background: linear-gradient(90deg, #000000b5 100%, #fafafa 0%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 1.4rem !important;

  h2 {
    margin-top: 30%;
  }
  h4 {
    margin-bottom: 40%;
  }
  .btn {
    border: none;
    outline: 2px solid #3883c5;
    background: transparent;
    color: #3883c5;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 10px;
    transition: 0.4s;
  }

  .btn:hover {
    color: #355c7d;
    outline: 2px solid #355c7d;
  }
`;

// SEARCH BAR

const Searchbar = styled.div`
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    margin-top: 50px;
    width: 100%;
  }
  input {
    width: 100%;
    padding: 0.5rem 0.5rem;
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;
    color: white;
    background-color: #83828233;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 99% center;
    border: none;
    border-bottom: 2px solid #3991dd;
    transition: all 250ms ease-in-out;

    &::placeholder {
      color: rgba(250, 250, 250, 0.5);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 0.75rem;
    }

    &:hover,
    &:focus {
      background-position: 100% center;
    }
  }
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;

  /* If Screen Size Gets Smaal Change Flex Direction to Column */
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SelectCourseCode = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.1rem;
  height: 30px;
  background: transparent;
  font-size: 0.8rem;
  color: #3883c5;
  min-width: 200px;
  max-width: 200px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  margin-right: 1rem;
  /* text-transform: uppercase; */
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  padding: 0px 15px;
  border: none;
  border-bottom: 2px solid #3883c5;

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;


export default Courses;
