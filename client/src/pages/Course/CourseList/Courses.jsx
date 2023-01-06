import { useState, useEffect } from "react";
import { GetCourses, getUniqueCodes, searchOnCourseCode, searchOnCourseName, getCoursesVotes, getCoursesRating } from './Functions'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, Searchbar, SelectCourseCode, TopMenu } from './Style'
import { Link } from "react-router-dom";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [coursecode, setCoursecode] = useState("All");
  const [search, setSearch] = useState("");
  const [uniquecodes, setUniqueCodes] = useState([]);
  // eslint-disable-next-line
  const [courseVotes, setCourseVotes] = useState([]);
  const [courseRating, setCourseRating] = useState([]);

  useEffect(() => {
    const pullData = async () => {
      const res = await GetCourses();
      setCourses((res));

      const res2 = await getUniqueCodes();
      setUniqueCodes(res2);

      const res3 = await getCoursesVotes();
      setCourseVotes(res3);

      const res4 = await getCoursesRating();
      setCourseRating(res4);
    };
    pullData();
  }, []);

  useEffect(() => {
    const pullData = async () => {
      if (coursecode === "All") {
        const res = await GetCourses();
        setCourses(res);
        return;
      }
      const res = await searchOnCourseCode(coursecode);
      setCourses(res);
    };
    pullData();
  }, [coursecode]);

  useEffect(() => {
    const pullData = async () => {
      if (search === "") {
        const res = await GetCourses();
        setCourses(res);
        return;
      }
      const res = await searchOnCourseName(search);
      setCourses(res);
    };
    pullData();
  }, [search]);

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
            <Link
              to={{
                pathname: `/course/${course._id}`,
                course: course,
              }}
            >
              <Card key={course._id}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <CardImage
                 animate={{ opacity: 1 }}
                 initial={{ opacity: 0 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5 }}>
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
            </Link>
          );
        })}
      </Grid>
    </Wrapper>
  )
};

export default Courses;
