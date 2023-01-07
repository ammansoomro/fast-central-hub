import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import "./Page.css";
import avatar from "./Avatar.png";
import { motion } from 'framer-motion';
import swal from "sweetalert";

const TeacherPage = () => {
    const params = useParams();
    const [courses, setCourses] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [teacherAbout, setTeacherAbout] = useState("");
    const [teacherUpvotes, setTeacherUpvotes] = useState(0);
    const [teacherDownvotes, setTeacherDownvotes] = useState(0);
    const [teacherReviews, setTeacherReviews] = useState([]);
    const [review, setReview] = useState("");
    const [vote, setVote] = useState("upvote");
    const [alreadyReviewed, setAlreadyReviewd] = useState(false);
    const [tab, setTab] = useState(2);
    const [backgroundpicture, setBackgroundpicture] = useState("");


    const deleteReview = async (id) => {
        const res = await fetch(`/reviewfaculties/${id}`, {
            method: "DELETE",
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        // eslint-disable-next-line 
        const data = await res.json();
        setAlreadyReviewd(false);
        swal({
            title: "Review Deleted",
            icon: "success",
            text: "Your review has been deleted",
            button: false,
            timer: 1800,
        });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        const res = await fetch(`/reviewfaculties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
            body: JSON.stringify({
                review: review,
                // if vote == "upvote" then upvote = 1 else 0
                upvote: vote === "upvote" ? 1 : 0,
                // if vote == "downvote" then downvote = 1 else 0
                downvote: vote === "downvote" ? 1 : 0,
                faculty_id: params.id,
                // Get user._id from localstorage
                user_id: JSON.parse(localStorage.getItem("user"))._id,
            }),
        });
        // eslint-disable-next-line 
        const data = await res.json();
        setReview("");
        swal({
            title: "Review Submitted",
            icon: "success",
            text: "Your review has been submitted",
            button: false,
            timer: 1800,
        });
    };

    useEffect(() => {
        // Set window to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        const getTeacher = async () => {
            try {
                const res = await fetch(`/facultys/find/${params.id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                const data = await res.json();
                setTeacher(data);
                setTeacherAbout(data.about);
            } catch (err) {
                console.log(err);
            }
        };

        const getCourses = async () => {
            try {
                const res = await fetch(`/facultys/courses/${params.id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                const data = await res.json();
                setCourses(data);
            } catch (err) {
                console.log(err);
            }
        };

        const getTeacherUpVotes = async () => {
            const res = await fetch("/reviewfaculties/upvote/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherUpvotes(data);
        };

        const getTeacherDownVotes = async () => {
            const res = await fetch("/reviewfaculties/downvote/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherDownvotes(data);
        };

        const getTeacherReviews = async () => {
            const res = await fetch("/reviewfaculties/find/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherReviews(data);
        };

        const getAlreadyReviewed = async () => {
            const res = await fetch(`/reviewfaculties/find/${params.id}`, {
                method: "GET",
                headers: {
                    token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
            });
            const data = await res.json();
            if (
                data.filter(
                    (item) =>
                        item.user_id === JSON.parse(localStorage.getItem("user"))._id
                ).length
            ) {
                setAlreadyReviewd(true);
            }
        };
        getCourses();
        getTeacher();
        getTeacherUpVotes();
        getTeacherDownVotes();
        getTeacherReviews();
        getAlreadyReviewed();
    }, [params.id]);

    useEffect(() => {
        const getAlreadyReviewed = async () => {
            const res = await fetch(`/reviewfaculties/find/${params.id}`, {
                method: "GET",
                headers: {
                    token:
                        "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
            });
            const data = await res.json();
            if (
                data.filter(
                    (item) =>
                        item.user_id === JSON.parse(localStorage.getItem("user"))._id
                ).length
            ) {
                setAlreadyReviewd(true);
            }
        };
        const getTeacherUpVotes = async () => {
            const res = await fetch("/reviewfaculties/upvote/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherUpvotes(data);
        };

        const getTeacherDownVotes = async () => {
            const res = await fetch("/reviewfaculties/downvote/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherDownvotes(data);
        };

        const getTeacherReviews = async () => {
            const res = await fetch("/reviewfaculties/find/" + params.id,
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeacherReviews(data);
        };

        getTeacherUpVotes();
        getTeacherDownVotes();
        getTeacherReviews();
        getAlreadyReviewed();

    }, [alreadyReviewed, teacherReviews, params.id]);

    useEffect(() => {
        const getBackground = async () => {
            const res = await fetch(`/departments/backgroundpicture/${teacher.department}`, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
            });
            const data = await res.json();
            setBackgroundpicture(data);
        };
        getBackground();
    }, [teacher.department]);

    return (
        <Wrapper
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <TeacherBanner>
                <Image>
                    {/* If teacher.department is AI then this image else that image */}
                    <img src={backgroundpicture} alt="background" />
                </Image>
                <Container>
                    <div className="title-container">
                        <div className="title-top">
                            <div className="course-title">
                                <h1>{teacher.name}</h1>
                            </div>
                            <div className="about">
                                <div className="rating">
                                    {teacherUpvotes}
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                        alt="upvote Logo"
                                    />
                                    {teacherDownvotes}
                                    <img src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png" alt="downvote Logo" />
                                </div>
                                <span>{teacher.department}</span>
                            </div>
                            <div className="teacherdescription">
                                {/* IF No Teacher About then do this else that */}
                                {
                                    teacher.about === "" ?
                                        <p>No Description Available for this Teacher.</p>
                                        :
                                        <p>{teacherAbout.substring(0, 965)}</p>
                                }

                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        <img src={teacher.picture} alt="Please Wait, Fetching Data..." />
                    </CardImage>
                </Card>
            </TeacherBanner>
            <TeacherDetails>
                {/* 2 Button to change Tab from 1 to 2 and 2 to 1 */}
                <div className="tabButton">
                    <button className="btn" onClick={() => setTab(2)}>
                        Teacher Reviews
                    </button>
                    <button className="btn" onClick={() => setTab(1)}>
                        Courses
                    </button>
                </div>

                {/* Tab 1 */}
                {tab === 1 ? (
                    <>
                        <TabHeading>
                            <strong>Teacher Courses</strong>
                        </TabHeading>
                        <Grid
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}>
                            {
                                courses.length === 0 ?

                                    <AlreadyReviewed>
                                        No Courses Available for this Teacher.
                                    </AlreadyReviewed>
                                    :
                                    <>
                                        <AlreadyReviewed>
                                            Click on the Course to see the Course Material.
                                        </AlreadyReviewed>
                                        <div className="courses">
                                            {
                                                courses.map((course) => {
                                                    return (
                                                        <Link to={`/course/${course._id}/teacher/${teacher._id}`}
                                                            key={course.code}>
                                                            <CourseCard >
                                                                <CourseCardImage className="teacherImage">
                                                                    <img src={course.courseImage} alt="Teacher" />
                                                                </CourseCardImage>
                                                            </CourseCard>
                                                        </Link>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                    </>
                            }
                        </Grid>
                    </>
                ) : (
                    <>
                        <TabHeading>
                            <strong>Teacher Reviews</strong>
                        </TabHeading>
                        <motion.div class="middle-panel"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}>
                            {/* If Already Reviewed don't show this */}
                            {!alreadyReviewed ? ( // If not already reviewed
                                <div class="post create CreatePost">
                                    <div class="post-top">
                                        <div class="dp">
                                            <img src={avatar} alt="" />
                                        </div>
                                        <input
                                            type="text"
                                            name="review"
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            placeholder="Write a review"
                                        />
                                    </div>
                                    <div class="post-bottom">
                                        <div class="action ">
                                            <i class="fa fa-image"></i>
                                            <span>
                                                <VoteSelect
                                                    name="vote"
                                                    value={vote}
                                                    onChange={(e) => setVote(e.target.value)}
                                                >
                                                    <option value="upvote">Upvote</option>
                                                    <option value="downvote">Downvote</option>
                                                </VoteSelect>
                                            </span>
                                        </div>
                                        <div class="action">
                                            <i class="fa fa-smile"></i>
                                            <span>
                                                <Btn
                                                    type="submit"
                                                    value="Post"
                                                    onClick={submitReview}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <AlreadyReviewed>
                                        You have Reviewed this Teacher!
                                    </AlreadyReviewed>
                                </>
                            )}

                            {teacherReviews.map((review) => {
                                return (
                                    <>
                                        <div class="post">
                                            <div class="post-top">
                                                <div class="dp">
                                                    {/* If review.upvote = 1 then this picture else that picture */}
                                                    {review.upvote === 1 ? (
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                                            alt="upvote Logo"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png"
                                                            alt="downvote Logo"
                                                        />
                                                    )}
                                                </div>
                                                <div class="post-info">
                                                    <p class="name">Amman</p>
                                                    <span class="time">
                                                        {new Date(review.createdAt).toDateString()}
                                                    </span>
                                                </div>
                                                <div class="post-content">
                                                    <p>{review.review}</p>
                                                </div>
                                                <i class="fas fa-ellipsis-h">
                                                    {review.user_id ===
                                                        JSON.parse(localStorage.getItem("user"))._id ? (
                                                        <DeleteReview
                                                            onClick={() => deleteReview(review._id)}
                                                        ></DeleteReview>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </i>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </TeacherDetails>
        </Wrapper>
    );
}

const Grid = styled(motion.div)`
    padding: 1.5rem 0rem;
    .courses {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 4.5rem 1rem;
    }
    .nocourses {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        h1 {
            font-size: 1.5rem;
            font-weight: 500;
            color: #000;
        }
    }
`;


const CourseCard = styled.div`
  width: 120px;
  height: 150px;
  background: linear-gradient(
360deg,
#161616b9 35%,
rgba(73, 73, 73, 0.23) 64%
);
  /* position: relative; */
  transition: all ease 0.3s;
    /* border: 1px solid rgb(255, 255, 255); */
  border-radius: 1.4rem !important;
    /* Reduct Brightness */
    filter: brightness(0.9);
    &:hover {
        border: 1px solid #3582c6;
    }

    &:hover .body {
        opacity: 1;
    }
`;

const CourseCardImage = styled.div`
    border-radius: 1.4rem;
    width: 100%;
    height: 100%;
    background: linear-gradient(
360deg,
#161616b9 35%,
rgba(73, 73, 73, 0.23) 64%
);
    img {
        border-radius: 1.4rem;
        filter: brightness(0.9);

        width: 100%;
        height: 100%;
        object-fit: fill;
        object-position: center;
    }
`;


const Wrapper = styled(motion.div)`
margin: 0rem 1rem;
`;

const TeacherBanner = styled.div`
width: 100%;
margin: 10px auto;
  max-width: 1200px;
  min-height: 600px;
  max-height: 580px;
padding: 70px 50px;
position: relative;
display: flex;
justify-content:center;
&::after {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(0deg, rgb(8, 8, 8) 0%, rgba(0, 0, 0, 0.6) 100%);
}
`;

const Image = styled.div`
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
border-radius: 5px;
overflow: hidden;
img {
    /* Brightness Filter */
width: 100%;
height: 100%;
object-fit: fill;
object-position: center;
}
&::before {
content: "";
position: absolute;
left: 0px;
top: 0px;
width: 100%;
height: 100%;
background: rgba(32, 32, 32, 0.7);
background: linear-gradient(
  -90deg,
  rgba(37, 37, 37, 0.2) 0%,
  rgba(15, 15, 15, 0.3) 100%
);
}
`;

const Container = styled.div`
z-index: 100;
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
position: relative;
.title-container {
width: 100%;
max-width: 500px;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.title-container p{
position: relative;
margin: 1.5rem 0;
color: #747474;
width: 180%;
text-align: justify;
}
.course-title{
width: 150%;
}
.coursedescription{
font-size: 1.1rem;
}
.course-title h1 {
color: #ffffff;
font-weight: 600;
font-size: 2.0rem;
font-family: "Signika", sans-serif;
line-height: 40px;
letter-spacing: 1px;
}
.about {
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 10px;
flex-wrap: wrap;
color: #e9e9e9;
}
.rating {
display: flex;
align-items: center;
justify-content: flex;
letter-spacing: 0.1rem;
img {
  height: 2rem;
  width: 2.4rem;
  object-fit: contain;
  object-position: center;
  margin: 0px 10px;
}
}
.about span {
margin-right: 1.1rem;
letter-spacing: 1px;
font-size: 0.8rem;
}
.title-bottom{
display: flex;
justify-content: flex-start;
align-items: center;
flex-wrap: wrap;
}
.btn {
border: none;
outline: 2px solid #3883c5;
background: transparent;
color: #3883c5;
cursor: pointer;
font-weight: bold;
padding: 5px 4px;
transition: 0.4s;
margin-top: 1rem;
margin-right: 0.9rem;
border-radius: 0.2rem;
}
.btn:hover{
transform: translateY(-0.3rem);
color: #355C7D;
outline: 2px solid #355C7D;
}
li{
float: left;
display: block;
color: white;
text-align: center;  
font-weight: bold;
color: #2f85d0;
font-size: 0.8rem;
}
li:not(:first-child){
  padding: 0rem 0.2rem;
}
.category{
margin-right: 40px;
font-size: 1.2rem;
display: flex;
flex-direction: column;
}
.category strong{
font-weight: 500;
color: #ffffff;
}
`;



const TeacherDetails = styled.section`
width: 100%;
max-width: 1000px;
margin: 2rem auto 1rem auto;
padding: 2rem;
display: flex;
flex-direction: column;
text-align: center;
p{
margin: 1rem 0;
color: #747474;
}
`;


// ==========  Card Image ==========
const CardImage = styled.div`
width: 110%;
height: 100%;
border-radius: 1rem;
img {
border-radius: 1rem;
filter: brightness(0.8);

width: 100%;
height: 100%;
object-fit: fill;
object-position: center;
}
`;

export const TabHeading = styled.section`
width: 100%;
max-width: 800px;
margin: 0rem auto 0rem auto;
display: flex;  
justify-content: flex-start;
align-items:center;
flex-direction: column;
strong{
    /* color: #d3060a; */
    color: #FFFFFF;
    font-family: "Signika", sans-serif;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 1.2rem;
}
`;
export const Card = styled.div`
  z-index: 2;
  width: 300px;
  height: 350px;
  position: relative;
  border-radius: 1rem;
  margin-top: 1rem;
`;

export const VoteSelect = styled.select`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 0.8rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    padding: 0px 15px;
    border: none;
    border-bottom: 2px solid #3883c5;
`;


export const DeleteReview = styled.button`
border-radius: 50%;
height: 15px;
width: 15px;
color: #d33838;
  background: #d33838;
font-size: 0.9rem;
font-family: "Poppins", sans-serif;
/* text-transform: uppercase; */
cursor: pointer;
transition: ease-in-out 0.5s;
font-weight: bold;
padding: 0px 3px;
border: none;
&:hover {
  background: #bf1e1e;
  box-shadow: 0 0 5px #d33838, 0 0 10px #d33838, 0 0 15px #d33838, 0 0 20px #d33838, 0 0 25px #d33838, 0 0 30px #d33838;

color: #fff;
}
`;


export const AlreadyReviewed = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    height: 30px;
    background: transparent;
    font-size: 1rem;
    color: #3883c5;
    font-family: "Poppins", sans-serif;
    /* text-transform: uppercase; */
    cursor: pointer;
    transition: ease-in-out 0.5s;
    font-weight: bold;
    margin-bottom: 20px;
    border: none;
`;

export const Btn = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  height: 30px;
  background: #3883c5;
  font-size:    0.8rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  /* text-transform: uppercase; */
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  border: none;
  padding: 0px 15px;

  &:hover {
    border: 3px solid #3883c5;
    color: #3883c5;
    background: transparent;
  }
`;

export default TeacherPage;