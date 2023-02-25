import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { CodeAndPage, CourseByPage, AllCourses, CourseRating, TotalByCode, TotalCourses, UniqueCodes, SearchedCourse } from './Functions.jsx';
import { Card, CardHover, CardImage, CardText, Grid, Searchbar, SelectCourseCode, StyledPaginateContainer, TopMenu, Wrapper } from './Style.jsx';
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
      await AllCourses(setCourses);
      await UniqueCodes(setUniqueCodes);
      await CourseRating(setCourseRating);
      await TotalCourses(setTotalCourses);
    };
    pullData();
  }, []);

  useEffect(() => {
    const pullData = async () => {
      if (coursecode === "All") {
        await CourseByPage(pageNumber, setCourses);
        await TotalCourses(setTotalCourses);
        return;
      }
      else {
        await TotalByCode(coursecode, setTotalCourses);
        await CodeAndPage(pageNumber, coursecode, setCourses);
      }
    };
    pullData();
  }, [coursecode, pageNumber]);

  useEffect(() => {
    const pullData = async () => {
      if (search === "") {
        await AllCourses(setCourses);
        await TotalCourses(setTotalCourses);
        return;
      }
      else {
        await SearchedCourse(search, setCourses);
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






