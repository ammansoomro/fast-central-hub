import CourseItem from '../../cards/CourseCard/CourseCard'
import './courselist.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import styled from 'styled-components'
import axios from 'axios'
import Loader from '../../Loader/Loader'
import { useEffect, useState } from 'react'
const Swiper = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await axios.get("/courses", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setCourses(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCourses();
    }, []);

    if (courses.length === 0) {
        return <Loader />
    }

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Courses</h1>
                </div>
                <Splide
                    options={{
                        type: "loop",
                        perPage: 5,
                        perMove: 4,
                        pagination: false,
                        arrows: true,
                        // focus: "center",
                        gap: "2rem",
                        // Show only 1 card when the screen is less than 600px.
                        breakpoints: {
                            600: {
                                perPage: 1,
                                perMove: 1,
                                gap: "1rem",
                            },
                            900: {
                                perPage: 2,
                                perMove: 2,
                                gap: "1rem",
                            },
                            1200: {
                                perPage: 3,
                                perMove: 3,
                                gap: "1rem",
                            },
                            1500: {
                                perPage: 5,
                                perMove: 4,
                                gap: "1rem",
                            },
                        }
                    }}>
                    {/* Map Over Courses */}
                    {courses.map((course) => (
                        <SplideSlide className="SplideCard" key={course._id}>
                            <CourseItem imageUrl={course.courseImage}
                                coursecode={course.coursecode}
                                upvotes={course.upvote}
                                downvotes={course.downvote}
                                name={course.name}
                                id={course._id}
                                description={course.description}
                                credithours={course.credithours}
                                core_elective={course.core_elective}
                            />
                        </SplideSlide>
                    ))}

                </Splide>
            </Wrapper>
        </>
    )
}

export default Swiper

const Wrapper = styled.div`
        margin: 4rem 3.5rem;
        @media screen and (max-width: 600px) {
            margin: 2rem 0rem;
        }
`;