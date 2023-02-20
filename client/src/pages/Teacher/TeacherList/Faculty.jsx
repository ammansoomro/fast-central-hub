import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { StyledPaginateContainer, CardText, CardHover, CardImage, Card, Grid, Searchbar, SelectDepartment, TopMenu, Wrapper } from './Style.jsx'
import { getTeachers, getTotalFaculty, getFacultyByPage, getTotalFacultyByDepartment, getFacultyByDepartmentAndPage, getFacultyOnSearch, getTeacherVotes } from './Functions.jsx'

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [department, setDepartment] = useState("All");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [total_faculty, setTotalFaculty] = useState(0);
  const [teacherVotes, setTeacherVotes] = useState([]);

  useEffect(() => {
    const pullData = async () => {
      const res = await getTeachers();
      const res2 = await getTotalFaculty();
      const res3 = await getTeacherVotes();
      setTeachers(res);
      setTotalFaculty(res2);
      setTeacherVotes(res3);
    };
    pullData();

  }, []);


  useEffect(() => {
    const pullData = async () => {
      if (department === "All") {
        const res = await getFacultyByPage(pageNumber);
        const res2 = await getTotalFaculty();
        setTeachers(res);
        setTotalFaculty(res2);
        return;
      }
      const res3 = await getTotalFacultyByDepartment(department);
      const res4 = await getFacultyByDepartmentAndPage(department, pageNumber);
      setTotalFaculty(res3);
      setTeachers(res4);
    };
    pullData();
  }, [department, pageNumber]);


  useEffect(() => {
    const pullData = async () => {
      if (search === "") {
        const res = await getTeachers();
        const res2 = await getTotalFaculty();
        setTeachers(res);
        setTotalFaculty(res2);
        return;
      }
      else {
        const res = await getFacultyOnSearch(search);
        setTeachers(res);
      }
    };
    pullData();
  }, [search]);


  const handlePageClick = (e) => {
    let selectedPage = e.selected + 1;
    setPageNumber(selectedPage);
  };

  return (
    <Wrapper>
      <TopMenu>
        <SelectDepartment
          className="select"
          value={department}
          // Onchange set Department and Page Number to 1
          onChange={(e) => {
            setDepartment(e.target.value);
            setPageNumber(1);
          }}
        >
          <option value="All">All</option>
          <option value="SE">Software Engineering</option>
          <option value="CS">Computer Science</option>
          <option value="EE">Electrical Engineering</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="SH">Science and Humanities</option>
          <option value="CYS">Cyber Security</option>
        </SelectDepartment>
        <Searchbar>
          <input class="search__input" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Quick Search" />
        </Searchbar>
      </TopMenu>
      {/* If Department === All show this */}

      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}>
        {
          // eslint-disable-next-line 
          teachers.map((teacher) => {
            return (
              <Link to={{
                pathname: `/teacher/${teacher._id}`,
                teacher: teacher
              }}
                key={teacher._id}
              >
                <Card key={teacher._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <CardImage>
                    <img
                      src={teacher.picture ? teacher.picture : "https://w0.peakpx.com/wallpaper/939/963/HD-wallpaper-technology-error-404-not-found-black-white-minimalist.jpg"}
                      alt={teacher.name} />
                  </CardImage>
                  <CardHover className="body">
                    <h2>{teacher.department}</h2>
                    <Link to={{
                      pathname: `/teacher/${teacher._id}`,
                      teacher: teacher
                    }}>
                      <button className="btn">View Teacher</button>
                    </Link>
                    <h5>{teacher.email}</h5>
                  </CardHover>
                  <CardText>
                    <span className="quality"></span>
                    <div className="bottom">
                      <div className="teachername">
                        <span>{teacher.department}</span>
                        <strong>{teacher.name}</strong>
                      </div>
                      <div className="rating">
                        {
                          // eslint-disable-next-line 
                          teacherVotes.map((teacherVote) => {
                            if (teacherVote.faculty_id === teacher._id) {
                              //  Show Upvote and Downvote Count if Upvote and Downvote Count is not 0 else show only that is not 0
                              if (teacherVote.upvote !== 0 && teacherVote.downvote !== 0) {
                                return (
                                  <>
                                    {teacherVote.upvote}
                                    < img
                                      src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                      alt="upvote Logo"
                                    />
                                    {teacherVote.downvote}
                                    < img src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png" alt="downvote Logo" />
                                  </>
                                )
                              }
                              else if (teacherVote.upvote !== 0) {
                                return (
                                  <>
                                    {teacherVote.upvote}
                                    < img
                                      src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                      alt="upvote Logo"
                                    />
                                  </>
                                )
                              }
                              else if (teacherVote.downvote !== 0) {
                                return (
                                  <>
                                    {teacherVote.downvote}
                                    < img src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png" alt="downvote Logo" />
                                  </>
                                )
                              }
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
          })
        }
      </Grid>
      <StyledPaginateContainer>
        <ReactPaginate
          previousLabel={'Prev'}
          nexLabel={'Next'}
          onPageChange={handlePageClick}
          pageCount={total_faculty / 20}
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
}

export default Faculty