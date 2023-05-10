import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import "./Assets/Page.css";
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { Wrapper, TeacherBanner, Image, Container, Card, CardImage, TeacherDetails, TabButton, TabHeading, Grid, AlreadyReviewed, CourseCard, CourseCardImage, Btn, DelReview } from './Style.jsx';
import { DeleteReview, AddReview, GetTeacherData, GetTeacherCoursesData, GetTeacherUpVotes, GetTeacherDownVotes, GetTeacherReviews, CheckAlreadyReviewed, GetBackGround } from './Functions.jsx';

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
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [tab, setTab] = useState(2);
    const [backgroundpicture, setBackgroundpicture] = useState("");


    async function deleteReview(id) {
        await DeleteReview(id, setAlreadyReviewed);
    }

    async function submitReview(e) {
        await AddReview(e, review, vote, params, setReview);
    }

    useEffect(() => {
        const PullData = async () => {
            await GetTeacherData(params, setTeacher, setTeacherAbout);
            await GetTeacherCoursesData(params, setCourses);
            await GetTeacherUpVotes(params, setTeacherUpvotes);
            await GetTeacherDownVotes(params, setTeacherDownvotes);
            await GetTeacherReviews(params, setTeacherReviews);
            await CheckAlreadyReviewed(params, setAlreadyReviewed);
        };
        PullData();
    }, [params.id, params]);

    useEffect(() => {
        const PullData = async () => {
            await CheckAlreadyReviewed(params, setAlreadyReviewed);
            await GetTeacherUpVotes(params, setTeacherUpvotes);
            await GetTeacherDownVotes(params, setTeacherDownvotes);
            await GetTeacherReviews(params, setTeacherReviews);
            await GetBackGround(teacher, setBackgroundpicture);
        };
        PullData();
    }, [alreadyReviewed, teacherReviews, params.id, teacher.department, teacher, params]);

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
                                        <p>{teacherAbout.substring(0, 1800)}</p>
                                }

                            </div>
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        <img src={teacher?.picture} alt="Please Wait, Fetching Data..." />
                    </CardImage>
                    <h4>{teacher.email}</h4>
                </Card>
            </TeacherBanner>
            <TeacherDetails>
                {/* 2 Button to change Tab from 1 to 2 and 2 to 1 */}
                <div className="tabButton">
                    <TabButton onClick={() => setTab(2)}>
                        Teacher Reviews
                    </TabButton>
                    <TabButton onClick={() => setTab(1)}>
                        Courses Material
                    </TabButton>
                </div>

                {/* Tab 1 */}
                {tab === 1 ? (
                    <>
                        <TabHeading>
                            <strong>Course Material</strong>
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
                                                courses?.map((course) => {
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
                                            <Avatar>
                                                {/* First Letter Of Login in user username from local storage cookie */}
                                                {JSON.parse(localStorage.getItem("user")).username.charAt(0).toUpperCase()}
                                            </Avatar>
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
                                            <RadioGroup row name="row-radio-buttons-group" value={vote} onChange={(e) => setVote(e.target.value)}>
                                                <FormControlLabel value="upvote" control={<Radio />} label="Upvote" />
                                                <FormControlLabel value="downvote" control={<Radio />} label="Downvote" />
                                            </RadioGroup>
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
                                        <div class="post review">
                                            <div class="post-top">
                                                <div class="post-info">
                                                    <div className="postRating">

                                                        <p class="name">
                                                        </p>
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
                                                    <span class="time">
                                                        {new Date(review.createdAt).toDateString()}
                                                    </span>
                                                </div>
                                                <div class="post-content">
                                                    <p>{review.review}</p>
                                                </div>
                                                <i class="fas fa-ellipsis-h">
                                                    {review.user_id ===
                                                        JSON.parse(localStorage.getItem("user"))._id
                                                        ||
                                                        // Check if the logged in user is admin
                                                        (JSON.parse(localStorage.getItem("user")).isAdmin === true)
                                                        ? (
                                                            <DelReview
                                                                onClick={() => deleteReview(review._id)}
                                                            ></DelReview>
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

export default TeacherPage;
