import TeacherItem from '../../cards/TeacherCard/TeacherCard'
import './TeacherList.scss'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
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

    return (
        <>
            <Wrapper >
                <div className="SectionHeading">
                    <h1>University Faculty</h1>
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
                        breakpoints: {
                            600: {
                                perPage: 1,
                                perMove: 1,
                                // gap: "1rem",
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
                    {/* Map Over Teachers */}
                    {teachers.slice(0, 7).map((teacher) => (
                        <SplideSlide className="SplideCard" key={teacher._id}>
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