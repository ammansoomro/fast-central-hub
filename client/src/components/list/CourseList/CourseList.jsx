import CourseItem from '../../cards/CourseCard/CourseCard'
import './courselist.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from 'styled-components'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Swiper = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getCourses = async () => {
            try {
                const res = await axios.get("/courses?new=true", {
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


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "5px",
        slidesToShow: 5,
        speed: 500,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Courses</h1>
                </div>
                <Slider
                    {...settings}
                >
                    {/* Map Over Courses */}
                    {courses.map((course) => (
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
                    ))}
                </Slider>
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