import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Assets/Page.css";
import Rating from '@mui/material/Rating';
import { Grid,DeleteReview, AlreadyReviewed, Btn, Wrapper, CourseBanner, Image, Card, Container, CardImage, TabHeading, CourseDetails, TabButton, CourseCard, CourseCardImage } from "./Style.jsx";
import { getTeachers, getCourse, getCourseReviews, getTeacherIds, getAlreadyReviewed, getCourseRating,DelReview, AddReview } from "./Functions.jsx";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const labels = {
    1: 'Worst',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
};


const Course = () => {
    const params = useParams();
    const [teachers, setTeachers] = useState([]);
    const [hover, setHover] = useState(-1);
    const [course, setCourse] = useState({});
    const [TeacherIds, setTeacherIds] = useState([]);
    const [courseDescription, setCourseDescription] = useState("");
    const [courseReviews, setCourseReviews] = useState([]);
    const [review, setReview] = useState("");
    // const [vote, setVote] = useState("upvote");
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [tab, setTab] = useState(2);
    const [rating, setRating] = useState(3);
    const [courseRating, setCourseRating] = useState(0);
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    async function deleteReview(id) {
        await DelReview(id, setAlreadyReviewed);
    }

    const submitReview = async (e) => {
        await AddReview(e, review, params, rating, setReview);
    };

    useEffect(() => {
        // Scroll to top with smooth animation
        const pullData = async () => {

            const res = await getTeachers(params.id);
            setTeachers(res);

            const res2 = await getCourse(params.id);
            setCourse(res2);
            setCourseDescription(res2.description);

            const res5 = await getCourseReviews(params.id);
            setCourseReviews(res5);

            const res6 = await getTeacherIds(params.id);
            setTeacherIds([...new Set(res6.map((item) => item.teacher_id))]);

            const res7 = await getAlreadyReviewed(params.id);
            setAlreadyReviewed(res7);

            const res8 = await getCourseRating(params.id);
            setCourseRating(res8);

        };

        pullData();
    }, [params.id, alreadyReviewed, courseReviews]);

    return (
        <Wrapper
            // Animate like a slide from below
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <CourseBanner>
                <Image>
                    <img src={course.courseImage} alt={course.courseImage} />
                </Image>
                <Container>
                    <div className="title-container">
                        <div className="title-top">
                            <div className="course-title">
                                <h1>{course.name} <span className="CourseCode">({course.coursecode})</span></h1>
                            </div>
                            <div className="about">
                                <div className="rating">
                                    {/* Round off courseRating to 2 decimal places */}
                                    {courseRating}/5
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                                        alt="Star Logo"
                                    />
                                </div>
                                {/* <span>{course.core_elective} Course</span> */}
                            </div>
                            <div className="coursedescription">
                                {/* If no description do this else do that */}
                                {course.description === "" ? (
                                    <p>No Description Available for this Course.</p>
                                ) : (
                                    <div className="description">
                                        <p>{courseDescription}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
                {/* If Mobile phone, don't show this */}
                {!window.innerWidth > 768 ? (
                    <></>
                ) : (
                    <Card>
                        <CardImage>
                            <img src={course.courseImage} alt="Please Wait, Fetching Data..." />
                        </CardImage>
                    </Card>
                )
                }
            </CourseBanner>
            <CourseDetails>
                {/* 2 Button to change Tab from 1 to 2 and 2 to 1 */}
                <div className="tabButton">
                    <TabButton onClick={() => setTab(2)}>
                        Course Reviews
                    </TabButton>
                    {/* <TabButton onClick={() => setTab(1)}>
                        Course Outline
                    </TabButton> */}
                    <TabButton onClick={() => setTab(3)}>
                        Course Material
                    </TabButton>
                </div>

                {/* Tab 1 */}
                {tab === 1 ? (
                    <TabHeading>
                        <strong>Course Outline</strong>
                    </TabHeading>
                ) :
                    // Tab 2
                    tab === 3 ? (
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
                                    TeacherIds.length === 0 ?

                                        <AlreadyReviewed>
                                            No Material Available for this Course.
                                        </AlreadyReviewed>
                                        :
                                        <>
                                            <AlreadyReviewed>
                                                Click on the Teacher to see the Course Material.
                                            </AlreadyReviewed>
                                            <div className="courses">
                                                {
                                                    teachers?.map((teacher) => {
                                                        return (
                                                            <Link to={`/course/${course._id}/teacher/${teacher._id}`}
                                                                key={teacher._id}>
                                                                <CourseCard >
                                                                    <CourseCardImage className="teacherImage">
                                                                        <img src={teacher.picture} alt="Teacher" />
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

                    ) :
                        (
                            <>
                                <TabHeading>
                                    <strong>Course Reviews</strong>
                                </TabHeading>
                                <div class="middle-panel">
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
                                                <div class="action">
                                                    {/* <Rating name="rating" defaultValue={1} precision={0.25} onChange={(e) => setRating(e.target.value)} value={rating} /> */}
                                                    <Box
                                                        sx={{
                                                            width: 200,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Rating
                                                            name="hover-feedback"
                                                            value={rating}
                                                            precision={1}
                                                            getLabelText={getLabelText}
                                                            onChange={(event, newValue) => {
                                                                setRating(newValue);
                                                            }}
                                                            onChangeActive={(event, newHover) => {
                                                                setHover(newHover);
                                                            }}
                                                        // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        {rating !== null && (
                                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                                                        )}
                                                    </Box>
                                                </div>
                                                <div class="action">
                                                    <span>
                                                        <Btn
                                                            type="submit"
                                                            value="Post"
                                                            onClick={submitReview}
                                                        />
                                                        {/* <Button variant="outlined"
                                                    onClick={submitReview}
                                                >Post</Button> */}

                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <AlreadyReviewed>
                                                You have Reviewed this Course!
                                            </AlreadyReviewed>
                                        </>
                                    )}

                                    {courseReviews.map((review) => {
                                        return (
                                            <>
                                                <div class="post review">
                                                    <div class="post-top">
                                                        <div class="post-info">
                                                            <div className="postRating">
                                                                <p class="name">{review.rating}</p>
                                                                <img
                                                                    src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                                                                    alt="Star Logo"
                                                                />
                                                            </div>
                                                            <span class="time">
                                                                {new Date(review.createdAt).toDateString()}
                                                            </span>
                                                        </div>
                                                        <div class="post-content">
                                                            <p>{review.review}</p>

                                                        </div>
                                                        <i class="fas fa-ellipsis-h">
                                                            {(review.user_id === JSON.parse(localStorage.getItem("user"))._id) ||
                                                                // Check if the logged in user is admin
                                                                (JSON.parse(localStorage.getItem("user")).isAdmin === true)
                                                                ? (
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
                                </div>
                            </>
                        )}
            </CourseDetails>
        </Wrapper>
    );

};







export default Course;
