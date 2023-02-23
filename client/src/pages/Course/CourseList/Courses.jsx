import { useState, useEffect } from "react";
import { GetCourses, getUniqueCodes, searchOnCourseName, getCoursesRating, getTotalCourses, getCoursesByPage, getTotalCoursesByCode, getCoursesByPageAndCode } from './Functions.jsx'
import { Wrapper, Grid, Card, CardImage, CardHover, CardText, Searchbar, SelectCourseCode, TopMenu, StyledPaginateContainer } from './Style.jsx'
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [coursecode, setCoursecode] = useState("All");
  const [search, setSearch] = useState("");
  const [uniquecodes, setUniqueCodes] = useState([]);
  // eslint-disable-next-line
  const [courseRating, setCourseRating] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total_courses, setTotalCourses] = useState(0);

  const handlePageClick = (e) => {
    let selectedPage = e.selected + 1;
    setPageNumber(selectedPage);
  };


  useEffect(() => {
    const pullData = async () => {
      const res = await GetCourses();
      const res2 = await getUniqueCodes();
      const res4 = await getCoursesRating();
      const res5 = await getTotalCourses();
      setCourses((res));
      setUniqueCodes(res2);
      setCourseRating(res4);
      setTotalCourses(res5);

    };
    pullData();
  }, []);

  useEffect(() => {
    const pullData = async () => {
      if (coursecode === "All") {
        const res = await getCoursesByPage(pageNumber);
        setCourses(res);
        const res2 = await getTotalCourses();
        setTotalCourses(res2);
        return;
      }
      else {
        const res3 = await getTotalCoursesByCode(coursecode);
        const res4 = await getCoursesByPageAndCode(pageNumber,coursecode);
        setTotalCourses(res3);
        setCourses(res4);
      }
    };
    pullData();
  }, [coursecode, pageNumber]);

  useEffect(() => {
    const pullData = async () => {
      if (search === "") {
        const res = await GetCourses();
        setCourses(res);
        const res2 = await getTotalCourses();
        setTotalCourses(res2);
        return;
      }
      else {
        const res = await searchOnCourseName(search);
        setCourses(res);
      }
    };
    pullData();
  }, [search]);

  return (
    <Wrapper
    >
      <TopMenu>
        <SelectCourseCode
          className="select"
          value={coursecode}
          // Onchange set Code and Page Number to 1
          onChange={(e) => {
            setCoursecode(e.target.value);
            setPageNumber(1);
          }}
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
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}>
        {courses.map((course) => {
          return (
            <Link
              to={{
                pathname: `/course/${course._id}`,
                course: course,
              }}
            >
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

      <StyledPaginateContainer>
        <ReactPaginate
          previousLabel={'Prev'}
          nexLabel={'Next'}
          onPageChange={handlePageClick}
          pageCount={total_courses / 20}
          containerClassName={'pagination'}
          pageClassName={'pagination'}
          previousClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          nextClassName={'pagination'}
          breakClassName={'pagination'}
          breakLinkClassName={'pagination'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
        />
      </StyledPaginateContainer>

    </Wrapper>
  )
};

export default Courses;
