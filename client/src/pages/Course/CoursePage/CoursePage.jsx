import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Page.css";
import avatar from "./Avatar.png";
import swal from "sweetalert";
import { DeleteReview, AlreadyReviewed, Btn, Wrapper, CourseBanner, Image, Card, Container, CardImage, VoteSelect, TabHeading, CourseDetails } from "./Style";
import { getTeachers, getCourse, getCourseUpvotes, getCourseDownvotes, getCourseReviews, getTeacherIds, getAlreadyReviewed, getCourseRating } from "./Functions";
const Course = () => {
    const params = useParams();
    const [teachers, setTeachers] = useState([]);
    const [course, setCourse] = useState({});
    const [TeacherIds, setTeacherIds] = useState([]);
    const [courseDescription, setCourseDescription] = useState("");
    const [courseUpvotes, setCourseUpvotes] = useState(0);
    const [courseDownvotes, setCourseDownvotes] = useState(0);
    const [courseReviews, setCourseReviews] = useState([]);
    const [review, setReview] = useState("");
    const [vote, setVote] = useState("upvote");
    const [alreadyReviewed, setAlreadyReviewd] = useState(false);
    const [tab, setTab] = useState(2);
    const [rating, setRating] = useState(0);
    const [courseRating, setCourseRating] = useState(0);


    const deleteReview = async (id) => {
        // Swal are you sure you want to delete, After yes then delete

        await fetch(`/reviewCourses/${id}`, {
            method: "DELETE",
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
        });
        // eslint-disable-next-line 
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
        // eslint-disable-next-line
        const res = await fetch(`/reviewCourses`, {
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
                course_id: params.id,
                // Get user._id from localstorage
                user_id: JSON.parse(localStorage.getItem("user"))._id,
                rating: rating,
            }),
        });

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
        // Scroll to top with smooth animation
        window.scrollTo({ top: 0, behavior: "smooth" });

        const pullData = async () => {

            const res = await getTeachers();
            setTeachers(res);

            const res2 = await getCourse(params.id);
            setCourse(res2);
            setCourseDescription(res2.description);

            const res3 = await getCourseUpvotes(params.id);
            setCourseUpvotes(res3);

            const res4 = await getCourseDownvotes(params.id);
            setCourseDownvotes(res4);

            const res5 = await getCourseReviews(params.id);
            setCourseReviews(res5);

            const res6 = await getTeacherIds(params.id);
            setTeacherIds([...new Set(res6.map((item) => item.teacher_id))]);

            const res7 = await getAlreadyReviewed(params.id);
            setAlreadyReviewd(res7);

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
                                <h1>{course.name}</h1>
                            </div>
                            <div className="about">
                                <div className="rating">
                                    {course.coursecode}
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
                        <div className="title-bottom">
                            {TeacherIds.length === 0 ? (
                                <>
                                    <strong>No Course Teachers</strong>
                                </>
                            ) : (
                                <>
                                    <div className="category">
                                        <div>
                                            <strong>Teachers: </strong>
                                        </div>
                                        <div>
                                            {TeacherIds.map((id) => {
                                                return (
                                                    <>
                                                        {teachers.map((teacher) => {
                                                            return (
                                                                <>
                                                                    {teacher._id === id ? (
                                                                        <Link
                                                                            to={`/course/${course._id}/teacher/${teacher._id}`}
                                                                        >
                                                                            <button className="btn">
                                                                                {teacher.name}
                                                                            </button>
                                                                        </Link>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </>
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
                <Card>
                    <CardImage>
                        <img src={course.courseImage} alt="Please Wait, Fetching Data..." />
                    </CardImage>
                    <div className="about">

                        <div className="rating">
                            {/* Round off courseRating to 2 decimal places */}
                            {courseRating}/5
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                                alt="Star Logo"
                            />
                        </div>
                        <div className="votes">
                            {courseUpvotes}
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6520/6520157.png"
                                alt="upvote Logo"
                            />
                            {courseDownvotes}
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/6520/6520152.png"
                                alt="downvote Logo"
                            />
                        </div>
                    </div>
                </Card>
            </CourseBanner>
            <CourseDetails>
                {/* 2 Button to change Tab from 1 to 2 and 2 to 1 */}
                <div className="tabButton">
                    <button className="btn" onClick={() => setTab(2)}>
                        Course Reviews
                    </button>
                    <button className="btn" onClick={() => setTab(1)}>
                        Course Outline
                    </button>
                </div>

                {/* Tab 1 */}
                {tab === 1 ? (
                    <TabHeading>
                        <strong>Course Outline</strong>
                    </TabHeading>
                ) : (
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
                                            <span>
                                                <VoteSelect
                                                    name="rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="0">Rating</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
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
                                        You have Reviewed this Course!
                                    </AlreadyReviewed>
                                </>
                            )}

                            {courseReviews.map((review) => {
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
                        </div>
                    </>
                )}
            </CourseDetails>
        </Wrapper>
    );

};




export default Course;
