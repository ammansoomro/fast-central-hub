import TeacherItem from '../../cards/TeacherCard/TeacherCard'
import './TeacherList.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Swiper = () => {
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const res = await axios.get("/facultys", {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setTeachers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getTeachers();
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
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Faculty</h1>
                </div>
                <Slider
                    {...settings}
                >
                    {/* Map Over Teachers */}
                    {teachers.slice(0, 7).map((teacher) => (
                        <TeacherItem imageUrl={teacher.picture}
                            name={teacher.name}
                            id={teacher._id}
                            email={teacher.email}
                            department={teacher.department}
                            about={teacher.about}
                            courses={teacher.courses}
                            reviews={teacher.reviews}
                            upvotes={teacher.upvote}
                            downvotes={teacher.downvote}
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